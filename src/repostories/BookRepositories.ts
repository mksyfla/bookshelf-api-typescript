import { BookEntities } from "../entities/BookEntities";
import { BookInterfaces } from "../interfaces/BookInterfaces";

export abstract class BookRepositories {
  abstract postBook(payload: BookEntities): string;
  abstract getBooks(): Array<BookInterfaces>;
  abstract getBookById(id: string): BookInterfaces;
  abstract putBookById(id: string, payload: BookEntities): void;
  abstract deleteBookById(id: string): void;
}