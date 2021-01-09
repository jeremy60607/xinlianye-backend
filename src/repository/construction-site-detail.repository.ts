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
import { ConstructionSiteDetailEntity } from '../entity/construction-site-detail.entity';
import {
  ConstructionSiteDetailDTO,
  CreateConstructionSiteDetailBody,
  UpdateConstructionSiteDetailBody,
} from '../common/dto/construction-sit-detail/construction-site-detail.dto';

@EntityRepository(ConstructionSiteDetailEntity)
export class ConstructionSiteDetailRepository extends Repository<
  ConstructionSiteDetailEntity
> {
  async createConstructionSiteDetail(dto: CreateConstructionSiteDetailBody) {
    await this.save({ ...dto, isDeleted: false });
  }

  async updateConstructionSiteDetailByDTOAndConstructionSiteDetailId(
    constructionSiteDetailId: number,
    dto: UpdateConstructionSiteDetailBody,
  ) {
    await this.update({ id: constructionSiteDetailId }, { ...dto });
  }

  async findConstructionSiteDetailsAndCountByDTO(
    dto: ConstructionSiteDetailDTO,
    pagination: PaginationQuery,
  ): Promise<[ConstructionSiteDetailEntity[], number]> {
    const { offset, limit } = pagination;
    return await this.createQueryBuilder('ct')
      .where({ ...dto, isDeleted: false })
      .skip(offset)
      .take(limit)
      .getManyAndCount();
  }

  async deleteConstructionSiteDetailByConstructionSiteDetailId(
    constructionSiteDetailId: number,
  ) {
    await this.update({ id: constructionSiteDetailId }, { isDeleted: true });
  }
}
