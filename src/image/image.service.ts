import { Injectable } from '@nestjs/common';
import { ImageRepository } from '../repository/image.repository';
import { CreateImageParam, FindImageUrlsQuery } from '../common/dto/image/image.dto';
import { Util } from '../common/util';

@Injectable()
export class ImageService {

  constructor(private readonly imageRepository: ImageRepository) {
  }

  async createImage(dto: CreateImageParam, file) {
    const imageEntities = await this.imageRepository.findImagesByBelongId(dto.belongId);
    const imageMaxSort = imageEntities[imageEntities.length - 1].sort;
    const image = await this.imageRepository.createImage({ ...dto, sort: imageMaxSort + 1 });

    await Util.gcp.upload(dto.fileDir, image.id.toString(), file);
  }

  async findImageUrlByBelongId(dto: FindImageUrlsQuery): Promise<string[]> {
    const { belongId, fileDir } = dto;
    const images = await this.imageRepository.findImagesByBelongId(belongId);
    const imageIds = images.map(image => image.id.toString());
    const imageData = [];
    for (const imageId of imageIds) {
      const url = await Util.gcp.getSignedUrl(fileDir, imageId);
      imageData.push({ url, id: Number(imageId) });
    }
    return imageData;
  }

  async updateImageSortByImageId(id: number, sort: number) {
    await this.imageRepository.update({ id }, { sort });
  }
}
