import { Request, Response } from 'express';
import Ajv from 'ajv';
import Car, { CarType } from '../models/car';
import logger from '../utils/logger';
import schemaCreate from './create.controller.schema.json';

const ajv = new Ajv();
const validateCreate = ajv.compile(schemaCreate);

export default class AutoController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      if (!validateCreate(req.body)) {
        logger.error(validateCreate.errors);
        throw new Error('Request body validation failed');
      }

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
