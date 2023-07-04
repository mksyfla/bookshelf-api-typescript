import { Router, Request, Response } from "express";
import { BookInterface } from "./interfaces";
import { books } from "./books";
import { bookFilterFunction, bookIndexFunction, errorResponse } from "./helper";

const router: Router = Router();

router.post("/books", (req: Request, res: Response) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading
  } = req.body;

  if (!name) {
    return errorResponse(res, 400, "fail", "Gagal menambahkan buku. Mohon isi nama buku");
  }

  if (readPage > pageCount) {
    return errorResponse(res, 400, "fail", "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount");
  }

  const id: string = String(Math.floor(Math.random() * 10000000000));
  const insertedAt: string = new Date().toISOString();
  const updatedAt: string = insertedAt;
  const finished: boolean = pageCount === readPage;

  const newBook: BookInterface = {
    id: id,
    name: name,
    year: year,
    author: author,
    summary: summary,
    publisher: publisher,
    pageCount: pageCount,
    readPage: readPage,
    finished: finished,
    reading: reading,
    insertedAt: insertedAt,
    updatedAt: updatedAt
  }

  books.push(newBook);

  return res
    .status(201)
    .send({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id
      }
    });
});

router.get("/books", (req: Request, res: Response) => {
  return res
    .status(200)
    .send({
      status: "success",
      data: {
        books: books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        }))
      }
    });
});

router.get("/books/:bookId", (req: Request, res: Response) => {
  const bookId: string = req.params.bookId;

  const bookFilter: BookInterface = bookFilterFunction(bookId);

  if (!bookFilter) {
    return errorResponse(res, 404, "fail", "Buku tidak ditemukan");
  }

  return res
    .status(200)
    .send({
      status: "success",
      data: {
        book: bookFilter
      }
    })
});

router.put("/books/:bookId", (req: Request, res: Response) => {
  const bookId: string = req.params.bookId;

  const bookFilter: BookInterface = bookFilterFunction(bookId);

  if (!bookFilter) {
    return errorResponse(res, 404, "fail", "Gagal memperbarui buku. Id tidak ditemukan");
  }

  const {
    name, year, author, summary, publisher, pageCount, readPage, reading
  } = req.body;

  if (!name) {
    return errorResponse(res, 400, "fail", "Gagal memperbarui buku. Mohon isi nama buku");
  }

  if (readPage > pageCount) {
    return errorResponse(res, 400, "fail", "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount");
  }

  const updatedAt: string = new Date().toISOString();
  const finished: boolean = pageCount === readPage;
  const bookIndex: number = bookIndexFunction(bookId);
  
  if (bookIndex !== -1) {
    books[bookIndex] = {
      ...books[bookIndex],
      name: name,
      year: year,
      author: author,
      summary: summary,
      publisher: publisher,
      pageCount: pageCount,
      readPage: readPage,
      finished: finished,
      reading: reading,
      updatedAt: updatedAt
    }
  }

  return res
    .status(200)
    .send({
      status: "success",
      message: "Buku berhasil diperbarui"
    });
});

router.delete("/books/:bookId", (req: Request, res: Response) => {
  const bookId: string = req.params.bookId;

  const bookFilter: BookInterface = bookFilterFunction(bookId);

  if (!bookFilter) {
    return errorResponse(res, 404, "fail", "Buku gagal dihapus. Id tidak ditemukan");
  }

  const bookIndex: number = bookIndexFunction(bookId);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    return res
      .status(200)
      .send({
        status: "success",
        message: "Buku berhasil dihapus"
      });
  }
});

export default router;