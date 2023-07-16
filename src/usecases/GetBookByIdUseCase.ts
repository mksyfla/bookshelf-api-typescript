import { BookInterfaces } from "../interfaces/BookInterfaces";
import { BookRepositories } from "../repostories/BookRepositories";

export class GetBookByIdUseCase {
  private bookRepositories: BookRepositories;

  constructor(bookRepositories: BookRepositories) {
    this.bookRepositories = bookRepositories;
  }

  execute(id: string): BookInterfaces {
    return this.bookRepositories.getBookById(id);
  }
} 