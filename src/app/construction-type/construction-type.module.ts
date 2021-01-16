import { Module } from '@nestjs/common';
import { ConstructionTypeController } from './construction-type.controller';
import { ConstructionTypeService } from './construction-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstructionTypeRepository } from '../../repository/construction-type.repository';

@Module({
  controllers: [ConstructionTypeController],
  providers: [ConstructionTypeService],
  imports: [TypeOrmModule.forFeature([ConstructionTypeRepository])],
})
export class ConstructionTypeModule {}
