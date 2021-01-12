import { EntityRepository, Repository } from 'typeorm';
import { ImageEntity } from '../entity/image.entity';
import { CreateImageParam } from '../common/dto/image/image.dto';

@EntityRepository(ImageEntity)
export class ImageRepository extends Repository<ImageEntity> {
  async createImage(dto: CreateImageParam): Promise<ImageEntity> {
    const { fileDir, belongId } = dto;
    return await this.save({ fileDir, belongId, isDeleted: false });
  }

  async findImagesByBelongId(belongId: number): Promise<ImageEntity[]> {
    return await this.createQueryBuilder('images')
      .where({ belongId, isDeleted: false })
      .orderBy('images.sort', 'ASC')
      .getMany();
  }
}
