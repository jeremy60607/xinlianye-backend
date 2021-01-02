import { EntityRepository, Repository } from 'typeorm';
import { AdminEntity } from '../entity/admin.entity';
import {
  AdminBaseDTO,
  AdminDTO,
  CreateAdminBody,
  UpdateAdminBody,
} from '../common/dto/admin/admin-admin.dto';
import { Util } from '../common/util';
import { PaginationQuery } from '../common/dto/pagination.dto';
import { ConstructionTypeEntity } from '../entity/construction-type.entity';
import {
  ConstructionTypeDTO,
  CreateConstructionTypeBody,
  FindConstructionTypesPaginationDTO,
  FindConstructionTypesQuery,
  UpdateConstructionTypeBody,
} from '../common/dto/construction-type/construction-type.dto';
import { ConstructionSiteEntity } from '../entity/construction-site.entity';
import {
  ConstructionSiteDTO,
  CreateConstructionSiteBody,
  UpdateConstructionSiteBody,
} from '../common/dto/construction-sit/construction-site.dto';

@EntityRepository(ConstructionSiteEntity)
export class ConstructionSiteRepository extends Repository<ConstructionSiteEntity> {
  async createConstructionSite(dto: CreateConstructionSiteBody) {
    await this.create({ ...dto, isDeleted: false });
  }

  async updateConstructionSiteByDTOAndConstructionSiteId(
    constructionSiteId: number,
    dto: UpdateConstructionSiteBody,
  ) {
    await this.update({ id: constructionSiteId }, { ...dto });
  }

  async findConstructionSitesAndCountByDTO(
    dto: ConstructionSiteDTO,
    pagination: PaginationQuery,
  ): Promise<[ConstructionSiteEntity[], number]> {
    const { offset, limit } = pagination;
    return await this.createQueryBuilder('ct')
      .where({ ...dto, isDeleted: false })
      .skip(offset)
      .take(limit)
      .getManyAndCount();
  }

  async deleteConstructionSiteByConstructionSiteId(constructionSiteId: number) {
    await this.update({ id: constructionSiteId }, { isDeleted: true });
  }
}
