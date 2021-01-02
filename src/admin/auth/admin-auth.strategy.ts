import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../../common/constant/jwt.constant';
import { AdminTokenPayload } from '../../common/dto/auth/admin-auth.dto';

@Injectable()
export class AdminAuthStrategy extends PassportStrategy(
  Strategy,
  'admin-auth',
) {
  constructor(private authService: AdminAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.adminSecret,
    });
  }

  async validate(payload: AdminTokenPayload): Promise<any> {
    const admin = await this.authService.validateAdmin(payload.id);

    if (!admin) {
      throw new UnauthorizedException();
    }
    return admin;
  }
}
