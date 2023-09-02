import { BookInterfaces } from "../interfaces/BookInterfaces";
import { GetBooksInterfaces } from "../interfaces/GetBooksInterfaces";
import { InputBookInterfaces } from "../interfaces/InputBookInterfaces";
import { BookUseCase } from "../usecases/BookUseCase";

import { Request, Response } from "express";

// const bookRepositories = new BookRepositoriesImpl(() => {
//   return String(Math.floor(Math.random()* 10000000000));
// });
// const bookUseCase = new BookUseCase(bookRepositories);
// export function postBookController(req: Request, res: Response): void {
//   const payload: InputBookInterfaces = req.body;
//   const book: string = bookUseCase.postBookUseCases.execute(payload);
//   res
//     .status(201)
//     .send({
//       status: "success",
//       message: "Buku berhasil ditambahkan",
//       data: {
//         bookId: book
//       }
//     });
// }

// export function getBooksController(req: Request, res: Response): void {
//   const books: Array<GetBooksInterfaces> = bookUseCase.getBooksUseCase.execute();
//   res
//     .status(200)
//     .send({
//       status: "success",
//       data: {
//         books: books
//       }
//     });
// }

// export function getBookByIdController(req: Request, res: Response): void {
//   const id: string = req.params.id;
//   const book: BookInterfaces = bookUseCase.getBookByIdUseCase.execute(id);
//   res
//     .status(200)
//     .send({
//       status: "success",
//       data: {
//         book: book
//       }
//     });
// }

// export function putBookByIdController(req: Request, res: Response): void {
//   const id: string = req.params.id;
//   const payload: InputBookInterfaces = req.body;
//   bookUseCase.putBookByIdUseCase.execute(id, payload);
//   res
//     .status(200)
//     .send({
//       status: "success",
//       message: "Buku berhasil diperbarui"
//     });
// }

// export function deleteBookByIdController(req: Request, res: Response): void {
//   const id: string = req.params.id;
//   bookUseCase.deleteBookByIdUseCase.execute(id);
//   res
//     .status(200)
//     .send({
//       status: "success",
//       message: "Buku berhasil dihapus"
//     });
// }


export class BookControllers {
  private bookUseCase: BookUseCase;

  constructor(bookUseCase: BookUseCase) {
    this.bookUseCase = bookUseCase;
  }

  postBookController(req: Request, res: Response): void {
    const payload: InputBookInterfaces = req.body;
    const book: string = this.bookUseCase.postBookUseCases.execute(payload);
    res
      .status(201)
      .send({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: book
        }
      });
  }

  getBooksController(req: Request, res: Response): void {
    const books: Array<GetBooksInterfaces> = this.bookUseCase.getBooksUseCase.execute();
    res
      .status(200)
      .send({
        status: "success",
        data: {
          books: books
        }
      });
  }

  getBookByIdController(req: Request, res: Response): void {
    const id: string = req.params.id;
    const book: BookInterfaces = this.bookUseCase.getBookByIdUseCase.execute(id);
    res
      .status(200)
      .send({
        status: "success",
        data: {
          book: book
        }
      });
  }

  putBookByIdController(req: Request, res: Response): void {
    const id: string = req.params.id;
    const payload: InputBookInterfaces = req.body;
    this.bookUseCase.putBookByIdUseCase.execute(id, payload);
    res
      .status(200)
      .send({
        status: "success",
        message: "Buku berhasil diperbarui"
      });
  }

  deleteBookByIdController(req: Request, res: Response): void {
    const id: string = req.params.id;
    this.bookUseCase.deleteBookByIdUseCase.execute(id);
    res
      .status(200)
      .send({
        status: "success",
        message: "Buku berhasil dihapus"
      });
  }
}