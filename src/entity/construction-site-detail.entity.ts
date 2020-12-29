import { BaseEntity } from './base.entity';
import {  Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProcessType } from '../enum/construction-site-detail.enum';


@Entity('construction_site_details')
export class ConstructionSiteDetailEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() title: string;

  @Column({name: 'process_type'}) processType: ProcessType;

  @Column({name: 'construction_site_id'}) constructionSiteId: number;

  @Column({name: 'is_deleted'}) isDeleted: boolean;
}
