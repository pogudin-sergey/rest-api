import { Router } from 'express';

class WelcomeRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get('/', (req, res) => {
      res.redirect('/doc');
    });
  }
}

export default new WelcomeRoutes().router;
