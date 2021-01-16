import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAuthModule } from './admin/auth/admin-auth.module';
import { AdminAdminModule } from './admin/admin/admin-admin.module';
import { AdminConstructionTypeModule } from './admin/construction-type/admin-construction-type.module';
import { AdminConstructionSiteModule } from './admin/construction-site/admin-construction-site.module';
import { AdminConstructionSiteDetailModule } from './admin/construction-site-detail/admin-construction-site-detail.module';
import { AdminUserModule } from './admin/user/admin-user.module';
import { AdminImageModule } from './admin/image/admin-image.module';
import { AuthModule } from './app/auth/auth.module';
import { ConstructionTypeModule } from './construction-type/construction-type.module';
import { ConstructionSiteModule } from './construction-site/construction-site.module';
import { ConstructionSiteDetailModule } from './construction-site-detail/construction-site-detail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ autoLoadEntities: true }),

    // admin
    AdminAuthModule,
    AdminAdminModule,
    AdminConstructionTypeModule,
    AdminConstructionSiteModule,
    AdminConstructionSiteDetailModule,
    AdminUserModule,
    AdminImageModule,

    // app
    AuthModule,

    ConstructionTypeModule,

    ConstructionSiteModule,

    ConstructionSiteDetailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
