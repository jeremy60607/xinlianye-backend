import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AdminConstructionTypeService } from '../construction-type/admin-construction-type.service';
import { AdminConstructionSiteService } from './admin-construction-site.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ConstructionTypeParam, CreateConstructionTypeBody, FindConstructionTypesPaginationDTO, FindConstructionTypesQuery,
  UpdateConstructionTypeBody,
} from '../../common/dto/construction-type/construction-type.dto';
import { plainToClass } from 'class-transformer';
import {
  ConstructionSiteParam, CreateConstructionSiteBody, FindConstructionSitesPaginationDTO, FindConstructionSitesQuery,
  UpdateConstructionSiteBody,
} from '../../common/dto/construction-sit/construction-site.dto';

@Controller('construction-site')
export class AdminConstructionSiteController {
  constructor(
    private readonly adminConstructionSiteService: AdminConstructionSiteService,
  ) {}

  @UseGuards(AuthGuard('admin-auth'))
  @Put('/:constructionSiteId')
  async updateConstructionSiteByDTOAndConstructionSiteId(
    @Param() param: ConstructionSiteParam,
    @Body() body: UpdateConstructionSiteBody,
  ) {
    const { constructionSiteId } = param;
    return await this.adminConstructionSiteService.updateConstructionSiteByDTOAndConstructionSiteId(
      constructionSiteId,
      body,
    );
  }

  @UseGuards(AuthGuard('admin-auth'))
  @Delete('/:constructionSiteId')
  async deleteConstructionSiteByDTOAndConstructionSiteId(
    @Param() param: ConstructionSiteParam,
  ) {
    const { constructionSiteId } = param;
    return await this.adminConstructionSiteService.deleteConstructionSiteByDTOAndConstructionSiteId(
      constructionSiteId,
    );
  }

  @UseGuards(AuthGuard('admin-auth'))
  @Get('/')
  async findConstructionSitesByDTO(
    @Query() query: FindConstructionSitesQuery,
  ): Promise<FindConstructionSitesPaginationDTO> {
    const [
      constructionSites,
      totalCount,
    ] = await this.adminConstructionSiteService.findConstructionSitesByDTO(
      query,
    );
    const { offset, limit } = query;
    return plainToClass(FindConstructionSitesPaginationDTO, {
      constructionSites,
      pagination: {
        offset,
        limit,
        totalCount,
      },
    });
  }

  @UseGuards(AuthGuard('admin-auth'))
  @Post('/')
  async createConstructionSiteByDTO(@Body() body: CreateConstructionSiteBody) {
    await this.adminConstructionSiteService.createConstructionSiteByDTO(body);
  }
}
