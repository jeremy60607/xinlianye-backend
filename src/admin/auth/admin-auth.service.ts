import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Util } from '../../common/util';
import { AdminRoleEnum, AdminStatusEnum } from '../../enum/admin.enum';
import { AdminLoginBody, AdminTokenPayload } from '../../common/dto/auth/admin-auth.dto';
import { AdminRepository } from '../../repository/admin.repository';
import { jwtConstants } from '../../common/constant/jwt.constant';
import { plainToClass } from 'class-transformer';
import { GetMeDTO } from '../../common/dto/admin/admin-admin.dto';

@Injectable()
export class AdminAuthService {
  constructor(private adminRepository: AdminRepository) {}

  async validateAdmin(id: number): Promise<any> {
    const admin = await this.adminRepository.findAdminById(id);
    if (admin && admin.status === AdminStatusEnum.NORMAL) {
      const { password, ...result } = admin;
      return result;
    }
    return null;
  }

  async login(adminLoginBody: AdminLoginBody) {
    const admin = await this.adminRepository.findAdmin({
      account: adminLoginBody.account,
    });

    if (await Util.bcrypt.compare(adminLoginBody.password, admin.password)) {
      const token = this.createSignInToken(admin.id, admin.role);
      return plainToClass(
        GetMeDTO,
        {
          admin: { ...admin },
          token,
        },
        { excludeExtraneousValues: true },
      );
    }

    return null;
  }

  createSignInToken(id: number, role: AdminRoleEnum) {
    const payload: AdminTokenPayload = {
      id,
      role,
    };

    return Util.jwt.sign<AdminTokenPayload>(payload, jwtConstants.adminSecret);
  }
}
