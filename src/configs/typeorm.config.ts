import '../../envs';

import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { NamingStrategy } from './typeorm.naming-strategy';

const {
  NODE_ENV,
  XINLIANYE_DB_HOST,
  XINLIANYE_DB_PORT,
  XINLIANYE_DB_USER,
  XINLIANYE_DB_PASS,
  XINLIANYE_DB_NAME,
} = process.env;

const typeormConfig: MysqlConnectionOptions = {
  // cache,
  type: 'mysql',
  host: XINLIANYE_DB_HOST,
  port: parseInt(XINLIANYE_DB_PORT),
  username: XINLIANYE_DB_USER,
  password: XINLIANYE_DB_PASS,
  database: XINLIANYE_DB_NAME,
  entities: [],
  charset: 'utf8mb4',
  synchronize: false,
  namingStrategy: new NamingStrategy(),
  cli: {
    migrationsDir: 'src/migrations',
  },
  logging: NODE_ENV === 'production' ? ['error'] : 'all',
  extra: {
    connectionLimit: 100,
  },
  timezone: 'Z',
};

export = typeormConfig;
