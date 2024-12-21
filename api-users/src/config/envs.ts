import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASS: string;
  DB_NAME: string;
  JWT_SECRET: string;
  // AWS_ACCESS_KEY_ID: string;
  // AWS_SECRET_ACCESS_KEY: string;
  // S3_BUCKET: string;
  // AWS_REGION: string;
}

const evnsSchema = joi
  .object({
    PORT: joi.number().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USER: joi.string().required(),
    DB_PASS: joi.string().required(),
    DB_NAME: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    //AWS_ACCESS_KEY_ID: joi.string().required(),
    //AWS_SECRET_ACCESS_KEY: joi.string().required(),
    // S3_BUCKET: joi.string().required(),
    //AWS_REGION: joi.string().required(),
  })
  .unknown(true);

const { error, value } = evnsSchema.validate(process.env);

if (error) {
  throw new Error(`Config Validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  db_host: envVars.DB_HOST,
  db_port: envVars.DB_PORT,
  db_user: envVars.DB_USER,
  db_pass: envVars.DB_PASS,
  db_name: envVars.DB_NAME,
  jwtSecret: envVars.JWT_SECRET,
  //awsAccessKeyId: envVars.AWS_ACCESS_KEY_ID,
  //awsSecretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
  // awsBucketName: envVars.S3_BUCKET,
  //awsRegion: envVars.AWS_REGION,
};
