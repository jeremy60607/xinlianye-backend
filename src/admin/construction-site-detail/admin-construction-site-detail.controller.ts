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
import { AdminConstructionSiteDetailService } from './admin-construction-site-detail.service';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import {
  ConstructionSiteDetailParam,
  CreateConstructionSiteDetailBody,
  FindConstructionSiteDetailsPaginationDTO,
  FindConstructionSiteDetailsQuery,
  UpdateConstructionSiteDetailBody,
} from '../../common/dto/construction-sit-detail/construction-site-detail.dto';

@Controller('construction-site-detail')
export class AdminConstructionSiteDetailController {
  constructor(
    private readonly adminConstructionSiteDetailService: AdminConstructionSiteDetailService,
  ) {}

  @UseGuards(AuthGuard('admin-auth'))
  @Put('/:constructionSiteDetailId')
  async updateConstructionSiteDetailByDTOAndConstructionSiteDetailId(
    @Param() param: ConstructionSiteDetailParam,
    @Body() body: UpdateConstructionSiteDetailBody,
  ) {
    const { constructionSiteDetailId } = param;
    return await this.adminConstructionSiteDetailService.updateConstructionSiteDetailByDTOAndConstructionSiteDetailId(
      constructionSiteDetailId,
      body,
    );
  }

  @UseGuards(AuthGuard('admin-auth'))
  @Delete('/:constructionSiteDetailId')
  async deleteConstructionSiteDetailByDTOAndConstructionSiteDetailId(
    @Param() param: ConstructionSiteDetailParam,
  ) {
    const { constructionSiteDetailId } = param;
    return await this.adminConstructionSiteDetailService.deleteConstructionSiteDetailByDTOAndConstructionSiteDetailId(
      constructionSiteDetailId,
    );
  }

  @UseGuards(AuthGuard('admin-auth'))
  @Get('/')
  async findConstructionSiteDetailsByDTO(
    @Query() query: FindConstructionSiteDetailsQuery,
  ): Promise<FindConstructionSiteDetailsPaginationDTO> {
    const [
      constructionSiteDetails,
      totalCount,
    ] = await this.adminConstructionSiteDetailService.findConstructionSiteDetailsByDTO(
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

  @UseGuards(AuthGuard('admin-auth'))
  @Post('/')
  async createConstructionSiteDetailByDTO(
    @Body() body: CreateConstructionSiteDetailBody,
  ) {
    await this.adminConstructionSiteDetailService.createConstructionSiteDetailByDTO(
      body,
    );
  }
}
