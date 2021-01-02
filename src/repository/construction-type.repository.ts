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
  CreateConstructionTypeBody, FindConstructionTypesPaginationDTO, FindConstructionTypesQuery,
  UpdateConstructionTypeBody,
} from '../common/dto/construction-type/construction-type.dto';

@EntityRepository(ConstructionTypeEntity)
export class ConstructionTypeRepository extends Repository<ConstructionTypeEntity> {

  async createConstructionType(dto: CreateConstructionTypeBody) {
    await this.create({ ...dto, isDeleted: false });
  }

  async updateConstructionTypeByDTOAndConstructionTypeId(constructionTypeId: number, dto: UpdateConstructionTypeBody) {
    await this.update({ id: constructionTypeId }, { ...dto });
  }

  async findConstructionTypesAndCountByDTO(
    dto: ConstructionTypeDTO,
    pagination: PaginationQuery,
  ): Promise<[ConstructionTypeEntity[], number]> {
    const { offset, limit } = pagination;
    return await this.createQueryBuilder('ct')
      .where({ ...dto, isDeleted: false })
      .skip(offset)
      .take(limit)
      .getManyAndCount();
  }

  async deleteConstructionTypeByConstructionTypeId(constructionTypeId: number) {
    await this.update({ id: constructionTypeId }, { isDeleted: true });
  }
}
