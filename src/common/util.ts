import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export const Util = {
  jwt: {
    sign: <T extends {}>(
      payload: T,
      secret: string,
      options?: jwt.SignOptions,
    ) => jwt.sign(payload, secret, options),
    verify: (token: string, secret: string, options?: jwt.VerifyOptions) =>
      jwt.verify(token, secret, options),
    decode: <T>(token: string, options?: jwt.DecodeOptions) =>
      jwt.decode(token, options) as T, // tslint:disable-line:prefer-type-cast
  },
  bcrypt: {
    hash: async (password: string) => {
      const saltOrRounds = 10;
      return await bcrypt.hash(password, saltOrRounds);
    },
    compare: async (password: string, hash: string) =>
      await bcrypt.compare(password, hash),
  },
};
