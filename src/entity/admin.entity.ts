import { BaseEntity } from './base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AdminRoleEnum, AdminStatusEnum } from '../enum/admin.enum';

@Entity('admins')
export class AdminEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() account: string;

  @Column() password: string;

  @Column() role: AdminRoleEnum;

  @Column() status: AdminStatusEnum;

  @Column() name: string;

}
