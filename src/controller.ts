import { Request, Response } from "express";
import { BookInterface } from "./interfaces";
import { books } from "./books";
import { bookFilterFunction, bookIndexFunction, errorResponse } from "./helper";

export function postBook(req: Request, res: Response) {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading
  } = req.body;

  if (!name) {
    errorResponse(res, 400, "fail", "Gagal menambahkan buku. Mohon isi nama buku");
    return;
  }

  if (readPage > pageCount) {
    errorResponse(res, 400, "fail", "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount");
    return;
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

  res
    .status(201)
    .send({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id
      }
    });
  return;
}

export function getBooks(req: Request, res: Response): void {
  const nameQuery: string = req.query.name as string;
  const readingQuery: string = req.query.reading as string;
  const finishedQuery: string = req.query.finished as string;

  let datas: Array<BookInterface> = books;

  if (nameQuery) {
    datas = datas.filter((data: BookInterface) => data.name.toLowerCase().includes(nameQuery.toLowerCase()));
  }

  if (readingQuery) {
    datas = datas.filter((data: BookInterface) => data.reading === Boolean(Number(readingQuery)));
  }

  if (finishedQuery) {
    datas = datas.filter((data: BookInterface) => data.finished === Boolean(Number(finishedQuery)));
  }

  res
    .status(200)
    .send({
      status: "success",
      data: {
        books: datas.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        }))
      }
    });
  return;
}

export function getBookById(req: Request, res: Response): void {
  const bookId: string = req.params.bookId;

  const bookFilter: BookInterface = bookFilterFunction(bookId);

  if (!bookFilter) {
    errorResponse(res, 404, "fail", "Buku tidak ditemukan");
    return;
  }

  res
    .status(200)
    .send({
      status: "success",
      data: {
        book: bookFilter
      }
    });
  return;
}

export function putBookById(req: Request, res: Response): void {
  const bookId: string = req.params.bookId;

  const bookFilter: BookInterface = bookFilterFunction(bookId);

  if (!bookFilter) {
    errorResponse(res, 404, "fail", "Gagal memperbarui buku. Id tidak ditemukan");
    return;
  }

  const {
    name, year, author, summary, publisher, pageCount, readPage, reading
  } = req.body;

  if (!name) {
    errorResponse(res, 400, "fail", "Gagal memperbarui buku. Mohon isi nama buku");
    return;
  }

  if (readPage > pageCount) {
    errorResponse(res, 400, "fail", "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount");
    return;
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

  res
    .status(200)
    .send({
      status: "success",
      message: "Buku berhasil diperbarui"
    });
  return;
}

export function deleteBookById(req: Request, res: Response): void {
  const bookId: string = req.params.bookId;

  const bookFilter: BookInterface = bookFilterFunction(bookId);

  if (!bookFilter) {
    errorResponse(res, 404, "fail", "Buku gagal dihapus. Id tidak ditemukan");
    return;
  }

  const bookIndex: number = bookIndexFunction(bookId);

  if (bookIndex === -1) {
    books.splice(bookIndex, 1);
    res
      .status(200)
      .send({
        status: "success",
        message: "Buku berhasil dihapus"
      });
    return;
  }
}