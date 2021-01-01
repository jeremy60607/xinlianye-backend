import Environment = NodeJS.Environment;
// must set nodejs timezone to match MySQL timezone. TypeORM not handle datetime well at this moment 2019/5/10 Ethan.
export const envs: Environment = {
  TZ: 'UTC',
  // must set true, see docs https://github.com/TypeStrong/ts-node
  NODE_ENV: 'local',
  TS_NODE_FILES: 'true',

  // api
  XINLIANYE_API_URL: 'http://localhost:3000',
  XINLIANYE_API_IP: 'localhost',
  XINLIANYE_PORT: '3000',

  // db
  XINLIANYE_DB_HOST: 'localhost',
  XINLIANYE_DB_PORT: '24406',
  XINLIANYE_DB_USER: 'xinlianye',
  XINLIANYE_DB_PASS: '12345678',
  XINLIANYE_DB_NAME: 'xinlianye',

  // token secret
  XINLIANYE_SECRET: 'xinlianye',
};
