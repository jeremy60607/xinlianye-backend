import { BaseEntity } from './base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('images')
export class ImageEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ name: 'file_dir' }) fileDir: string;

  @Column({ name: 'belong_id' }) belongId: number;

  @Column({ name: 'is_deleted' }) isDeleted: boolean;
}
