import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserManagementService } from './services/user-management.service';
import { ParcelManagementService } from './services/parcel-management.service';
import { NotificationService } from './services/notification.service';
import { AuditLogService } from './services/audit-log.service';
import { SystemSettingsService } from './services/system-settings.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    UserManagementService,
    ParcelManagementService,
    NotificationService,
    AuditLogService,
    SystemSettingsService,
    PrismaService,
  ],
  exports: [AdminService],
})
export class AdminModule {}
