import { Module } from '@nestjs/common';
import { AdminUpdateAtController } from './admin-update-at.controller';
import { AdminUpdateAtService } from './admin-update-at.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateAtRepository } from '../../repository/update-at.repository';

@Module({
  controllers: [AdminUpdateAtController],
  providers: [AdminUpdateAtService],
  imports: [TypeOrmModule.forFeature([UpdateAtRepository])],
})
export class AdminUpdateAtModule {}
