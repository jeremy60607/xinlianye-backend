import { Module } from '@nestjs/common';
import { AdminConstructionTypesController } from './admin-construction-types.controller';
import { AdminConstructionTypesService } from './admin-construction-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstructionTypeRepository } from '../../repository/construction-type.repository';

@Module({
  controllers: [AdminConstructionTypesController],
  providers: [AdminConstructionTypesService],
  imports: [TypeOrmModule.forFeature([ConstructionTypeRepository])],
})
export class AdminConstructionTypesModule {}
