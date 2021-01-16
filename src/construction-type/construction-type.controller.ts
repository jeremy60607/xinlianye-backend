import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ConstructionTypeParam, CreateConstructionTypeBody, FindConstructionTypesPaginationDTO, FindConstructionTypesQuery,
  UpdateConstructionTypeBody,
} from '../common/dto/construction-type/construction-type.dto';
import { plainToClass } from 'class-transformer';
import { ConstructionTypeService } from './construction-type.service';

@Controller('v1/construction-types')
export class ConstructionTypeController {

  constructor(
    private readonly constructionTypeService: ConstructionTypeService,
  ) {}

  @UseGuards(AuthGuard('user-auth'))
  @Put('/:constructionTypeId')
  async updateConstructionTypeByDTOAndConstructionTypeId(
    @Param() param: ConstructionTypeParam,
    @Body() body: UpdateConstructionTypeBody,
  ) {
    const { constructionTypeId } = param;
    return await this.constructionTypeService.updateConstructionTypeByDTOAndConstructionTypeId(
      constructionTypeId,
      body,
    );
  }

  @UseGuards(AuthGuard('user-auth'))
  @Delete('/:constructionTypeId')
  async deleteConstructionTypeByDTOAndConstructionTypeId(
    @Param() param: ConstructionTypeParam,
  ) {
    const { constructionTypeId } = param;
    return await this.constructionTypeService.deleteConstructionTypeByDTOAndConstructionTypeId(
      constructionTypeId,
    );
  }

  @UseGuards(AuthGuard('user-auth'))
  @Get('/')
  async findConstructionTypesByDTO(
    @Query() query: FindConstructionTypesQuery,
  ): Promise<FindConstructionTypesPaginationDTO> {
    const [
      constructionTypes,
      totalCount,
    ] = await this.constructionTypeService.findConstructionTypesByDTO(
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

  @UseGuards(AuthGuard('user-auth'))
  @Post('/')
  async createConstructionTypeByDTO(@Body() body: CreateConstructionTypeBody) {
    await this.constructionTypeService.createConstructionTypeByDTO(body);
  }
}
