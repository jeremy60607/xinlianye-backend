import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAuthModule } from './admin/auth/admin-auth.module';
import { AdminAdminModule } from './admin/admin/admin-admin.module';
import { AdminConstructionTypesModule } from './admin/construction-type/admin-construction-types.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ autoLoadEntities: true }),
    AdminAuthModule,
    AdminAdminModule,
    AdminConstructionTypesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
