import { BaseEntity } from './base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProcessType } from '../enum/construction-site-detail.enum';
import { ImageTypeEnum } from '../enum/image.enum';


@Entity('images')
export class ImageEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() url: string;

  @Column() type: ImageTypeEnum;

  @Column({ name: 'belong_id' }) belongId: number;

  @Column({ name: 'is_deleted' }) isDeleted: boolean;
}
