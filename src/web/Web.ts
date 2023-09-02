import express, { Express } from "express";
import { BookRoutes } from "../routes/BookRoutes";

export class Web {
  private app: Express;
  private routes: BookRoutes;

  constructor(routes: BookRoutes) {
    this.app = express();
    this.routes = routes;
    this.routes.routes();
  }

  start() {
    this.app.use(express.json());
    this.app.use(this.routes.getRouter());

    this.app.listen({port: 9000}, () => {
      console.log(`running on port 9000`);
    });
  }
}