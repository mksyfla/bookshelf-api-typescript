import { Books } from "../data/Books";
import { BookEntities } from "../entities/BookEntities";
import { ResponseErrors } from "../errors/ResponseErrors";
import { BookInterfaces } from "../interfaces/BookInterfaces";
import { IdGeneratorInterfaces } from "../interfaces/IdGeneratorInterfaces";
import { BookRepositories } from "./BookRepositories";

export class BookRepositoriesImpl implements BookRepositories {
  private idGenerator: IdGeneratorInterfaces

  constructor(idGenerator: IdGeneratorInterfaces) {
    this.idGenerator = idGenerator;
  }

  postBook(payload: BookEntities): string {
    const date = new Date().toISOString();
    const id: string = this.idGenerator();
    const insertedAt: string = date;
    const updatedAt: string = date;

    Books.push({
      id,
      ...payload,
      insertedAt,
      updatedAt
    });

    return id;
  }

  getBooks(): Array<BookInterfaces> {
    return Books;
  }

  getBookById(id: string): BookInterfaces {
    const bookFilter = Books.filter((book) => book.id === id)[0];
    if (!bookFilter) {
      throw new ResponseErrors(404, "fail", "buku_tidak_ditemukan");
    }
    return bookFilter;
  }

  putBookById(id: string, payload: BookEntities): void {
    const date = new Date().toISOString();
    const updatedAt: string = date;
    const index: number = Books.findIndex((book) => book.id === id);;

    if (index !== -1) {
      Books[index] = {
        ...Books[index],
        name: payload.name,
        year: payload.year,
        author: payload.author,
        summary: payload.summary,
        publisher: payload.publisher,
        pageCount: payload.pageCount,
        readPage: payload.readPage,
        finished: payload.finished,
        reading: payload.reading,
        updatedAt: updatedAt
      }
    }
  
  }

  deleteBookById(id: string): void {
    const index: number = Books.findIndex((book) => book.id === id);;
    if (index !== -1) {
      Books.splice(index, 1);
    }
  }
}