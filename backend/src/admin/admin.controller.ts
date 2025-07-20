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
import { UserManagementService } from '../user/dtos/user-management.service';
// import { ParcelService } from '../parcel/parcel.service'; // Service not found
// import { NotificationService } from '../notification/notification.service'; // Service not found
// import { AuditLogService } from './services/audit-log.service'; // Service not found
// import { SystemSettingsService } from './services/system-settings.service'; // Service not found
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guards';
// import { AdminGuard } from '../guards/admin.guard'; // Not found
// import {
//   // CreateUserDto, // Not found
//   // UpdateUserDto, // Not found
//   UserFilterDto,
//   // UpdateParcelDto, // Not found
//   // ParcelFilterDto, // Not found
//   // CreateNotificationDto, // Not found
//   // UpdateSystemSettingDto, // Not found
//   // AuditLogFilterDto, // Not found
// } from './dto';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userManagementService: UserManagementService,
    // private readonly parcelService: ParcelService, // Service not found
    // private readonly notificationService: NotificationService, // Service not found
    // private readonly auditLogService: AuditLogService, // Service not found
    // private readonly systemSettingsService: SystemSettingsService, // Service not found
  ) {}

  // Dashboard
  @Get('dashboard')
  async getDashboard(@Request() req) {
    return this.adminService.getDashboardStats(req.user.id);
  }

  // User Management
  @Get('users')
  async getUsers(@Query() filter: any) { // UserFilterDto not found, using 'any' for now
    return this.userManagementService.getUsers(filter);
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string) {
    return this.userManagementService.getUserById(id);
  }

  @Post('users')
  async createUser(@Body() createUserDto: any, @Request() req) { // CreateUserDto not found
    return this.userManagementService.createUser(createUserDto, req.user.id);
  }

  @Put('users/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: any, // UpdateUserDto not found
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
  // @Get('parcels')
  // async getParcels(@Query() filter: any) { // ParcelFilterDto not found, using 'any' for now
  //   return this.parcelService.getParcels(filter);
  // }

  // @Get('parcels/:id')
  // async getParcel(@Param('id') id: string) {
  //   return this.parcelService.getParcelById(id);
  // }

  // @Put('parcels/:id')
  // async updateParcel(
  //   @Param('id') id: string,
  //   @Body() updateParcelDto: any, // UpdateParcelDto not found, using 'any' for now
  //   @Request() req,
  // ) {
  //   return this.parcelService.updateParcel(id, updateParcelDto, req.user.id);
  // }

  // @Put('parcels/:id/status')
  // async updateParcelStatus(
  //   @Param('id') id: string,
  //   @Body() body: { status: string; notes?: string; location?: string },
  //   @Request() req,
  // ) {
  //   return this.parcelService.updateParcelStatus(
  //     id,
  //     body.status,
  //     body.notes,
  //     body.location,
  //     req.user.id,
  //   );
  // }

  // @Delete('parcels/:id')
  // async deleteParcel(@Param('id') id: string, @Request() req) {
  //   return this.parcelService.deleteParcel(id, req.user.id);
  // }

  // @Get('parcels/:id/history')
  // async getParcelHistory(@Param('id') id: string) {
  //   return this.parcelService.getParcelHistory(id);
  // }

  // Notifications
  // @Get('notifications')
  // async getNotifications(@Query() query: any) {
  //   return this.notificationService.getNotifications(query);
  // }

  // @Post('notifications')
  // async createNotification(
  //   @Body() createNotificationDto: any, // CreateNotificationDto not found
  //   @Request() req,
  // ) {
  //   return this.notificationService.createNotification(createNotificationDto, req.user.id);
  // }

  // @Post('notifications/broadcast')
  // async broadcastNotification(
  //   @Body() body: { title: string; message: string; type: string },
  //   @Request() req,
  // ) {
  //   return this.notificationService.broadcastNotification(body, req.user.id);
  // }

  // Audit Logs
  // @Get('audit-logs') // AuditLogService not found
  // async getAuditLogs(@Query() filter: AuditLogFilterDto) {
  //   return this.auditLogService.getAuditLogs(filter);
  // }

  // @Get('audit-logs/:id') // AuditLogService not found
  // async getAuditLog(@Param('id') id: string) {
  //   return this.auditLogService.getAuditLogById(id);
  // }

  // System Settings
  // @Get('settings') // SystemSettingsService not found
  // async getSettings(@Query('category') category?: string) {
  //   return this.systemSettingsService.getSettings(category);
  // }

  // @Put('settings/:key') // SystemSettingsService not found
  // async updateSetting(
  //   @Param('key') key: string,
  //   @Body() updateSettingDto: UpdateSystemSettingDto,
  //   @Request() req,
  // ) {
  //   return this.systemSettingsService.updateSetting(key, updateSettingDto, req.user.id);
  // }

  // Email Templates
  // @Get('email-templates') // SystemSettingsService not found
  // async getEmailTemplates() {
  //   return this.systemSettingsService.getEmailTemplates();
  // }

  // @Put('email-templates/:id') // SystemSettingsService not found
  // async updateEmailTemplate(
  //   @Param('id') id: string,
  //   @Body() body: any,
  //   @Request() req,
  // ) {
  //   return this.systemSettingsService.updateEmailTemplate(id, body, req.user.id);
  // }

  // SMS Templates
  // @Get('sms-templates') // SystemSettingsService not found
  // async getSMSTemplates() {
  //   return this.systemSettingsService.getSMSTemplates();
  // }

  // @Put('sms-templates/:id') // SystemSettingsService not found
  // async updateSMSTemplate(
  //   @Param('id') id: string,
  //   @Body() body: any,
  //   @Request() req,
  // ) {
  //   return this.systemSettingsService.updateSMSTemplate(id, body, req.user.id);
  // }

  // Weight Pricing
  // @Get('weight-pricing') // SystemSettingsService not found
  // async getWeightPricing() {
  //   return this.systemSettingsService.getWeightPricing();
  // }

  // @Put('weight-pricing/:id') // SystemSettingsService not found
  // async updateWeightPricing(
  //   @Param('id') id: string,
  //   @Body() body: any,
  //   @Request() req,
  // ) {
  //   return this.systemSettingsService.updateWeightPricing(id, body, req.user.id);
  // }

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
