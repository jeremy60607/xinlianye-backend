import { Module } from '@nestjs/common';
import { AdminImageController } from './admin-image.controller';
import { AdminImageService } from './admin-image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageRepository } from '../../repository/image.repository';

@Module({
  controllers: [AdminImageController],
  providers: [AdminImageService],
  imports: [TypeOrmModule.forFeature([ImageRepository])],
})
export class AdminImageModule {}
