/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */

import { Router } from 'express';
import AutoController from '../controllers/auto.controller';

class AutoRoutes {
  router = Router();

  controller = new AutoController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create an new auto
    this.router.post('/', this.controller.create);
  }
}

export default new AutoRoutes().router;
