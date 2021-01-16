import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../../common/constant/jwt.constant';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';
import { UserRepository } from '../../repository/user.repository';

@Module({
  providers: [AuthService, AuthStrategy],
  controllers: [AuthController],
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
})
export class AuthModule {}
