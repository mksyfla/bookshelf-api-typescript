import { BookInterfaces } from "../interfaces/BookInterfaces";
import { GetBooksInterfaces } from "../interfaces/GetBooksInterfaces";
import { BookRepositories } from "../repostories/BookRepositories";


export class GetBooksUseCase {
  private bookRepositories: BookRepositories;

  constructor(bookRepositories: BookRepositories) {
    this.bookRepositories = bookRepositories;
  }

  execute(): Array<GetBooksInterfaces> {
    const books: Array<BookInterfaces> = this.bookRepositories.getBooks();

    const map: Array<GetBooksInterfaces> = books.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));

    return map;
  }
}