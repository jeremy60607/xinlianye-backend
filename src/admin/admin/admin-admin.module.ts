import { Module } from '@nestjs/common';
import { AdminAdminController } from './admin-admin.controller';
import { AdminAdminService } from './admin-admin.service';
import { AdminAuthService } from '../auth/admin-auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from '../../repository/admin.repository';

@Module({
  controllers: [AdminAdminController],
  providers: [AdminAdminService, AdminAuthService],
  imports: [TypeOrmModule.forFeature([AdminRepository])],
})
export class AdminAdminModule {}
