import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Util } from '../../common/util';
import { Express } from 'express';
import {
  CreateImageBody,
  FindImageUrlsQuery,
  FindImageUrlsResponse,
} from '../../common/dto/image/image.dto';
import { AdminUserService } from '../user/admin-user.service';
import { AdminImageService } from './admin-image.service';
import { plainToClass } from 'class-transformer';

@Controller('v1/admin/images')
export class AdminImageController {
  constructor(private readonly imageService: AdminImageService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Body() body: CreateImageBody) {
    await this.imageService.createImage(body, file);
  }

  @Get('')
  async findImagesByQuery(
    @Query() query: FindImageUrlsQuery,
  ): Promise<FindImageUrlsResponse> {
    const imageUrls = await this.imageService.findImageUrlByBelongId(query);
    return plainToClass(FindImageUrlsResponse, { imageUrls });
  }
}
