import { Expose, Type } from 'class-transformer';
import { PaginationDTO, PaginationQuery } from '../pagination.dto';
import { UserRoleEnum, UserStatusEnum } from '../../../enum/user.enum';

export class UserBaseDTO {
  @Expose()
  account?: string;
  @Expose()
  role?: UserRoleEnum;
  @Expose()
  status?: UserStatusEnum;
  @Expose()
  name?: string;
}

export class UserDTO extends UserBaseDTO {
  @Expose()
  id?: number;
}

export class CreateUserBody extends UserBaseDTO {
  @Expose()
  password?: string;
}

export class GetMeDTO {
  @Expose()
  @Type(() => UserDTO)
  user: UserDTO;

  @Expose()
  token: string;
}

export class UpdateUserBody extends UserBaseDTO {
  password?: string;
}

export class UserParam {
  userId: number;
}

export class FindUsersQuery extends UserBaseDTO implements PaginationQuery {
  limit: number;
  offset: number;
}

export class FindUsersPaginationDTO {
  @Expose()
  @Type(() => UserDTO)
  users: UserDTO[];

  @Expose()
  @Type(() => PaginationDTO)
  pagination: PaginationDTO;
}
