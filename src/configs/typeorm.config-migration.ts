import '../envs';

import {MysqlConnectionOptions} from 'typeorm/driver/mysql/MysqlConnectionOptions';
import {NamingStrategy} from './typeorm.naming-strategy';

const {
  XINLIANYE_DB_HOST,
  XINLIANYE_DB_PORT,
  XINLIANYE_DB_USER,
  XINLIANYE_DB_PASS,
  XINLIANYE_DB_NAME,
} = process.env;

const typeormConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: XINLIANYE_DB_HOST,
  port: parseInt(XINLIANYE_DB_PORT),
  username: XINLIANYE_DB_USER,
  password: XINLIANYE_DB_PASS,
  database: XINLIANYE_DB_NAME,
  charset: 'utf8mb4',
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  namingStrategy: new NamingStrategy(),
  logging: true,
  extra: {
    connectionLimit: 100,
  },
  timezone: 'Z',
};

module.exports = typeormConfig;
