import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { UserManagementService } from './services/user-management.service';
import { ParcelManagementService } from './services/parcel-management.service';
import { NotificationService } from './services/notification.service';
import { AuditLogService } from './services/audit-log.service';
import { SystemSettingsService } from './services/system-settings.service';
import { AdminGuard } from '../guards/admin.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {
  CreateUserDto,
  UpdateUserDto,
  UserFilterDto,
  UpdateParcelDto,
  ParcelFilterDto,
  CreateNotificationDto,
  UpdateSystemSettingDto,
  AuditLogFilterDto,
} from './dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userManagementService: UserManagementService,
    private readonly parcelManagementService: ParcelManagementService,
    private readonly notificationService: NotificationService,
    private readonly auditLogService: AuditLogService,
    private readonly systemSettingsService: SystemSettingsService,
  ) {}

  // Dashboard
  @Get('dashboard')
  async getDashboard(@Request() req) {
    return this.adminService.getDashboardStats(req.user.id);
  }

  // User Management
  @Get('users')
  async getUsers(@Query() filter: UserFilterDto) {
    return this.userManagementService.getUsers(filter);
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string) {
    return this.userManagementService.getUserById(id);
  }

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto, @Request() req) {
    return this.userManagementService.createUser(createUserDto, req.user.id);
  }

  @Put('users/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    return this.userManagementService.updateUser(id, updateUserDto, req.user.id);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string, @Request() req) {
    return this.userManagementService.deleteUser(id, req.user.id);
  }

  @Put('users/:id/status')
  async updateUserStatus(
    @Param('id') id: string,
    @Body('isActive') isActive: boolean,
    @Request() req,
  ) {
    return this.userManagementService.updateUserStatus(id, isActive, req.user.id);
  }

  @Put('users/:id/verify')
  async verifyUser(@Param('id') id: string, @Request() req) {
    return this.userManagementService.verifyUser(id, req.user.id);
  }

  // Parcel Management
  @Get('parcels')
  async getParcels(@Query() filter: ParcelFilterDto) {
    return this.parcelManagementService.getParcels(filter);
  }

  @Get('parcels/:id')
  async getParcel(@Param('id') id: string) {
    return this.parcelManagementService.getParcelById(id);
  }

  @Put('parcels/:id')
  async updateParcel(
    @Param('id') id: string,
    @Body() updateParcelDto: UpdateParcelDto,
    @Request() req,
  ) {
    return this.parcelManagementService.updateParcel(id, updateParcelDto, req.user.id);
  }

  @Put('parcels/:id/status')
  async updateParcelStatus(
    @Param('id') id: string,
    @Body() body: { status: string; notes?: string; location?: string },
    @Request() req,
  ) {
    return this.parcelManagementService.updateParcelStatus(
      id,
      body.status,
      body.notes,
      body.location,
      req.user.id,
    );
  }

  @Delete('parcels/:id')
  async deleteParcel(@Param('id') id: string, @Request() req) {
    return this.parcelManagementService.deleteParcel(id, req.user.id);
  }

  @Get('parcels/:id/history')
  async getParcelHistory(@Param('id') id: string) {
    return this.parcelManagementService.getParcelHistory(id);
  }

  // Notifications
  @Get('notifications')
  async getNotifications(@Query() query: any) {
    return this.notificationService.getNotifications(query);
  }

  @Post('notifications')
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
    @Request() req,
  ) {
    return this.notificationService.createNotification(createNotificationDto, req.user.id);
  }

  @Post('notifications/broadcast')
  async broadcastNotification(
    @Body() body: { title: string; message: string; type: string },
    @Request() req,
  ) {
    return this.notificationService.broadcastNotification(body, req.user.id);
  }

  // Audit Logs
  @Get('audit-logs')
  async getAuditLogs(@Query() filter: AuditLogFilterDto) {
    return this.auditLogService.getAuditLogs(filter);
  }

  @Get('audit-logs/:id')
  async getAuditLog(@Param('id') id: string) {
    return this.auditLogService.getAuditLogById(id);
  }

  // System Settings
  @Get('settings')
  async getSettings(@Query('category') category?: string) {
    return this.systemSettingsService.getSettings(category);
  }

  @Put('settings/:key')
  async updateSetting(
    @Param('key') key: string,
    @Body() updateSettingDto: UpdateSystemSettingDto,
    @Request() req,
  ) {
    return this.systemSettingsService.updateSetting(key, updateSettingDto, req.user.id);
  }

  // Email Templates
  @Get('email-templates')
  async getEmailTemplates() {
    return this.systemSettingsService.getEmailTemplates();
  }

  @Put('email-templates/:id')
  async updateEmailTemplate(
    @Param('id') id: string,
    @Body() body: any,
    @Request() req,
  ) {
    return this.systemSettingsService.updateEmailTemplate(id, body, req.user.id);
  }

  // SMS Templates
  @Get('sms-templates')
  async getSMSTemplates() {
    return this.systemSettingsService.getSMSTemplates();
  }

  @Put('sms-templates/:id')
  async updateSMSTemplate(
    @Param('id') id: string,
    @Body() body: any,
    @Request() req,
  ) {
    return this.systemSettingsService.updateSMSTemplate(id, body, req.user.id);
  }

  // Weight Pricing
  @Get('weight-pricing')
  async getWeightPricing() {
    return this.systemSettingsService.getWeightPricing();
  }

  @Put('weight-pricing/:id')
  async updateWeightPricing(
    @Param('id') id: string,
    @Body() body: any,
    @Request() req,
  ) {
    return this.systemSettingsService.updateWeightPricing(id, body, req.user.id);
  }

  // Reports
  @Get('reports/users')
  async getUsersReport(@Query() query: any) {
    return this.adminService.getUsersReport(query);
  }

  @Get('reports/parcels')
  async getParcelsReport(@Query() query: any) {
    return this.adminService.getParcelsReport(query);
  }

  @Get('reports/revenue')
  async getRevenueReport(@Query() query: any) {
    return this.adminService.getRevenueReport(query);
  }
}
