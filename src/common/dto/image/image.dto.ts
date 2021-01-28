import { Expose } from 'class-transformer';

export class ImageParam {
  imageId: number;
}

export class CreateImageParam {
  belongId: number;
  fileDir: string;
  sort: number;
  fileName?: string;
}

export class FindImageUrlsQuery {
  fileDir: string;
  belongId: number;
}

export class FindImageUrlsResponse {
  @Expose()
  imageUrls: { url: string; id: number; name: string }[];
}
