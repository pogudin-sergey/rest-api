import { Request, Response } from 'express';
import Ajv, { ValidateFunction } from 'ajv';
import schemaCreate from './create.controller.schema.json';
import logger from '../../utils/logger';

const ajv = new Ajv();

type Scheme = {
  [key: string]: ValidateFunction
};

const scheme: Scheme = {
  create: ajv.compile(schemaCreate),
};

function isValid(validFunc: ValidateFunction, req: Request, res: Response): boolean {
  if (!validFunc(req.body)) {
    logger.error(validFunc.errors);
    res.status(400).json({
      errors: validFunc.errors,
    });

    return false;
  }

  return true;
}

export default {
  isValid,
  scheme,
};
