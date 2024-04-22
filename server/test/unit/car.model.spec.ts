import { Collection, ObjectId } from 'mongodb';
import Car from '../../src/models/car'
import mongo from '../../src/db/mongo'
import { mockCar1, mockCar2, mockCar3, mockCar4 } from './car.model.mock'

const collection: Collection = mongo.getCollection();
let lastCreatedId: string = '';
let mockCar1Updated: object = {};

describe('AutoModelTest', () => {
  beforeAll(async () => {
    await collection.deleteMany({});
  });

  afterAll(async () => {
    await mongo.disconnect();
  });

  it('should add the car', async () => {
    const car = new Car(mockCar1);
    const createdId = await car.save();

    const getCar = await collection.findOne({ _id: new ObjectId(createdId) });

    expect(getCar).toEqual(expect.objectContaining(mockCar1));
    expect(typeof createdId).toBe('string');

    lastCreatedId = createdId;
  });

  it('should get the car', async () => {
    const getCar = await new Car(lastCreatedId).get();

    expect(getCar).toEqual(expect.objectContaining(mockCar1));
  });

  it('should update the car', async () => {
    const update = { price: 777, year: 2023, model: 'Vesta', brand: 'Lada' };
    mockCar1Updated = Object.assign(mockCar1, update);

    const updateResult = await new Car(lastCreatedId).update(update);
    const getCar = await new Car(lastCreatedId).get();

    expect(updateResult).toEqual(true);
    expect(getCar).toEqual(expect.objectContaining(mockCar1Updated));
  });

  it('should add more car', async () => {
    const createdId2 = await new Car(mockCar2).save();
    const createdId3 = await new Car(mockCar3).save();
    const createdId4 = await new Car(mockCar4).save();

    expect(typeof createdId2).toBe('string');
    expect(typeof createdId3).toBe('string');
    expect(typeof createdId4).toBe('string');
  });

  it('should get the one car by 1 filter', async () => {
    const cars = await new Car().getByFilter({ brand: 'Lada' });

    expect(cars.length).toBe(1);
    expect(cars[0]).toEqual(expect.objectContaining(mockCar1Updated));
  });

  it('should get the one car by 2 filters', async () => {
    const cars = await new Car().getByFilter({ brand: 'Toyota', year: 2023 });

    expect(cars.length).toBe(2);
    expect(cars[0]).toEqual(expect.objectContaining(mockCar2));
    expect(cars[1]).toEqual(expect.objectContaining(mockCar3));
  });

  it('should be sort', async () => {
    const cars = await new Car().getByFilter({ price: 333 });

    expect(cars.length).toBe(2);
    expect(cars[0]).toEqual(expect.objectContaining(mockCar4));
    expect(cars[1]).toEqual(expect.objectContaining(mockCar3));
  });

  it('should delete the car', async () => {
    await new Car(lastCreatedId).delete();
    const getCar = await new Car(lastCreatedId).get();
    const cars = await new Car().getByFilter({});

    expect(cars.length).toBe(3);
    expect(getCar).toBeNull();
  });

  it('should do not add the car 1', () => {
    const car = new Car('mock');

    expect(async () => {
      await car.save();
    }).rejects.toThrow('Car object is empty!');
  });

  it('should do not add the car 2', () => {
    const car = new Car();

    expect(async () => {
      await car.save();
    }).rejects.toThrow('Car object is empty!');
  });

  it('should do not get the car', () => {
    expect(async () => {
      await new Car().get();
    }).rejects.toThrow('Set car id to constructor!');
  });

  it('should do not update the car', () => {
    expect(async () => {
      await new Car().update({});
    }).rejects.toThrow('Set car id to constructor!');
  });

  it('should do not delete the car', () => {
    expect(async () => {
      await new Car().delete();
    }).rejects.toThrow('Set car id to constructor!');
  });
});
