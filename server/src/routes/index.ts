import express, { Application } from "express";
import welcomeRoutes from "./welcome.routes";
import apiRoutes from "./api.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/", welcomeRoutes);
    app.use("/api", apiRoutes);
    app.use('/doc', express.static('doc'));
  }
}
