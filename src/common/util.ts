import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import path from 'path';

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
  gcp: {
    upload: async (filePath: string, filename: string, file) => {
      const bucketName = 'xinlianye_bucket_prod';
      const keyPath = `${process.cwd()}/xinlianye-prod-37f21bf84bad.json`;

      const { Storage } = require('@google-cloud/storage');
      const storage = new Storage({
        projectId: bucketName,
        keyFilename: keyPath,
      });
      async function uploadFile() {
        await storage
          .bucket(bucketName)
          .file(`${filePath}/${filename}.jpg`)
          .save(file.buffer);
      }

      uploadFile().catch(console.error);
      // [END storage_upload_file]
    },
    getSignedUrl: async (
      filePath: string,
      filename: string,
    ): Promise<string> => {
      const bucketName = 'xinlianye_bucket_prod';
      const keyPath = `${process.cwd()}/xinlianye-prod-37f21bf84bad.json`;
      const { Storage } = require('@google-cloud/storage');
      const storage = new Storage({
        projectId: bucketName,
        keyFilename: keyPath,
      });
      const bucket = storage.bucket(bucketName);
      const file = bucket.file(`${filePath}/${filename}.jpg`);
      const ONE_WEEK = 604800;
      const url = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + ONE_WEEK,
      });
      return url[0];
    },
  },
};
