import { Collection, MongoClient } from 'mongodb';
import logger from '../utils/logger';
import config from '../config';

class Mongo {
  client: MongoClient;

  constructor() {
    this.client = new MongoClient(config.mongodbUri);
  }

  async connect(): Promise<MongoClient> {
    logger.info('Connecting to MongoDB...');

    try {
      await this.client.connect();
      return this.client;
    } catch (err) {
      logger.error('Error connecting to MongoDB', err);
      throw new Error('Error connecting to MongoDB');
    }
  }

  getCollection(): Collection {
    return this.client.db(config.mongodbDb).collection(config.mongodbCollection);
  }

  disconnect() {
    logger.info('Disconnecting from MongoDB...');
    return this.client.close();
  }
}

const mongo = new Mongo();

export default mongo;
