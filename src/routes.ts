import { Router } from "express";
import { deleteBookById, getBookById, getBooks, postBook, putBookById } from "./controller";

const router: Router = Router();

router.post("/books", postBook);
router.get("/books", getBooks);
router.get("/books/:bookId", getBookById);
router.put("/books/:bookId", putBookById);
router.delete("/books/:bookId", deleteBookById);

export default router;