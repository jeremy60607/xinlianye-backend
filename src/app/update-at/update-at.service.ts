import { Injectable } from '@nestjs/common';
import { ConstructionSiteRepository } from '../../repository/construction-site.repository';
import { UpdateAtRepository } from '../../repository/update-at.repository';

@Injectable()
export class UpdateAtService {
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
