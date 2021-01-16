import { IsNotEmpty } from 'class-validator';
import { UserRoleEnum } from '../../../enum/user.enum';

export class UserTokenPayload {
  id: number;
  role: UserRoleEnum;
}

export class UserLoginBody {
  @IsNotEmpty()
  account: string;

  @IsNotEmpty()
  password: string;
}
