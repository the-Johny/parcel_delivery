/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
// import { AuditLogService } from './audit-log.service'; // Not found
// import { CreateUserDto, UpdateUserDto, UserFilterDto } from '../dto'; // Not found
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserManagementService {
  constructor(
    private readonly prisma: PrismaService,
    // private readonly auditLogService: AuditLogService, // Not found
  ) {}

  async getUsers(filter: any) { // UserFilterDto removed
    const {
      page = 1,
      limit = 10,
      search,
      role,
      isActive,
      isVerified,
      startDate,
      endDate,
    } = filter;

    const where: any = { deletedAt: null };

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (role) where.role = role;
    if (isActive !== undefined) where.isActive = isActive;
    if (isVerified !== undefined) where.isVerified = isVerified;

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const [users, totalCount] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          role: true,
          isActive: true,
          isVerified: true,
          createdAt: true,
          updatedAt: true,
          address: true,
          city: true,
          state: true,
          country: true,
          _count: {
            select: {
              sentParcels: true,
              receivedParcels: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id, deletedAt: null },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        isActive: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
        address: true,
        city: true,
        state: true,
        zipCode: true,
        country: true,
        _count: {
          select: {
            sentParcels: true,
            receivedParcels: true,
            notifications: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createUser(createUserDto: any, adminId: string) { // CreateUserDto removed
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        isActive: true,
        isVerified: true,
        createdAt: true,
      },
    });

    // await this.auditLogService.log({ // auditLogService removed
    //   userId: adminId,
    //   action: 'CREATE_USER',
    //   entity: 'USER',
    //   newValue: { userId: user.id, email: user.email },
    //   oldValue: null,
    // });

    return user;
  }

  async updateUser(id: string, updateUserDto: any, adminId: string) { // UpdateUserDto removed
    const existingUser = await this.prisma.user.findUnique({
      where: { id, deletedAt: null },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const updateData: any = { ...updateUserDto };

    if (updateUserDto.password) {
      updateData.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        isActive: true,
        isVerified: true,
        updatedAt: true,
      },
    });

    // await this.auditLogService.log({ // auditLogService removed
    //   userId: adminId,
    //   action: 'UPDATE_USER',
    //   entity: 'USER',
    //   newValue: updateData,
    //   oldValue: existingUser,
    // });

    return user;
  }

  async deleteUser(id: string, adminId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id, deletedAt: null },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    // await this.auditLogService.log({ // auditLogService removed
    //   userId: adminId,
    //   action: 'DELETE_USER',
    //   entity: 'USER',
    //   newValue: { deletedAt: new Date() },
    //   oldValue: user,
    // });

    return { message: 'User deleted successfully' };
  }

  async updateUserStatus(id: string, isActive: boolean, adminId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id, deletedAt: null },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { isActive },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isActive: true,
      },
    });

    // await this.auditLogService.log({ // auditLogService removed
    //   userId: adminId,
    //   action: 'UPDATE_USER_STATUS',
    //   entity: 'USER',
    //   newValue: { isActive },
    //   oldValue: { isActive: user.isActive },
    // });

    return updatedUser;
  }

  async verifyUser(id: string, adminId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id, deletedAt: null },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { isVerified: true },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isVerified: true,
      },
    });

    // await this.auditLogService.log({ // auditLogService removed
    //   userId: adminId,
    //   action: 'VERIFY_USER',
    //   entity: 'USER',
    //   newValue: { isVerified: true },
    //   oldValue: { isVerified: user.isVerified },
    // });

    return updatedUser;
  }
}