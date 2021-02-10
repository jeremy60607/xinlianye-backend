import { BaseEntity } from './base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('update_at')
export class UpdateAtEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() date: Date;

  @Column({ name: 'is_deleted' }) isDeleted: boolean;
}
