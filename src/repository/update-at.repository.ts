import { EntityRepository, Repository } from 'typeorm';
import { ImageEntity } from '../entity/image.entity';
import { UpdateAtEntity } from '../entity/update-at.entity';

@EntityRepository(UpdateAtEntity)
export class UpdateAtRepository extends Repository<UpdateAtEntity> {
  async findOneBy() {
    return await this.createQueryBuilder('ua')
      .where({ isDeleted: false })
      .orderBy('ua.updated_at', 'DESC')
      .getOne();
  }

  async createOneBy(date: Date) {
    await this.save({ isDeleted: false, date });
  }
}
