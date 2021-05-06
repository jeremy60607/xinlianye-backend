import Environment = NodeJS.Environment;
// must set nodejs timezone to match MySQL timezone. TypeORM not handle datetime well at this moment 2019/5/10 Ethan.
export const envs: Environment = {
  TZ: 'UTC',
  // must set true, see docs https://github.com/TypeStrong/ts-node
  NODE_ENV: 'sit',
  TS_NODE_FILES: 'true',

  // api
  XINLIANYE_API_URL: 'http://localhost:3000',
  XINLIANYE_API_IP: 'localhost',
  XINLIANYE_PORT: '3000',

  // db
  XINLIANYE_DB_HOST: '172.22.96.5',
  XINLIANYE_DB_PORT: '3306',
  XINLIANYE_DB_USER: 'root',
  XINLIANYE_DB_PASS: '666mfmrOfbwEK1si',
  XINLIANYE_DB_NAME: 'xinlianye',

  // token secret
  XINLIANYE_SECRET: 'xinlianye',

  // gcp
  XINLIANYE_BUCKET_FILE_NAME: 'xinlianye-prod-37f21bf84bad.json',
};
