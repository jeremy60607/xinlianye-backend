import { EntityRepository, Repository } from 'typeorm';
import { AdminEntity } from '../entity/admin.entity';
import {
  AdminBaseDTO,
  AdminDTO,
  CreateAdminBody,
  UpdateAdminBody,
} from '../common/dto/admin/admin-admin.dto';
import { Util } from '../common/util';
import { PaginationQuery } from '../common/dto/pagination.dto';

@EntityRepository(AdminEntity)
export class AdminRepository extends Repository<AdminEntity> {
  async findAdminById(id: number): Promise<AdminEntity> {
    return this.createQueryBuilder('admins')
      .where({ id })
      .getOne();
  }

  async createAdmin(dto: CreateAdminBody) {
    dto.password = await Util.bcrypt.hash(dto.password);
    await this.create({ ...dto });
  }

  async findAdmin(dto: AdminDTO): Promise<AdminEntity> {
    return this.findOne({ ...dto });
  }

  async updateAdminByAdminId(adminId: number, dto: UpdateAdminBody) {
    dto.password = await Util.bcrypt.hash(dto.password);
    await this.update({ id: adminId }, { ...dto });
  }

  async findAdminsAndCountByDTO(
    dto: AdminDTO,
    pagination: PaginationQuery,
  ): Promise<[AdminEntity[], number]> {
    const { offset, limit } = pagination;
    return await this.createQueryBuilder('a')
      .where({ ...dto })
      .skip(offset)
      .take(limit)
      .getManyAndCount();
  }
}
