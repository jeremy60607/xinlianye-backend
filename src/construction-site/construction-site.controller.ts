import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AdminConstructionSiteService } from '../admin/construction-site/admin-construction-site.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ConstructionSiteParam, CreateConstructionSiteBody, FindConstructionSitesPaginationDTO, FindConstructionSitesQuery,
  UpdateConstructionSiteBody,
} from '../common/dto/construction-sit/construction-site.dto';
import { plainToClass } from 'class-transformer';
import { ConstructionSiteService } from './construction-site.service';

@Controller('v1/construction-sites')
export class ConstructionSiteController {

  constructor(
    private readonly constructionSiteService: ConstructionSiteService,
  ) {}

  @UseGuards(AuthGuard('user-auth'))
  @Put('/:constructionSiteId')
  async updateConstructionSiteByDTOAndConstructionSiteId(
    @Param() param: ConstructionSiteParam,
    @Body() body: UpdateConstructionSiteBody,
  ) {
    const { constructionSiteId } = param;
    return await this.constructionSiteService.updateConstructionSiteByDTOAndConstructionSiteId(
      constructionSiteId,
      body,
    );
  }

  @UseGuards(AuthGuard('user-auth'))
  @Delete('/:constructionSiteId')
  async deleteConstructionSiteByDTOAndConstructionSiteId(
    @Param() param: ConstructionSiteParam,
  ) {
    const { constructionSiteId } = param;
    return await this.constructionSiteService.deleteConstructionSiteByDTOAndConstructionSiteId(
      constructionSiteId,
    );
  }

  @UseGuards(AuthGuard('user-auth'))
  @Get('/')
  async findConstructionSitesByDTO(
    @Query() query: FindConstructionSitesQuery,
  ): Promise<FindConstructionSitesPaginationDTO> {
    const [
      constructionSites,
      totalCount,
    ] = await this.constructionSiteService.findConstructionSitesByDTO(
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

  @UseGuards(AuthGuard('user-auth'))
  @Post('/')
  async createConstructionSiteByDTO(@Body() body: CreateConstructionSiteBody) {
    await this.constructionSiteService.createConstructionSiteByDTO(body);
  }
}
