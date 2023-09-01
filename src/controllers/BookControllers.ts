import { BookInterfaces } from "../interfaces/BookInterfaces";
import { GetBooksInterfaces } from "../interfaces/GetBooksInterfaces";
import { InputBookInterfaces } from "../interfaces/InputBookInterfaces";
import { BookRepositoriesImpl } from "../repostories/BookRepositoriesImpl";
import { DeleteBookByIdUseCase } from "../usecases/DeleteBookByIdUseCase";
import { GetBookByIdUseCase } from "../usecases/GetBookByIdUseCase";
import { GetBooksUseCase } from "../usecases/GetBooksUseCase";
import { PostBookUseCases } from "../usecases/PostBookUseCases";
import { PutBookByIdUseCase } from "../usecases/PutBookByIdUseCase";

import { Request, Response } from "express";

const bookRepositories = new BookRepositoriesImpl(() => {
  return String(Math.floor(Math.random()* 10000000000));
});

export function postBookController(req: Request, res: Response): void {
  const payload: InputBookInterfaces = req.body;
  const postBookUseCase = new PostBookUseCases(bookRepositories);
  const book: string = postBookUseCase.execute(payload);

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

export function getBooksController(req: Request, res: Response): void {
  const getBooksUseCase = new GetBooksUseCase(bookRepositories);
  const books: Array<GetBooksInterfaces> = getBooksUseCase.execute();

  res
    .status(200)
    .send({
      status: "success",
      data: {
        books: books
      }
    });
}

export function getBookByIdController(req: Request, res: Response): void {
  const id: string = req.params.id;
  const getBookByIdUseCase = new GetBookByIdUseCase(bookRepositories);
  const book: BookInterfaces = getBookByIdUseCase.execute(id);

  res
    .status(200)
    .send({
      status: "success",
      data: {
        book: book
      }
    });
}

export function putBookByIdController(req: Request, res: Response): void {
  const id: string = req.params.id;
  const payload: InputBookInterfaces = req.body;
  const putBookByIdUseCase = new PutBookByIdUseCase(bookRepositories); 
  putBookByIdUseCase.execute(id, payload);

  res
    .status(200)
    .send({
      status: "success",
      message: "Buku berhasil diperbarui"
    });
}

export function deleteBookByIdController(req: Request, res: Response): void {
  const id: string = req.params.id;
  const deleteBookByIdUseCase = new DeleteBookByIdUseCase(bookRepositories);
  deleteBookByIdUseCase.execute(id);

  res
    .status(200)
    .send({
      status: "success",
      message: "Buku berhasil dihapus"
    });
}


// export class BookControllers {
//   private postBookUseCase: PostBookUseCases;
//   private getBooksUseCase: GetBooksUseCase;
//   private getBookByIdUseCase: GetBookByIdUseCase;
//   private putBookByIdUseCase: PutBookByIdUseCase;
//   private deleteBookByIdUseCase: DeleteBookByIdUseCase;

//   constructor(
//     postBookUseCase: PostBookUseCases,
//     getBooksUseCase: GetBooksUseCase,
//     getBookByIdUseCase: GetBookByIdUseCase,
//     putBookByIdUseCase: PutBookByIdUseCase,
//     deleteBookByIdUseCase: DeleteBookByIdUseCase
//   ) {
//     this.postBookUseCase = postBookUseCase;
//     this.getBooksUseCase = getBooksUseCase;
//     this.getBookByIdUseCase = getBookByIdUseCase;
//     this.putBookByIdUseCase = putBookByIdUseCase;
//     this.deleteBookByIdUseCase = deleteBookByIdUseCase;
//   }

//   postBookController(req: Request, res: Response): void {
//     const payload: InputBookInterfaces = req.body;
//     const book: string = this.postBookUseCase.execute(payload);

//     res
//       .status(200)
//       .send({
//         status: "success",
//         message: "Buku berhasil ditambahkan",
//         data: {
//           bookId: book
//         }
//       });
//   }

//   getBooksController(req: Request, res: Response): void {
//     const book: Array<GetBooksInterfaces> = this.getBooksUseCase.execute();

//     res
//       .status(200)
//       .send({
//         status: "success",
//         data: book
//       });
//   }

//   getBookByIdController(req: Request, res: Response): void {
//     const id: string = req.params.id;
//     const book: BookInterfaces = this.getBookByIdUseCase.execute(id);

//     res
//       .status(200)
//       .send({
//         status: "success",
//         data: book
//       });
//   }

//   putBookByIdController(req: Request, res: Response): void {
//     const id: string = req.params.id;
//     const payload: InputBookInterfaces = req.body;
//     this.putBookByIdUseCase.execute(id, payload);

//     res
//       .status(200)
//       .send({
//         status: "success",
//         message: "Buku berhasil diperbarui"
//       });
//   }

//   deleteBookByIdController(req: Request, res: Response): void {
//     const id: string = req.params.id;
//     this.deleteBookByIdUseCase.execute(id);

//     res
//       .status(200)
//       .send({
//         status: "success",
//         message: "Buku berhasil dihapus"
//       });
//   }
// }