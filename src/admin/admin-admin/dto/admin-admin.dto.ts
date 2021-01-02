import { Expose, Type } from 'class-transformer';
import { AdminRoleEnum, AdminStatusEnum } from '../../../enum/admin.enum';
import {
  PaginationDTO,
  PaginationQuery,
} from '../../../common/dto/pagination.dto';

export class AdminBaseDTO {
  @Expose()
  account?: string;
  @Expose()
  role?: AdminRoleEnum;
  @Expose()
  status?: AdminStatusEnum;
  @Expose()
  name?: string;
}

export class AdminDTO extends AdminBaseDTO {
  @Expose()
  id?: number;
}

export class CreateAdminBody extends AdminBaseDTO {
  @Expose()
  password?: string;
}

export class GetMeDTO {
  @Expose()
  @Type(() => AdminDTO)
  admin: AdminDTO;

  @Expose()
  token: string;
}

export class UpdateAdminBody extends AdminBaseDTO {
  password?: string;
}

export class AdminParam {
  adminId: number;
}

export class FindAdminsQuery extends AdminBaseDTO implements PaginationQuery {
  limit: number;
  offset: number;
}

export class FindAdminsPaginationDTO {
  @Expose()
  @Type(() => AdminDTO)
  admins: AdminDTO[];

  @Expose()
  @Type(() => PaginationDTO)
  pagination: PaginationDTO;
}
