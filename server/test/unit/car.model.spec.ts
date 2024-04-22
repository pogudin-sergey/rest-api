import { Collection, ObjectId } from 'mongodb';
import Car from '../../src/models/car'
import mongo from '../../src/db/mongo'

const mockValid = {
  brand: 'Toyota',
  model: 'Camry',
  year: 2022,
  price: 666,
};

const collection: Collection = mongo.getCollection();
let lastCreatedId: string = '';

describe('AutoModelTest', () => {
  beforeAll(async () => {
    await collection.deleteMany({});
  });

  afterAll(async () => {
    await mongo.disconnect();
  });

  it('should add the car', async () => {
    const car = new Car(mockValid);
    const createdId = await car.save();

    const getCar = await collection.findOne({ _id: new ObjectId(createdId) });

    expect(getCar).toEqual(expect.objectContaining(mockValid));
    expect(typeof createdId).toBe('string');

    lastCreatedId = createdId;
  });

  it('should get the car', async () => {
    const getCar = await Car.get(lastCreatedId);

    expect(getCar).toEqual(expect.objectContaining(mockValid));
  });

  it('should delete the car', async () => {
    await Car.delete(lastCreatedId);
    const getCar = await Car.get(lastCreatedId);

    expect(getCar).toBeNull();
  });

  it('should add the car', () => {
    const car = new Car(null);

    expect(async () => {
      await car.save();
    }).rejects.toThrow('Car object is empty!');
  });
});
