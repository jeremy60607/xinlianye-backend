import { Expose, Type } from 'class-transformer';
import { PaginationDTO, PaginationQuery } from '../pagination.dto';
import { AdminDTO } from '../admin/admin-admin.dto';
import { ProcessType } from '../../../enum/construction-site-detail.enum';

export class ConstructionSiteDetailParam {
  @Expose()
  constructionSiteDetailId: number;
}

export class ConstructionSiteDetailBaseDTO {
  @Expose()
  title: string;

  @Expose()
  processType: ProcessType;

  @Expose()
  constructionSiteId: number;
}

export class ConstructionSiteDetailDTO extends ConstructionSiteDetailBaseDTO {
  @Expose()
  id: number;
}

export class CreateConstructionSiteDetailBody extends ConstructionSiteDetailBaseDTO {}

export class UpdateConstructionSiteDetailBody extends ConstructionSiteDetailBaseDTO {}

export class FindConstructionSiteDetailsQuery extends ConstructionSiteDetailDTO
  implements PaginationQuery {
  limit: number;
  offset: number;
}

export class FindConstructionSiteDetailsPaginationDTO {
  @Expose()
  @Type(() => ConstructionSiteDetailDTO)
  constructionSiteDetails: ConstructionSiteDetailDTO[];

  @Expose()
  @Type(() => PaginationDTO)
  pagination: PaginationDTO;
}
