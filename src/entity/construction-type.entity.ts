import { BaseEntity } from './base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProcessType } from '../enum/construction-site-detail.enum';

@Entity('construction_types')
export class ConstructionTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() title: string;

  @Column() percentage: number;

  @Column({ name: 'construction_type_id' }) constructionTypeId: number;

  @Column({ name: 'is_deleted' }) isDeleted: boolean;
}
