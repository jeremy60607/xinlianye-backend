import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { PaginationQuery } from '../dto/pagination.dto';

@Injectable()
export class PaginationQueryPipe
  implements PipeTransform<PaginationQuery, PaginationQuery> {
  transform(
    value: PaginationQuery,
    metadata: ArgumentMetadata,
  ): PaginationQuery {
    if (metadata.type !== 'query') return value;

    if (!value.offset && !value.limit) {
      return { ...value, offset: 0, limit: 20 };
    }

    if (!value.offset) {
      return { ...value, offset: 0, limit: Number(value.limit) };
    }

    if (!value.limit) {
      return { ...value, offset: Number(value.offset), limit: 20 };
    }
    // You can do some logic to constrain limit offset range
    // e.g. limit - offset need small than 50
    return {
      ...value,
      offset: Number(value.offset),
      limit: Number(value.limit),
    };
  }
}
