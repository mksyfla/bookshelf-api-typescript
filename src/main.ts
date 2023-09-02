// import express, { Express, Request, Response } from "express"
// // import bodyParser from "body-parser";

// // import { router } from "./routes/BookRoutes";
// import { ResponseErrors } from "./errors/ResponseErrors";

// const app: Express = express();

// app.use(express.json());

// app.use(router);

// app.use((err: Error, req: Request, res: Response) => {
//   if (err instanceof ResponseErrors) {
//     res
//       .status(err.statusCode)
//       .send({
//         status: "fail",
//         message: err.message
//       });
//   } else {
//     res
//     .status(500)
//     .send({
//       status: 'error',
//       message: 'terjadi kegagalan pada server kami'
//     });
//   }
// })

// app.listen({
//   port: 9000
// }, () => {
//   console.log(`running on port 9000`)
// });

import { Web } from "./web/Web";
import { BookRoutes } from "./routes/BookRoutes";
import { BookControllers } from "./controllers/BookControllers";
import { BookUseCase } from "./usecases/BookUseCase";
import { PostBookUseCases } from "./usecases/PostBookUseCases";
import { GetBooksUseCase } from "./usecases/GetBooksUseCase";
import { GetBookByIdUseCase } from "./usecases/GetBookByIdUseCase";
import { PutBookByIdUseCase } from "./usecases/PutBookByIdUseCase";
import { DeleteBookByIdUseCase } from "./usecases/DeleteBookByIdUseCase";
import { BookRepositoriesImpl } from "./repostories/BookRepositoriesImpl";

function idGenerator() {
  return String(Math.floor(Math.random()* 10000000000));
}

const bookRepositories = new BookRepositoriesImpl(idGenerator);

const postBookUseCase = new PostBookUseCases(bookRepositories);
const getBooksUseCase = new GetBooksUseCase(bookRepositories);
const getBookByIdUseCase = new GetBookByIdUseCase(bookRepositories);
const putBookByIdUseCase = new PutBookByIdUseCase(bookRepositories);
const deleteBookByIdUseCase = new DeleteBookByIdUseCase(bookRepositories);

const bookUseCase = new BookUseCase(
  postBookUseCase, getBooksUseCase, getBookByIdUseCase, putBookByIdUseCase, deleteBookByIdUseCase
);

const bookControllers = new BookControllers(bookUseCase);

const bookRoutes = new BookRoutes(bookControllers);

const web = new Web(bookRoutes);

web.start()