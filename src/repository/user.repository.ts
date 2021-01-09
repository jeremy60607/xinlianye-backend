import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { AdminEntity } from '../entity/admin.entity';
import {
  AdminDTO,
  CreateAdminBody,
  UpdateAdminBody,
} from '../common/dto/admin/admin-admin.dto';
import { Util } from '../common/util';
import { PaginationQuery } from '../common/dto/pagination.dto';
import {
  CreateUserBody,
  UpdateUserBody,
  UserDTO,
} from '../common/dto/user/admin-user.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findUserById(id: number): Promise<UserEntity> {
    return await this.createQueryBuilder('users')
      .where({ id })
      .getOne();
  }

  async createUser(dto: CreateUserBody) {
    dto.password = await Util.bcrypt.hash(dto.password);
    await this.save({ ...dto });
  }

  async findUser(dto: UserDTO): Promise<UserEntity> {
    return this.findOne({ ...dto });
  }

  async updateUserByUserId(userId: number, dto: UpdateUserBody) {
    if (dto.password) {
      dto.password = await Util.bcrypt.hash(dto.password);
    }
    await this.update({ id: userId }, { ...dto });
  }

  async findUsersAndCountByDTO(
    dto: UserDTO,
    pagination: PaginationQuery,
  ): Promise<[UserEntity[], number]> {
    const { offset, limit } = pagination;
    return await this.createQueryBuilder('a')
      .where({ ...dto })
      .skip(offset)
      .take(limit)
      .getManyAndCount();
  }
}
