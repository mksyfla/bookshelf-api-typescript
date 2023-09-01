import { BookRepositories } from "../repostories/BookRepositories";

export class DeleteBookByIdUseCase {
  private bookRepositories: BookRepositories;

  constructor(bookRepositories: BookRepositories) {
    this.bookRepositories = bookRepositories;
  }

  execute(id: string) {
    this.bookRepositories.getBookById(id);
    this.bookRepositories.deleteBookById(id);
  }
}