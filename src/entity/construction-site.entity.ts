import { BaseEntity } from './base.entity';
import {  Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProcessType } from '../enum/construction-site-detail.enum';


@Entity('construction_sites')
export class ConstructionSiteEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() floor: string;

  @Column({name: 'process_type'}) processType: ProcessType;

  @Column({name: 'construction_type_id' }) constructionTypeId: number;

  @Column() percentage: number;

  @Column() notes: string;

  @Column({name: 'is_deleted'}) isDeleted: boolean;
}
