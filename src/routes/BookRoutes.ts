import { Request, Response, Router } from "express";
import { BookControllers } from "../controllers/BookControllers";

export class BookRoutes {
  private bookControllers: BookControllers;
  private router: Router;

  constructor(bookControllers: BookControllers) {
    this.bookControllers = bookControllers;
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post("/books", (req: Request, res: Response) => this.bookControllers.postBookController(req, res));
    this.router.get("/books", (req: Request, res: Response) => this.bookControllers.getBooksController(req, res));
    this.router.get("/books/:id", (req: Request, res: Response) => this.bookControllers.getBookByIdController(req, res));
    this.router.put("/books/:id", (req: Request, res: Response) => this.bookControllers.putBookByIdController(req, res));
    this.router.delete("/books/:id", (req: Request, res: Response) => this.bookControllers.deleteBookByIdController(req, res));
  }

  getRouter() {
    return this.router;
  }
}


// import { Router } from "express";

// import { deleteBookByIdController, getBookByIdController, getBooksController, postBookController, putBookByIdController } from "../controllers/BookControllers";

// export const router: Router = Router();

// router.post("/books", bookControllers.);
// router.get("/books", getBooksController);
// router.get("/books/:id", getBookByIdController);
// router.put("/books/:id", putBookByIdController);
// router.delete("/books/:id", deleteBookByIdController);