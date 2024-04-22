import { ObjectId, WithId, Document } from 'mongodb';
import mongo from '../db/mongo';
import logger from '../utils/logger';

export type CarType = {
  brand: string;
  model: string;
  year: number;
  price: number;
}

export default class Car {
  car: CarType | null;

  constructor(car: CarType | null = null) {
    this.car = car ? { ...car } : null;
  }

  async save(): Promise<string> {
    if (!this.car) {
      throw new Error('Car object is empty!');
    }

    try {
      const result = await mongo.getCollection().insertOne(this.car);

      logger.debug('Car inserted', {
        car: this.car,
        result,
      });

      return String(result.insertedId);
    } catch (err) {
      logger.error('Error inserting car', err);
      throw new Error('Failed to create car!');
    }
  }

  static toCar(result: WithId<Document> | null): CarType | null {
    if (!result) return null;

    return {
      brand: result?.brand as string,
      model: result?.model ? result.model as string : '',
      year: result?.year ? result.year as number : 0,
      price: result?.price ? result.price as number : 0,
    };
  }

  static async get(carId: string): Promise<CarType | null> {
    try {
      const result = await mongo.getCollection().findOne({ _id: new ObjectId(carId) });

      logger.debug('Car retrieved', {
        carId,
        result,
      });

      return Car.toCar(result);
    } catch (err) {
      logger.error('Error retrieving car', err);
      throw new Error('Failed to retrieve car!');
    }
  }
}
