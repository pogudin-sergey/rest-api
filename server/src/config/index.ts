import dotenv from 'dotenv';
import Ajv from 'ajv';
import log, { LogLevelDesc } from 'loglevel';
import schema from './schema.json';

dotenv.config();

interface Config {
  port: number
  mongodb_uri: string
}

const config: Config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8080,
  mongodb_uri: process.env.MONGODB_URI || '',
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
