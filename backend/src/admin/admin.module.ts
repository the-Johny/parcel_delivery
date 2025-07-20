import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserManagementService } from '../user/dtos/user-management.service';
import { ParcelService } from '../parcel/parcel.service';
import { NotificationService } from '../notification/notification.service';
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
    ParcelService,
    NotificationService,
    PrismaService,
  ],
  exports: [AdminService],
})
export class AdminModule {}
