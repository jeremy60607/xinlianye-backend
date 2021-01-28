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

@EntityRepository(ConstructionTypeEntity)
export class ConstructionTypeRepository extends Repository<
  ConstructionTypeEntity
> {
  async createConstructionType(dto: CreateConstructionTypeBody) {
    await this.save({ ...dto, isDeleted: false });
  }

  async updateConstructionTypeByDTOAndConstructionTypeId(
    constructionTypeId: number,
    dto: UpdateConstructionTypeBody,
  ) {
    await this.update({ id: constructionTypeId }, { ...dto });
  }

  async findConstructionTypesAndCountByDTO(
    dto: ConstructionTypeDTO,
    pagination: PaginationQuery,
  ): Promise<[ConstructionTypeEntity[], number]> {
    const { offset, limit } = pagination;
    const { constructionTypeId } = dto;
    if (constructionTypeId) {
      return await this.createQueryBuilder('ct')
        .where({ isDeleted: false })
        .andWhere(`ct.construction_type_id = :constructionTypeId`, {
          constructionTypeId,
        })
        .skip(offset)
        .take(limit)
        .getManyAndCount();
    } else {
      return await this.createQueryBuilder('ct')
        .where({ isDeleted: false })
        .andWhere(`ct.construction_type_id is null`)
        .skip(offset)
        .take(limit)
        .getManyAndCount();
    }
  }

  async deleteConstructionTypeByConstructionTypeId(constructionTypeId: number) {
    await this.update({ id: constructionTypeId }, { isDeleted: true });
  }
}
