/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { ParcelModule } from './parcel/parcel.module';
import { NotificationModule } from './notification/notification.module';
import { MapModule } from './map/map.module';
import { BackgroundServicesModule } from './background-services/background-services.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule, // ✅ Import UserModule here
    AuthModule,
    AdminModule,
    ParcelModule,
    NotificationModule,
    MapModule,
    BackgroundServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}