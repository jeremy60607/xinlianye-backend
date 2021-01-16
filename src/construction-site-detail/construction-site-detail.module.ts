import { Module } from '@nestjs/common';
import { ConstructionSiteDetailController } from './construction-site-detail.controller';
import { ConstructionSiteDetailService } from './construction-site-detail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstructionSiteDetailRepository } from '../repository/construction-site-detail.repository';

@Module({
  controllers: [ConstructionSiteDetailController],
  providers: [ConstructionSiteDetailService],
  imports: [TypeOrmModule.forFeature([ConstructionSiteDetailRepository])],
})
export class ConstructionSiteDetailModule {}
