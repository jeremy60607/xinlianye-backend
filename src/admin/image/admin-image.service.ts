import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/user.repository';
import { ImageRepository } from '../../repository/image.repository';
import {
  CreateImageBody,
  FindImageUrlsQuery,
} from '../../common/dto/image/image.dto';
import { Util } from '../../common/util';

@Injectable()
export class AdminImageService {
  constructor(private readonly imageRepository: ImageRepository) {}

  async createImage(dto: CreateImageBody, file) {
    const image = await this.imageRepository.createImage(dto);

    await Util.gcp.upload(dto.fileDir, image.id.toString(), file);
  }

  async findImageUrlByBelongId(dto: FindImageUrlsQuery): Promise<string[]> {
    const { belongId, fileDir } = dto;
    const images = await this.imageRepository.findImagesByBelongId(belongId);
    const imageIds = images.map(image => image.id.toString());
    const imageUrls = [];
    for (const imageId of imageIds) {
      const url = await Util.gcp.getSignedUrl(fileDir, imageId);
      imageUrls.push(url);
    }
    return imageUrls;
  }
}
