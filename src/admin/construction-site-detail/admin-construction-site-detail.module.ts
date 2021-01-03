import { Module } from '@nestjs/common';
import { AdminConstructionSiteDetailController } from './admin-construction-site-detail.controller';
import { AdminConstructionSiteDetailService } from './admin-construction-site-detail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstructionSiteDetailRepository } from '../../repository/construction-site-detail.repository';

@Module({
  controllers: [AdminConstructionSiteDetailController],
  providers: [AdminConstructionSiteDetailService],
  imports: [TypeOrmModule.forFeature([ConstructionSiteDetailRepository])],
})
export class AdminConstructionSiteDetailModule {}
