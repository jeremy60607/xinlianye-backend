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
import { AdminImageService } from '../../admin/image/admin-image.service';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateImageParam,
  FindImageUrlsQuery,
  FindImageUrlsResponse,
  ImageParam,
} from '../../common/dto/image/image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToClass } from 'class-transformer';
import { ImageService } from './image.service';

@Controller('v1/images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('/:imageId')
  @UseGuards(AuthGuard('user-auth'))
  async updateImageBySort(
    @Param() param: ImageParam,
    @Body('sort') sort: number,
  ) {
    await this.imageService.updateImageSortByImageId(param.imageId, sort);
  }

  @Post('/:fileDir/:belongId')
  @UseGuards(AuthGuard('user-auth'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Param() param: CreateImageParam) {
    await this.imageService.createImage(param, file);
  }

  @Get('')
  @UseGuards(AuthGuard('user-auth'))
  async findImagesByQuery(
    @Query() query: FindImageUrlsQuery,
  ): Promise<FindImageUrlsResponse> {
    const imageUrls = await this.imageService.findImageUrlByBelongId(query);
    return plainToClass(FindImageUrlsResponse, { imageUrls });
  }
}
