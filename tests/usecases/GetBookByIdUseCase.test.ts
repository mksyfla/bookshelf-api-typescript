import { BookInterfaces } from "../../src/interfaces/BookInterfaces";
import { BookRepositories } from "../../src/repostories/BookRepositories";
import { GetBookByIdUseCase } from "../../src/usecases/GetBookByIdUseCase";

describe("GetBookByIdUseCase", () => {
  it("should orchestrating the get book by id action correctly", () => {
    const expectedPayload: BookInterfaces = {
      id: "123",
      name: "name",
      year: 2010,
      author: "author",
      summary: "summary",
      publisher: "publisher",
      pageCount: 10,
      readPage: 2,
      finished: false,
      reading: true,
      insertedAt: "date",
      updatedAt: "date"
    };

    const mockBookRepositories: BookRepositories = {
      postBook: jest.fn().mockImplementation(),
      getBooks: jest.fn().mockImplementation(),
      getBookById: jest.fn().mockImplementation(() => ({
        id: "123",
        name: "name",
        year: 2010,
        author: "author",
        summary: "summary",
        publisher: "publisher",
        pageCount: 10,
        readPage: 2,
        finished: false,
        reading: true,
        insertedAt: "date",
        updatedAt: "date"
      })),
      putBookById: jest.fn().mockImplementation(),
      deleteBookById: jest.fn().mockImplementation()
    };

    const getBookByIdUseCase = new GetBookByIdUseCase(mockBookRepositories);

    const books = getBookByIdUseCase.execute(expectedPayload.id);

    expect(books).toStrictEqual(expectedPayload);
    expect(mockBookRepositories.getBookById).toBeCalledWith(expectedPayload.id);
  });
});