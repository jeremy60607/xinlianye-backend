import { Body, Controller, Post } from '@nestjs/common';
import { AdminLoginBody } from '../../common/dto/auth/admin-auth.dto';
import { AuthService } from './auth.service';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: AdminLoginBody) {
    return this.authService.login(body);
  }
}
