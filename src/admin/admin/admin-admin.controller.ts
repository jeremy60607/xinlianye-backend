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
import { AuthGuard } from '@nestjs/passport';
import { CurrentAdmin } from '../../common/decorators/current-admin.decorator';
import { AdminAdminService } from './admin-admin.service';
import {
  AdminDTO,
  AdminParam,
  CreateAdminBody,
  FindAdminsPaginationDTO,
  FindAdminsQuery,
  UpdateAdminBody,
} from '../../common/dto/admin/admin-admin.dto';
import { plainToClass } from 'class-transformer';
import { PaginationDTO } from '../../common/dto/pagination.dto';
import { PaginationQueryPipe } from '../../common/pipes/pagination-query-pipe.service';

@Controller('v1/admin/admins')
export class AdminAdminController {
  constructor(private readonly adminAdminService: AdminAdminService) {}

  @UseGuards(AuthGuard('admin-auth'))
  @Post('/')
  async createAdmin(@Body() createAdminDTO: CreateAdminBody) {
    return await this.adminAdminService.createAdminByDTO(createAdminDTO);
  }

  @UseGuards(AuthGuard('admin-auth'))
  @Put('/:adminId')
  async updateAdminByAdminId(
    @Param() param: AdminParam,
    @Body() body: UpdateAdminBody,
  ) {
    const { adminId } = param;
    return await this.adminAdminService.updateAdminByDTO(adminId, body);
  }

  @UseGuards(AuthGuard('admin-auth'))
  @Get('/me')
  async getMe(@CurrentAdmin() admin: AdminDTO) {
    return await this.adminAdminService.getMe(admin);
  }

  @UseGuards(AuthGuard('admin-auth'))
  @UsePipes(new PaginationQueryPipe())
  @Get('/')
  async findAdmins(
    @Query() query: FindAdminsQuery,
  ): Promise<FindAdminsPaginationDTO> {
    const [
      admins,
      totalCount,
    ] = await this.adminAdminService.findAdminsAndCountByDTO(query);

    const { offset, limit } = query;
    return plainToClass(
      FindAdminsPaginationDTO,
      {
        admins,
        pagination: { offset, limit, totalCount },
      },
      { excludeExtraneousValues: true },
    );
  }
}
