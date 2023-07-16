import { BookEntities } from "../entities/BookEntities";
import { InputBookInterfaces } from "../interfaces/InputBookInterfaces";
import { BookRepositories } from "../repostories/BookRepositories";

export class PostBookUseCases {
  private bookRepositories: BookRepositories;

  constructor(bookRepositories: BookRepositories) {
    this.bookRepositories = bookRepositories;
  }

  execute(payload: InputBookInterfaces): string {
    const bookEntities = new BookEntities(payload);
    return this.bookRepositories.postBook(bookEntities);
  }
}