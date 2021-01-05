import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/user.repository';
import {
  CreateUserBody,
  FindUsersQuery,
  UpdateUserBody,
} from '../../common/dto/user/admin-user.dto';
import { UserEntity } from '../../entity/user.entity';

@Injectable()
export class AdminUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUserByDTO(createUserBody: CreateUserBody) {
    await this.userRepository.createUser({ ...createUserBody });
  }

  async updateUserByDTO(userId: number, updateUserBody: UpdateUserBody) {
    await this.userRepository.updateUserByUserId(userId, {
      ...updateUserBody,
    });
  }

  async findUsersAndCountByDTO(
    dto: FindUsersQuery,
  ): Promise<[UserEntity[], number]> {
    const { offset, limit, ...baseUserDTO } = dto;
    return await this.userRepository.findUsersAndCountByDTO(baseUserDTO, {
      offset,
      limit,
    });
  }
}
