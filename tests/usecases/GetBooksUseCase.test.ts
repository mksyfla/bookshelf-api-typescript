import { GetBooksInterfaces } from "../../src/interfaces/GetBooksInterfaces";
import { BookRepositories } from "../../src/repostories/BookRepositories";
import { GetBooksUseCase } from "../../src/usecases/GetBooksUseCase";

describe("GetBooksUseCase", () => {
  it("should orchestrating the get books action correctly", () => {
    const expectedPayload: Array<GetBooksInterfaces> = [
      {
        id: "123",
        name: "Buku",
        publisher: "publisher"
      },
      {
        id: "246",
        name: "Buku 2",
        publisher: "publisher"
      }
    ];

    const mockBookRepositories: BookRepositories = {
      postBook: jest.fn().mockImplementation(),
      getBooks: jest.fn().mockImplementation(() => [
        {
          id: "123",
          name: "Buku",
          year: 2010,
          author: "John Doe",
          summary: "Lorem ipsum dolor sit amet",
          publisher: "publisher",
          pageCount: 100,
          finished: false,
          readPage: 25,
          reading: true,
          insertedAt: "date",
          updatedAt: "date"
        },
        {
          id: "246",
          name: "Buku 2",
          year: 2010,
          author: "John Doe",
          summary: "Lorem ipsum dolor sit amet",
          publisher: "publisher",
          pageCount: 100,
          finished: false,
          readPage: 25,
          reading: true,
          insertedAt: "date",
          updatedAt: "date"
        }
      ]),
      getBookById: jest.fn().mockImplementation(),
      putBookById: jest.fn().mockImplementation(),
      deleteBookById: jest.fn().mockImplementation()
    };

    const getBooksUseCase = new GetBooksUseCase(mockBookRepositories);

    const books = getBooksUseCase.execute();

    expect(books).toStrictEqual(expectedPayload);
  });
});