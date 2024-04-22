import express, { Application } from 'express';
import welcomeRoutes from './welcome.routes';
import autoRoutes from './api.routes';

export default function routes(app: Application) {
  app.use('/', welcomeRoutes);
  // app.use("/api/auth", autoRoutes);
  app.use('/api/auto', autoRoutes);
  app.use('/doc', express.static('doc'));
}
