import { Expose, Type } from 'class-transformer';
import { PaginationDTO, PaginationQuery } from '../pagination.dto';
import { AdminDTO } from '../admin/admin-admin.dto';

export class ConstructionTypeParam {
  @Expose()
  constructionTypeId: number;
}

export class ConstructionTypeBaseDTO {
  @Expose()
  title: string;

  @Expose()
  percentage: number;

  @Expose()
  constructionTypeId: number;
}

export class ConstructionTypeDTO extends ConstructionTypeBaseDTO {
  @Expose()
  id: number;
}

export class CreateConstructionTypeBody extends ConstructionTypeBaseDTO {}

export class UpdateConstructionTypeBody extends ConstructionTypeBaseDTO {}

export class FindConstructionTypesQuery extends ConstructionTypeDTO
  implements PaginationQuery {
  limit: number;
  offset: number;
}

export class FindConstructionTypesPaginationDTO {
  @Expose()
  @Type(() => ConstructionTypeDTO)
  constructionTypes: ConstructionTypeDTO[];

  @Expose()
  @Type(() => PaginationDTO)
  pagination: PaginationDTO;
}
