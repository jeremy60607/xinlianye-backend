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
import { AdminConstructionSiteDetailService } from '../../admin/construction-site-detail/admin-construction-site-detail.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ConstructionSiteDetailParam,
  CreateConstructionSiteDetailBody,
  FindConstructionSiteDetailsPaginationDTO,
  FindConstructionSiteDetailsQuery,
  UpdateConstructionSiteDetailBody,
} from '../../common/dto/construction-sit-detail/construction-site-detail.dto';
import { plainToClass } from 'class-transformer';
import { ConstructionSiteDetailService } from './construction-site-detail.service';

@Controller('v1/construction-site-details')
export class ConstructionSiteDetailController {
  constructor(
    private readonly constructionSiteDetailService: ConstructionSiteDetailService,
  ) {}

  @UseGuards(AuthGuard('user-auth'))
  @Put('/:constructionSiteDetailId')
  async updateConstructionSiteDetailByDTOAndConstructionSiteDetailId(
    @Param() param: ConstructionSiteDetailParam,
    @Body() body: UpdateConstructionSiteDetailBody,
  ) {
    const { constructionSiteDetailId } = param;
    return await this.constructionSiteDetailService.updateConstructionSiteDetailByDTOAndConstructionSiteDetailId(
      constructionSiteDetailId,
      body,
    );
  }

  @UseGuards(AuthGuard('user-auth'))
  @Delete('/:constructionSiteDetailId')
  async deleteConstructionSiteDetailByDTOAndConstructionSiteDetailId(
    @Param() param: ConstructionSiteDetailParam,
  ) {
    const { constructionSiteDetailId } = param;
    return await this.constructionSiteDetailService.deleteConstructionSiteDetailByDTOAndConstructionSiteDetailId(
      constructionSiteDetailId,
    );
  }

  @UseGuards(AuthGuard('user-auth'))
  @Get('/')
  async findConstructionSiteDetailsByDTO(
    @Query() query: FindConstructionSiteDetailsQuery,
  ): Promise<FindConstructionSiteDetailsPaginationDTO> {
    const [
      constructionSiteDetails,
      totalCount,
    ] = await this.constructionSiteDetailService.findConstructionSiteDetailsByDTO(
      query,
    );
    const { offset, limit } = query;
    return plainToClass(FindConstructionSiteDetailsPaginationDTO, {
      constructionSiteDetails,
      pagination: {
        offset,
        limit,
        totalCount,
      },
    });
  }

  @UseGuards(AuthGuard('user-auth'))
  @Post('/')
  async createConstructionSiteDetailByDTO(
    @Body() body: CreateConstructionSiteDetailBody,
  ) {
    await this.constructionSiteDetailService.createConstructionSiteDetailByDTO(
      body,
    );
  }
}
