import { BaseEntity } from './base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleEnum, UserStatusEnum } from '../enum/user.enum';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() account: string;

  @Column() password: string;

  @Column() role: UserRoleEnum;

  @Column() status: UserStatusEnum;

  @Column() name: string;
}
