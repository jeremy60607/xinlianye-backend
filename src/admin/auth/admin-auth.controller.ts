import { Body, Controller, Post } from '@nestjs/common';

import { AdminAuthService } from './admin-auth.service';
import { AdminLoginBody } from '../../common/dto/auth/admin-auth.dto';

@Controller('v1/admin/auth')
export class AdminAuthController {
  constructor(private readonly authService: AdminAuthService) {}

  @Post('/login')
  async login(@Body() body: AdminLoginBody) {
    return this.authService.login(body);
  }
}
