import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
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
} from './dto/admin-admin.dto';
import { plainToClass } from 'class-transformer';

@Controller('v1/admin/admin')
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
  @Get('/')
  async findAdmins(
    @CurrentAdmin() query: FindAdminsQuery,
  ): Promise<FindAdminsPaginationDTO> {
    const [
      admins,
      totalCount,
    ] = await this.adminAdminService.findAdminsAndCountByDTO(query);
    const { offset, limit } = query;
    return plainToClass(FindAdminsPaginationDTO, {
      admins,
      pagination: { offset, limit, totalCount },
    });
  }
}
