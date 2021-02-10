import { Expose } from 'class-transformer';

export class UpdateAtDTO {
  @Expose()
  date: Date;
}
