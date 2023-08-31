import { BookEntities } from "../entities/BookEntities";
import { InputBookInterfaces } from "../interfaces/InputBookInterfaces";
import { BookRepositories } from "../repostories/BookRepositories";

export class PutBookByIdUseCase {
  private bookRepositories: BookRepositories;

  constructor(bookRepositories: BookRepositories) {
    this.bookRepositories = bookRepositories;
  }

  execute(id: string, payload: InputBookInterfaces): void {
    this.bookRepositories.getBookById(id);
    const bookEntities = new BookEntities(payload);
    this.bookRepositories.putBookById(id, bookEntities);
  }
}