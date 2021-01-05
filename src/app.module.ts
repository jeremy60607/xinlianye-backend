import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAuthModule } from './admin/auth/admin-auth.module';
import { AdminAdminModule } from './admin/admin/admin-admin.module';
import { AdminConstructionTypeModule } from './admin/construction-type/admin-construction-type.module';
import { AdminConstructionSiteModule } from './admin/construction-site/admin-construction-site.module';
import { AdminConstructionSiteDetailModule } from './admin/construction-site-detail/admin-construction-site-detail.module';
import { AdminUserModule } from './admin/user/admin-user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ autoLoadEntities: true }),
    AdminAuthModule,
    AdminAdminModule,
    AdminConstructionTypeModule,
    AdminConstructionSiteModule,
    AdminConstructionSiteDetailModule,
    AdminUserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
