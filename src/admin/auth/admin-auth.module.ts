import { Module } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';
import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';
import { AdminAuthStrategy } from './admin-auth.strategy';
import { jwtConstants } from '../../common/constant/jwt.constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from '../../repository/admin.repository';

@Module({
  providers: [AdminAuthService, AdminAuthStrategy],
  controllers: [AdminAuthController],
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([AdminRepository]),
    JwtModule.register({
      secret: jwtConstants.adminSecret,
    }),
  ],
})
export class AdminAuthModule {}
