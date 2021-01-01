import { Expose } from 'class-transformer';

export class PaginationQuery {
  offset: number;

  limit: number;
}

export class PaginationDTO {
  @Expose()
  offset: number;

  @Expose()
  limit: number;

  @Expose()
  totalCount: number;
}
