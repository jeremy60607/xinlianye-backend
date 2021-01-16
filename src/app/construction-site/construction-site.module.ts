import { Module } from '@nestjs/common';
import { ConstructionSiteController } from './construction-site.controller';
import { ConstructionSiteService } from './construction-site.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstructionSiteRepository } from '../../repository/construction-site.repository';

@Module({
  controllers: [ConstructionSiteController],
  providers: [ConstructionSiteService],
  imports: [TypeOrmModule.forFeature([ConstructionSiteRepository])],
})
export class ConstructionSiteModule {}
