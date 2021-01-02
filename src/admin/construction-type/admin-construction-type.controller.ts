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
import { AdminConstructionTypeService } from './admin-construction-type.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ConstructionTypeParam,
  CreateConstructionTypeBody,
  FindConstructionTypesPaginationDTO,
  FindConstructionTypesQuery,
  UpdateConstructionTypeBody,
} from '../../common/dto/construction-type/construction-type.dto';
import { plainToClass } from 'class-transformer';

@Controller('v1/admin/construction-types')
export class AdminConstructionTypeController {
  constructor(
    private readonly adminConstructionTypesService: AdminConstructionTypeService,
  ) {}

  @UseGuards(AuthGuard('admin-auth'))
  @Put('/:constructionTypeId')
  async updateConstructionTypeByDTOAndConstructionTypeId(
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
