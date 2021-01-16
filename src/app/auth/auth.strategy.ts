import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { UserTokenPayload } from '../../common/dto/auth/auth.dto';
import { jwtConstants } from '../../common/constant/jwt.constant';

@Injectable()
export class AuthStrategy extends PassportStrategy(
  Strategy,
  'user-auth'
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: UserTokenPayload): Promise<any> {
    const user = await this.authService.validateUser(payload.id);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
