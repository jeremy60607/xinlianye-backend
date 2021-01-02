import { AdminRoleEnum, AdminStatusEnum } from '../../../enum/admin.enum';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class AdminTokenPayload {
  id: number;
  role: AdminRoleEnum;
}

export class AdminLoginBody {
  @IsNotEmpty()
  account: string;

  @IsNotEmpty()
  password: string;
}
