import dotenv from 'dotenv';
import Ajv from 'ajv';
import log, { LogLevelDesc } from 'loglevel';
import schema from './schema.json';

dotenv.config();

interface Config {
  port: number
  mongodbUri: string
  mongodbDb: string
  mongodbCollection: string
  logLevel: LogLevelDesc
}

const config: Config = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
  mongodbUri: process.env.MONGODB_URI || '',
  mongodbDb: process.env.MONGODB_DBNAME || '',
  mongodbCollection: process.env.MONGODB_COLLECTION || '',
  logLevel: process.env.LOG_LEVEL as LogLevelDesc || log.levels.DEBUG,
};

// Schema verify
const ajv = new Ajv();
const validate = ajv.compile(schema);
if (!validate(config)) {
  // eslint-disable-next-line no-console
  console.error(validate.errors);
  throw new Error('Config validation failed');
}

export default config;
