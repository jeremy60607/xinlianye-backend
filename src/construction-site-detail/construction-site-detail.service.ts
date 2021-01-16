import { Injectable } from '@nestjs/common';
import { ConstructionSiteDetailRepository } from '../repository/construction-site-detail.repository';
import {
  CreateConstructionSiteDetailBody, FindConstructionSiteDetailsQuery,
  UpdateConstructionSiteDetailBody,
} from '../common/dto/construction-sit-detail/construction-site-detail.dto';
import { ConstructionSiteDetailEntity } from '../entity/construction-site-detail.entity';

@Injectable()
export class ConstructionSiteDetailService {

  constructor(
    private readonly constructionSiteDetailRepository: ConstructionSiteDetailRepository,
  ) {}

  async createConstructionSiteDetailByDTO(
    createConstructionSiteDetailBody: CreateConstructionSiteDetailBody,
  ) {
    await this.constructionSiteDetailRepository.createConstructionSiteDetail({
      ...createConstructionSiteDetailBody,
    });
  }

  async updateConstructionSiteDetailByDTOAndConstructionSiteDetailId(
    constructionSiteDetailId: number,
    updateConstructionSiteDetailBody: UpdateConstructionSiteDetailBody,
  ) {
    await this.constructionSiteDetailRepository.updateConstructionSiteDetailByDTOAndConstructionSiteDetailId(
      constructionSiteDetailId,
      { ...updateConstructionSiteDetailBody },
    );
  }

  async deleteConstructionSiteDetailByDTOAndConstructionSiteDetailId(
    constructionSiteDetailId: number,
  ) {
    await this.constructionSiteDetailRepository.deleteConstructionSiteDetailByConstructionSiteDetailId(
      constructionSiteDetailId,
    );
  }

  async findConstructionSiteDetailsByDTO(
    query: FindConstructionSiteDetailsQuery,
  ): Promise<[ConstructionSiteDetailEntity[], number]> {
    const { offset, limit, ...dto } = query;
    return await this.constructionSiteDetailRepository.findConstructionSiteDetailsAndCountByDTO(
      { ...dto },
      { offset, limit },
    );
  }
}
