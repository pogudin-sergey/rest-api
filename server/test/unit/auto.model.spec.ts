import { Collection, ObjectId } from 'mongodb';
import Car from '../../src/models/car'
import mongo from '../../src/db/mongo'

const collection: Collection = mongo.getCollection();
let lastCreatedId: string = '';
const mock = {
  brand: 'Toyota',
  model: 'Camry',
  year: 2022,
  price: 666,
};

describe('AutoModelTest', () => {
  beforeAll(async () => {
    await collection.deleteMany({});
  });

  afterAll(async () => {
    await mongo.disconnect();
  });

  it('should be add the car', async () => {
    const car = new Car(mock);
    const createdId = await car.save();

    const getCar = await collection.findOne({ _id: new ObjectId(createdId) });

    expect(getCar).toEqual(expect.objectContaining(mock));
    expect(typeof createdId).toBe('string');

    lastCreatedId = createdId;
  });

  it('should be get the car', async () => {
    // const car = new Car();
    const getCar = await Car.get(lastCreatedId);

    expect(getCar).toEqual(expect.objectContaining(mock));
  });
});
