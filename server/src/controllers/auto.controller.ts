import { Request, Response } from 'express';
import Car, { CarType } from '../models/car';
import validator from './validators';

export default class AutoController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      if (!validator.isValid(validator.scheme.create, req, res)) return;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const car = new Car(req.body as CarType);
      const insertId = await car.save();

      res.status(201).json({
        message: 'create OK',
        insertId,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Internal Server Error!',
      });
    }
  }
}
