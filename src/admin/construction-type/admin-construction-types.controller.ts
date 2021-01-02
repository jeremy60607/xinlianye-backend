import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminAdminService } from '../admin/admin-admin.service';
import { AdminConstructionTypesService } from './admin-construction-types.service';
import { AuthGuard } from '@nestjs/passport';
import {
  AdminParam,
  CreateAdminBody,
  UpdateAdminBody,
} from '../../common/dto/admin/admin-admin.dto';
import {
  ConstructionTypeParam,
  CreateConstructionTypeBody,
  FindConstructionTypesPaginationDTO,
  FindConstructionTypesQuery,
  UpdateConstructionTypeBody,
} from '../../common/dto/construction-type/construction-type.dto';
import { plainToClass } from 'class-transformer';

@Controller('v1/admin/construction-types')
export class AdminConstructionTypesController {
  constructor(
    private readonly adminConstructionTypesService: AdminConstructionTypesService,
  ) {}

  @UseGuards(AuthGuard('admin-auth'))
  @Put('/:constructionTypeId')
  async updateAdminByAdminId(
    @Param() param: ConstructionTypeParam,
    @Body() body: UpdateConstructionTypeBody,
  ) {
    const { constructionTypeId } = param;
    return await this.adminConstructionTypesService.updateConstructionTypeByDTOAndConstructionTypeId(
      constructionTypeId,
      body,
    );
  }

  @UseGuards(AuthGuard('admin-auth'))
  @Delete('/:constructionTypeId')
  async deleteConstructionTypeByDTOAndConstructionTypeId(
    @Param() param: ConstructionTypeParam,
  ) {
    const { constructionTypeId } = param;
    return await this.adminConstructionTypesService.deleteConstructionTypeByDTOAndConstructionTypeId(
      constructionTypeId,
    );
  }

  @UseGuards(AuthGuard('admin-auth'))
  @Get('/')
  async findConstructionTypesByDTO(
    @Query() query: FindConstructionTypesQuery,
  ): Promise<FindConstructionTypesPaginationDTO> {
    const [
      constructionTypes,
      totalCount,
    ] = await this.adminConstructionTypesService.findConstructionTypesByDTO(
      query,
    );
    const { offset, limit } = query;
    return plainToClass(FindConstructionTypesPaginationDTO, {
      constructionTypes,
      pagination: {
        offset,
        limit,
        totalCount,
      },
    });
  }

  @UseGuards(AuthGuard('admin-auth'))
  @Post('/')
  async createConstructionTypeByDTO(@Body() body: CreateConstructionTypeBody) {
    await this.adminConstructionTypesService.createConstructionTypeByDTO(body);
  }
}
