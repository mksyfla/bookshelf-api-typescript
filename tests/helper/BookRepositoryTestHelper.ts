import { BookInterfaces } from "../../src/interfaces/BookInterfaces";
import { Books } from "../../src/data/Books";

interface BookRepositoryTestHelperInterface {
  postBook(): string,
  getBookById(id: string): BookInterfaces,
  cleanArray(): void,
}

export const BookRepositoryTestHelper: BookRepositoryTestHelperInterface = {
  postBook(payload: BookInterfaces = {
    id: "123",
    name: "name",
    year: 2010,
    author: "author",
    summary: "summary",
    publisher: "publisher",
    pageCount: 10,
    readPage: 1,
    finished: false,
    reading: true,
    insertedAt: "date",
    updatedAt: "date",
  }): string {
    Books.push(payload);

    return payload.id;
  },

  getBookById(id): BookInterfaces {
    return Books.filter((book) => book.id === id)[0];
  },

  cleanArray(): void {
    Books.length = 0;
  },
};
