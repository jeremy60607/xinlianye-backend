import { Module } from '@nestjs/common';
import { AdminConstructionTypeController } from './admin-construction-type.controller';
import { AdminConstructionTypeService } from './admin-construction-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstructionTypeRepository } from '../../repository/construction-type.repository';

@Module({
  controllers: [AdminConstructionTypeController],
  providers: [AdminConstructionTypeService],
  imports: [TypeOrmModule.forFeature([ConstructionTypeRepository])],
})
export class AdminConstructionTypeModule {}
