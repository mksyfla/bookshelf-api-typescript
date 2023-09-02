import { PostBookUseCases } from "./PostBookUseCases";
import { GetBooksUseCase } from "./GetBooksUseCase";
import { GetBookByIdUseCase } from "./GetBookByIdUseCase";
import { PutBookByIdUseCase } from "./PutBookByIdUseCase";
import { DeleteBookByIdUseCase } from "./DeleteBookByIdUseCase";

export class BookUseCase {
  postBookUseCases: PostBookUseCases;
  getBooksUseCase: GetBooksUseCase;
  getBookByIdUseCase: GetBookByIdUseCase;
  putBookByIdUseCase: PutBookByIdUseCase;
  deleteBookByIdUseCase: DeleteBookByIdUseCase;

  constructor(
    postBookUseCases: PostBookUseCases,
    getBooksUseCase: GetBooksUseCase,
    getBookByIdUseCase: GetBookByIdUseCase,
    putBookByIdUseCase: PutBookByIdUseCase,
    deleteBookByIdUseCase: DeleteBookByIdUseCase
  ) {
    this.postBookUseCases = postBookUseCases;
    this.getBooksUseCase = getBooksUseCase
    this.getBookByIdUseCase = getBookByIdUseCase;
    this.putBookByIdUseCase = putBookByIdUseCase;
    this.deleteBookByIdUseCase = deleteBookByIdUseCase;
  }
}