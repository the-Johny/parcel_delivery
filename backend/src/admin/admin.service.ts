import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditLogService } from './services/audit-log.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogService: AuditLogService,
  ) {}

  async getDashboardStats(adminId: string) {
    const [
      totalUsers,
      totalParcels,
      pendingParcels,
      deliveredParcels,
      totalRevenue,
      recentUsers,
      recentParcels,
      parcelsByStatus,
      usersByMonth,
    ] = await Promise.all([
      this.prisma.user.count({ where: { deletedAt: null } }),
      this.prisma.parcel.count({ where: { deletedAt: null } }),
      this.prisma.parcel.count({
        where: { status: 'PENDING', deletedAt: null },
      }),
      this.prisma.parcel.count({
        where: { status: 'DELIVERED', deletedAt: null },
      }),
      this.prisma.parcel.aggregate({
        where: { actualCost: { not: null }, deletedAt: null },
        _sum: { actualCost: true },
      }),
      this.prisma.user.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          createdAt: true,
        },
      }),
      this.prisma.parcel.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
          sender: {
            select: { firstName: true, lastName: true, email: true },
          },
          receiver: {
            select: { firstName: true, lastName: true, email: true },
          },
        },
      }),
      this.prisma.parcel.groupBy({
        by: ['status'],
        where: { deletedAt: null },
        _count: true,
      }),
      this.prisma.user.groupBy({
        by: ['createdAt'],
        where: {
          deletedAt: null,
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth() - 11, 1),
          },
        },
        _count: true,
      }),
    ]);

    await this.auditLogService.log({
      userId: adminId,
      action: 'VIEW_DASHBOARD',
      entity: 'ADMIN',
      newValue: null,
      oldValue: null,
    });

    return {
      stats: {
        totalUsers,
        totalParcels,
        pendingParcels,
        deliveredParcels,
        totalRevenue: totalRevenue._sum.actualCost || 0,
      },
      recentUsers,
      recentParcels,
      parcelsByStatus,
      usersByMonth,
    };
  }

  async getUsersReport(query: any) {
    const { startDate, endDate, role, isActive } = query;
    
    const where: any = { deletedAt: null };
    
    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }
    
    if (role) where.role = role;
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const [users, totalCount] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          isActive: true,
          isVerified: true,
          createdAt: true,
          _count: {
            select: {
              sentParcels: true,
              receivedParcels: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      users,
      totalCount,
      summary: {
        totalUsers: totalCount,
        activeUsers: users.filter(u => u.isActive).length,
        verifiedUsers: users.filter(u => u.isVerified).length,
        adminUsers: users.filter(u => u.role === 'ADMIN').length,
      },
    };
  }

  async getParcelsReport(query: any) {
    const { startDate, endDate, status, weightCategory } = query;
    
    const where: any = { deletedAt: null };
    
    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }
    
    if (status) where.status = status;
    if (weightCategory) where.weightCategory = weightCategory;

    const [parcels, totalCount, statusBreakdown] = await Promise.all([
      this.prisma.parcel.findMany({
        where,
        include: {
          sender: {
            select: { firstName: true, lastName: true, email: true },
          },
          receiver: {
            select: { firstName: true, lastName: true, email: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.parcel.count({ where }),
      this.prisma.parcel.groupBy({
        by: ['status'],
        where,
        _count: true,
      }),
    ]);

    return {
      parcels,
      totalCount,
      statusBreakdown,
      summary: {
        totalParcels: totalCount,
        totalWeight: parcels.reduce((sum, p) => sum + p.weight, 0),
        totalRevenue: parcels.reduce((sum, p) => sum + (p.actualCost || 0), 0),
        averageWeight: parcels.length > 0 ? parcels.reduce((sum, p) => sum + p.weight, 0) / parcels.length : 0,
      },
    };
  }

  async getRevenueReport(query: any) {
    const { startDate, endDate, groupBy = 'month' } = query;
    
    const where: any = {
      deletedAt: null,
      actualCost: { not: null },
    };
    
    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const [totalRevenue, revenueByPeriod, revenueByCategory] = await Promise.all([
      this.prisma.parcel.aggregate({
        where,
        _sum: { actualCost: true },
        _count: true,
      }),
      this.prisma.parcel.groupBy({
        by: ['createdAt'],
        where,
        _sum: { actualCost: true },
        _count: true,
      }),
      this.prisma.parcel.groupBy({
        by: ['weightCategory'],
        where,
        _sum: { actualCost: true },
        _count: true,
      }),
    ]);

    return {
      totalRevenue: totalRevenue._sum.actualCost || 0,
      totalOrders: totalRevenue._count,
      revenueByPeriod,
      revenueByCategory,
      averageOrderValue: totalRevenue._count > 0 ? (totalRevenue._sum.actualCost || 0) / totalRevenue._count : 0,
    };
  }
}
