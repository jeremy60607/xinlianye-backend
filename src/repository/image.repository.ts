import { EntityRepository, Repository } from 'typeorm';
import { ImageEntity } from '../entity/image.entity';
import { CreateImageBody } from '../common/dto/image/image.dto';

@EntityRepository(ImageEntity)
export class ImageRepository extends Repository<ImageEntity> {
  async createImage(dto: CreateImageBody): Promise<ImageEntity> {
    const { fileDir, belongId } = dto;
    return await this.save({ fileDir, belongId, isDeleted: false });
  }

  async findImagesByBelongId(belongId: number): Promise<ImageEntity[]> {
    return await this.createQueryBuilder('images')
      .where({ belongId, isDeleted: false })
      .getMany();
  }
}
