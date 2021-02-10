import { Injectable } from '@nestjs/common';
import { UpdateAtRepository } from '../../repository/update-at.repository';

@Injectable()
export class AdminUpdateAtService {
  constructor(private readonly updateAtRepository: UpdateAtRepository) {}

  async findOneBy() {
    return await this.updateAtRepository.findOneBy();
  }

  async updateUpdateAt(date: Date) {
    await this.updateAtRepository.update(
      { isDeleted: false },
      { isDeleted: true },
    );
    await this.updateAtRepository.createOneBy(date);
  }
}
