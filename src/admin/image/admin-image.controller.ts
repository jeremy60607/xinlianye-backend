import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Util } from '../../common/util';
import { Express } from 'express';
import {
  CreateImageParam,
  FindImageUrlsQuery,
  FindImageUrlsResponse,
  ImageParam,
} from '../../common/dto/image/image.dto';
import { AdminUserService } from '../user/admin-user.service';
import { AdminImageService } from './admin-image.service';
import { plainToClass } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';

@Controller('v1/admin/images')
export class AdminImageController {
  constructor(private readonly imageService: AdminImageService) {}

  @Post('/:imageId')
  @UseGuards(AuthGuard('admin-auth'))
  async updateImageBySort(
    @Param() param: ImageParam,
    @Body('sort') sort: number,
  ) {
    await this.imageService.updateImageSortByImageId(param.imageId, sort);
  }

  @Post('/:fileDir/:belongId')
  @UseGuards(AuthGuard('admin-auth'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Param() param: CreateImageParam) {
    await this.imageService.createImage(param, file);
  }

  @Get('')
  @UseGuards(AuthGuard('admin-auth'))
  async findImagesByQuery(
    @Query() query: FindImageUrlsQuery,
  ): Promise<FindImageUrlsResponse> {
    const imageUrls = await this.imageService.findImageUrlByBelongId(query);
    return plainToClass(FindImageUrlsResponse, { imageUrls });
  }
}
