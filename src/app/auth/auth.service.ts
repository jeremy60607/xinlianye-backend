import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/user.repository';
import { UserRoleEnum, UserStatusEnum } from '../../enum/user.enum';
import {
  UserLoginBody,
  UserTokenPayload,
} from '../../common/dto/auth/auth.dto';
import { Util } from '../../common/util';
import { plainToClass } from 'class-transformer';
import { GetMeDTO, UserDTO } from 'src/common/dto/user/admin-user.dto';
import { jwtConstants } from '../../common/constant/jwt.constant';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async validateUser(id: number): Promise<any> {
    const userEntity = await this.userRepository.findUserById(id);
    if (userEntity && userEntity.status === UserStatusEnum.NORMAL) {
      const { password, ...result } = userEntity;
      return result;
    }
    return null;
  }

  async login(userLoginBody: UserLoginBody) {
    const userEntity = await this.userRepository.findUser({
      account: userLoginBody.account,
    });

    if (!userEntity) {
      throw new BadRequestException('帳號或密碼錯誤');
    }

    if (
      await Util.bcrypt.compare(userLoginBody.password, userEntity.password)
    ) {
      const token = this.createSignInToken(userEntity.id, userEntity.role);
      return plainToClass(
        GetMeDTO,
        {
          admin: { ...userEntity },
          token,
        },
        { excludeExtraneousValues: true },
      );
    } else {
      throw new BadRequestException('帳號或密碼錯誤');
    }

    return null;
  }

  createSignInToken(id: number, role: UserRoleEnum) {
    const payload: UserTokenPayload = {
      id,
      role,
    };

    return Util.jwt.sign<UserTokenPayload>(payload, jwtConstants.secret);
  }
}
