import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from '@nestjs/typeorm';
import typeormConfig from './typeorm.config';

export class ConfigService implements TypeOrmOptionsFactory {
  constructor() {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {...typeormConfig, keepConnectionAlive: true};
  }
}
