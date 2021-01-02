import { Injectable } from '@nestjs/common';
import { AdminAuthService } from '../auth/admin-auth.service';
import { AdminRepository } from '../../repository/admin.repository';
import { ConstructionTypeRepository } from '../../repository/construction-type.repository';
import { CreateAdminBody } from '../../common/dto/admin/admin-admin.dto';
import {
  CreateConstructionTypeBody,
  FindConstructionTypesQuery,
  UpdateConstructionTypeBody,
} from '../../common/dto/construction-type/construction-type.dto';
import { ConstructionTypeEntity } from '../../entity/construction-type.entity';

@Injectable()
export class AdminConstructionTypesService {
  constructor(
    private readonly constructionTypeRepository: ConstructionTypeRepository,
  ) {}

  async createConstructionTypeByDTO(
    createConstructionTypeBody: CreateConstructionTypeBody,
  ) {
    await this.constructionTypeRepository.createConstructionType({
      ...createConstructionTypeBody,
    });
  }

  async updateConstructionTypeByDTOAndConstructionTypeId(
    constructionTypeId: number,
    updateConstructionTypeBody: UpdateConstructionTypeBody,
  ) {
    await this.constructionTypeRepository.updateConstructionTypeByDTOAndConstructionTypeId(
      constructionTypeId,
      { ...updateConstructionTypeBody },
    );
  }

  async deleteConstructionTypeByDTOAndConstructionTypeId(
    constructionTypeId: number,
  ) {
    await this.constructionTypeRepository.deleteConstructionTypeByConstructionTypeId(
      constructionTypeId,
    );
  }

  async findConstructionTypesByDTO(
    query: FindConstructionTypesQuery,
  ): Promise<[ConstructionTypeEntity[], number]> {
    const { offset, limit, ...dto } = query;
    return await this.constructionTypeRepository.findConstructionTypesAndCountByDTO(
      { ...dto },
      { offset, limit },
    );
  }
}
