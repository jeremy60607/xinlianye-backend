import { Module } from '@nestjs/common';
import { AdminConstructionSiteController } from './admin-construction-site.controller';
import { AdminConstructionSiteService } from './admin-construction-site.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from '../../repository/admin.repository';
import { ConstructionSiteRepository } from '../../repository/construction-site.repository';

@Module({
  controllers: [AdminConstructionSiteController],
  providers: [AdminConstructionSiteService],
  imports: [TypeOrmModule.forFeature([ConstructionSiteRepository])],
})
export class AdminConstructionSiteModule {}
