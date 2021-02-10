import { Module } from '@nestjs/common';
import { UpdateAtController } from './update-at.controller';
import { UpdateAtService } from './update-at.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageRepository } from '../../repository/image.repository';
import { UpdateAtRepository } from '../../repository/update-at.repository';

@Module({
  controllers: [UpdateAtController],
  providers: [UpdateAtService],
  imports: [TypeOrmModule.forFeature([UpdateAtRepository])],
})
export class UpdateAtModule {}
