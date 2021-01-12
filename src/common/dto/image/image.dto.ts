import { Expose } from 'class-transformer';

export class ImageParam {
  imageId: number;
}

export class CreateImageParam {
  belongId: number;
  fileDir: string;
  sort: number;
}

export class FindImageUrlsQuery {
  fileDir: string;
  belongId: number;
}

export class FindImageUrlsResponse {
  @Expose()
  images: {url: string, id: number}[];
}
