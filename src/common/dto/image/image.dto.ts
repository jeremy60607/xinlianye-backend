import { Expose } from 'class-transformer';

export class CreateImageBody {
  belongId: number;
  fileDir: string;
}

export class FindImageUrlsQuery {
  fileDir: string;
  belongId: number;
}

export class FindImageUrlsResponse {
  @Expose()
  imageUrls: string[];
}
