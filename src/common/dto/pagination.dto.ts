import { Expose, Transform } from 'class-transformer';

export class PaginationQuery {
  offset: number;

  limit: number;
}

export class PaginationDTO {
  @Expose()
  @Transform(value => Number(value))
  offset: number;

  @Expose()
  @Transform(value => Number(value))
  limit: number;

  @Expose()
  @Transform(value => Number(value))
  totalCount: number;
}
