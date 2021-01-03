import { Injectable } from '@nestjs/common';
import { ConstructionTypeRepository } from '../../repository/construction-type.repository';
import { ConstructionSiteRepository } from '../../repository/construction-site.repository';
import {
  CreateConstructionTypeBody,
  FindConstructionTypesQuery,
  UpdateConstructionTypeBody,
} from '../../common/dto/construction-type/construction-type.dto';
import { ConstructionTypeEntity } from '../../entity/construction-type.entity';
import {
  CreateConstructionSiteBody,
  FindConstructionSitesQuery,
  UpdateConstructionSiteBody,
} from '../../common/dto/construction-sit/construction-site.dto';
import { ConstructionSiteEntity } from '../../entity/construction-site.entity';

@Injectable()
export class AdminConstructionSiteService {
  constructor(
    private readonly constructionSiteRepository: ConstructionSiteRepository,
  ) {}

  async createConstructionSiteByDTO(
    createConstructionSiteBody: CreateConstructionSiteBody,
  ) {
    await this.constructionSiteRepository.createConstructionSite({
      ...createConstructionSiteBody,
    });
  }

  async updateConstructionSiteByDTOAndConstructionSiteId(
    constructionSiteId: number,
    updateConstructionSiteBody: UpdateConstructionSiteBody,
  ) {
    await this.constructionSiteRepository.updateConstructionSiteByDTOAndConstructionSiteId(
      constructionSiteId,
      { ...updateConstructionSiteBody },
    );
  }

  async deleteConstructionSiteByDTOAndConstructionSiteId(
    constructionSiteId: number,
  ) {
    await this.constructionSiteRepository.deleteConstructionSiteByConstructionSiteId(
      constructionSiteId,
    );
  }

  async findConstructionSitesByDTO(
    query: FindConstructionSitesQuery,
  ): Promise<[ConstructionSiteEntity[], number]> {
    const { offset, limit, ...dto } = query;
    return await this.constructionSiteRepository.findConstructionSitesAndCountByDTO(
      { ...dto },
      { offset, limit },
    );
  }
}
