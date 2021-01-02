import { Injectable } from '@nestjs/common';
import { AdminAuthService } from '../auth/admin-auth.service';
import { plainToClass } from 'class-transformer';
import {
  AdminBaseDTO,
  AdminDTO,
  CreateAdminBody,
  FindAdminsPaginationDTO,
  FindAdminsQuery,
  GetMeDTO,
  UpdateAdminBody,
} from '../../common/dto/admin/admin-admin.dto';
import { AdminRepository } from '../../repository/admin.repository';
import { AdminEntity } from '../../entity/admin.entity';

@Injectable()
export class AdminAdminService {
  constructor(
    private readonly authService: AdminAuthService,
    private readonly adminRepository: AdminRepository,
  ) {}

  async getMe(admin: AdminDTO) {
    await this.authService.validateAdmin(admin.id);
    const token = this.authService.createSignInToken(admin.id, admin.role);
    return plainToClass(
      GetMeDTO,
      {
        admin: { ...admin },
        token,
      },
      { excludeExtraneousValues: true },
    );
  }

  async createAdminByDTO(createAdminDTO: CreateAdminBody) {
    await this.adminRepository.createAdmin({ ...createAdminDTO });
  }

  async updateAdminByDTO(adminId: number, updateAdminBody: UpdateAdminBody) {
    await this.adminRepository.updateAdminByAdminId(adminId, {
      ...updateAdminBody,
    });
  }

  async findAdminsAndCountByDTO(
    dto: FindAdminsQuery,
  ): Promise<[AdminEntity[], number]> {
    const { offset, limit, ...baseAdminDTO } = dto;
    return await this.adminRepository.findAdminsAndCountByDTO(baseAdminDTO, {
      offset,
      limit,
    });
  }
}
