import express, { Express } from "express"
// import bodyParser from "body-parser";

import { router } from "./routes/BookRoutes";

const app: Express = express();

app.use(express.json());

app.use(router);

app.listen({
  port: 9000
});