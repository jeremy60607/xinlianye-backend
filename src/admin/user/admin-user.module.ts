import { Module } from '@nestjs/common';
import { AdminUserController } from './admin-user.controller';
import { AdminUserService } from './admin-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../../repository/user.repository';

@Module({
  controllers: [AdminUserController],
  providers: [AdminUserService],
  imports: [TypeOrmModule.forFeature([UserRepository])],
})
export class AdminUserModule {}
