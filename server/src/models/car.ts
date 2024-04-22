import { ObjectId, WithId, Document } from 'mongodb';
import mongo from '../db/mongo';
import logger from '../utils/logger';

export type CarType = {
  id: string
  brand: string
  model: string
  year: number
  price: number
}

interface ICar {
  save(): Promise<string>
  get(carId: string): Promise<CarType | null>
  getByFilter(searchParams: Partial<CarType>): Promise<CarType[]>
  update(filter: Partial<CarType>): Promise<boolean>
  delete(): Promise<boolean>
}

export default class Car implements ICar {
  car: Omit<CarType, 'id'> | null = null;
  carId: string | null = null;

  constructor(param: Omit<CarType, 'id'> | string | null = null) {
    if (param === null) return;
    if (typeof param === 'string') this.carId = param;
    if (typeof param === 'object') this.car = { ...param };
  }

  async save(): Promise<string> {
    if (!this.car) throw new Error('Car object is empty!');

    try {
      const result = await mongo.getCollection().insertOne(this.car);

      logger.debug('Car inserted', {
        car: this.car,
        result,
      });

      this.carId = String(result.insertedId);

      return this.carId;
    } catch (err) {
      logger.error('Error inserting car', err);
      throw new Error('Failed to create car!');
    }
  }

  private static toCar(result: WithId<Document> | null): CarType | null {
    if (!result) return null;

    return {
      id: result._id.toHexString(),
      brand: result?.brand as string,
      model: result?.model ? result.model as string : '',
      year: result?.year ? result.year as number : 0,
      price: result?.price ? result.price as number : 0,
    };
  }

  async get(): Promise<CarType | null> {
    if (!this.carId) throw new Error('Set car id to constructor!');

    try {
      const result = await mongo.getCollection().findOne({ _id: new ObjectId(this.carId) });

      logger.debug('Car retrieved', {
        carId: this.carId,
        result,
      });

      return Car.toCar(result);
    } catch (err) {
      logger.error('Error retrieving car', err);
      throw new Error('Failed to retrieve car!');
    }
  }

  async getByFilter(searchParams: Partial<CarType>): Promise<CarType[]> {
    try {
      const result = await mongo
        .getCollection()
        .find(searchParams)
        .sort({ brand: 1 })
        .toArray();

      return result.map(car => Car.toCar(car)) as CarType[];
    } catch (err) {
      logger.error('Error retrieving cars', err);
      throw new Error('Failed to retrieve cars!');
    }
  }

  async update(car: Partial<CarType>): Promise<boolean> {
    if (!this.carId) throw new Error('Set car id to constructor!');

    try {
      const result = await mongo.getCollection().updateOne({ _id: new ObjectId(this.carId) }, { $set: car });

      logger.debug('Car updated', {
        carId: this.carId,
        car,
        result,
      });

      return Boolean(result.modifiedCount);
    } catch (err) {
      logger.error('Error updating car', err);
      throw new Error('Failed to update car!');
    }
  }

  async delete(): Promise<boolean> {
    if (!this.carId) throw new Error('Set car id to constructor!');

    try {
      const result = await mongo.getCollection().deleteOne({ _id: new ObjectId(this.carId) });

      logger.debug('Car deleted', {
        carId: this.carId,
        result,
      });

      return Boolean(result.deletedCount);
    } catch (err) {
      logger.error('Error deleting car', err);
      throw new Error('Failed to delete car!');
    }
  }
}
