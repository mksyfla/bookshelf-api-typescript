import { ResponseErrors } from "../errors/ResponseErrors";
import { InputBookInterfaces } from "../interfaces/InputBookInterfaces";

export class BookEntities {
  name: string;
  year: number;
  author: string;
  summary: string;
  publisher: string;
  pageCount: number;
  readPage: number;
  finished: boolean;
  reading: boolean;

  constructor(payload: InputBookInterfaces) {
    this.verifyPayload(payload);

    this.name = payload.name;
    this.year = payload.year;
    this.author = payload.author;
    this.summary = payload.summary;
    this.publisher = payload.publisher;
    this.pageCount = payload.pageCount;
    this.readPage = payload.readPage;
    this.finished = this.isFinished(payload.readPage, payload.pageCount);
    this.reading = payload.reading;
  }

  private verifyPayload(payload: InputBookInterfaces): void {
    if (!payload.name) {
      throw new ResponseErrors(400, "fail", "Mohon isi nama buku");
    }
    if (payload.readPage > payload.pageCount) {
      throw new ResponseErrors(400, "fail", "readPage tidak boleh lebih besar dari pageCount");
    }
  }

  private isFinished(readPage: number, pageCount: number): boolean {
    return readPage === pageCount;
  }
}