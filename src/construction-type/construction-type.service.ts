import { Injectable } from '@nestjs/common';
import { ConstructionTypeRepository } from '../repository/construction-type.repository';
import {
  CreateConstructionTypeBody, FindConstructionTypesQuery,
  UpdateConstructionTypeBody,
} from '../common/dto/construction-type/construction-type.dto';
import { ConstructionTypeEntity } from '../entity/construction-type.entity';

@Injectable()
export class ConstructionTypeService {

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
