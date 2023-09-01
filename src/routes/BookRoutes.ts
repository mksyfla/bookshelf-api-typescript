import { Router } from "express";
import { deleteBookByIdController, getBookByIdController, getBooksController, postBookController, putBookByIdController } from "../controllers/BookControllers";

export const router: Router = Router();

router.post("/books", postBookController);
router.get("/books", getBooksController);
router.get("/books/:id", getBookByIdController);
router.put("/books/:id"), putBookByIdController;
router.delete("/books/:id", deleteBookByIdController);