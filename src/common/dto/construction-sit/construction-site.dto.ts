import { Expose, Type } from 'class-transformer';
import { PaginationDTO, PaginationQuery } from '../pagination.dto';
import { AdminDTO } from '../admin/admin-admin.dto';
import { ProcessType } from '../../../enum/construction-site-detail.enum';

export class ConstructionSiteParam {
  @Expose()
  constructionSiteId: number;
}

export class ConstructionSiteBaseDTO {
  @Expose()
  floor: string;

  @Expose()
  processType: ProcessType;

  @Expose()
  constructionTypeId: number;

  @Expose()
  percentage: number;

  @Expose()
  notes: string;
}

export class ConstructionSiteDTO extends ConstructionSiteBaseDTO {
  @Expose()
  id: number;
}

export class CreateConstructionSiteBody extends ConstructionSiteBaseDTO {}

export class UpdateConstructionSiteBody extends ConstructionSiteBaseDTO {}

export class FindConstructionSitesQuery extends ConstructionSiteDTO
  implements PaginationQuery {
  limit: number;
  offset: number;
}

export class FindConstructionSitesPaginationDTO {
  @Expose()
  @Type(() => ConstructionSiteDTO)
  constructionSites: ConstructionSiteDTO[];

  @Expose()
  @Type(() => PaginationDTO)
  pagination: PaginationDTO;
}
