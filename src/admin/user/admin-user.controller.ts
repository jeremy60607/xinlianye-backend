import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AdminUserService } from './admin-user.service';
import { AuthGuard } from '@nestjs/passport';
import { PaginationQueryPipe } from '../../common/pipes/pagination-query-pipe.service';
import { plainToClass } from 'class-transformer';
import {
  CreateUserBody,
  FindUsersPaginationDTO,
  FindUsersQuery,
  UpdateUserBody,
  UserParam,
} from '../../common/dto/user/admin-user.dto';

@Controller('v1/admin/users')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @UseGuards(AuthGuard('admin-auth'))
  @Post('/')
  async createUser(@Body() createUserDTO: CreateUserBody) {
    return await this.adminUserService.createUserByDTO(createUserDTO);
  }

  @UseGuards(AuthGuard('admin-auth'))
  @Put('/:userId')
  async updateUserByUserId(
    @Param() param: UserParam,
    @Body() body: UpdateUserBody,
  ) {
    const { userId } = param;
    return await this.adminUserService.updateUserByDTO(userId, body);
  }

  @UseGuards(AuthGuard('admin-auth'))
  @UsePipes(new PaginationQueryPipe())
  @Get('/')
  async findUsers(
    @Query() query: FindUsersQuery,
  ): Promise<FindUsersPaginationDTO> {
    const [
      users,
      totalCount,
    ] = await this.adminUserService.findUsersAndCountByDTO(query);

    const { offset, limit } = query;
    return plainToClass(
      FindUsersPaginationDTO,
      {
        users,
        pagination: { offset, limit, totalCount },
      },
      { excludeExtraneousValues: true },
    );
  }
}
