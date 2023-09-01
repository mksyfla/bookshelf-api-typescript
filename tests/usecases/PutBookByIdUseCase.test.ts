import { InputBookInterfaces } from "../../src/interfaces/InputBookInterfaces";
import { BookRepositories } from "../../src/repostories/BookRepositories";
import { PutBookByIdUseCase } from "../../src/usecases/PutBookByIdUseCase";

describe("PutBookByIdUseCase", () => {
  interface inputReturn {
    id: string;
  }

  it("should orchestrating the put book action correctly", () => {
    const payload: InputBookInterfaces = {
      name: "name_updated",
      year: 2010,
      author: "author_updated",
      summary: "summary_updated",
      publisher: "publisher_updated",
      pageCount: 100,
      readPage: 25,
      reading: true
    };

    const payloadId: inputReturn = {
      id: "123"
    }

    const mockBookRepositories: BookRepositories = {
      postBook: jest.fn().mockImplementation(),
      getBooks: jest.fn().mockImplementation(),
      getBookById: jest.fn().mockImplementation(),
      putBookById: jest.fn().mockImplementation(),
      deleteBookById: jest.fn().mockImplementation()
    };

    const putBookByIdUseCase = new PutBookByIdUseCase(mockBookRepositories);
    
    putBookByIdUseCase.execute(payloadId.id, payload);

    expect(mockBookRepositories.getBookById).toBeCalledWith(payloadId.id);
    expect(mockBookRepositories.putBookById).toBeCalledWith(payloadId.id, {
      name: "name_updated",
      year: 2010,
      author: "author_updated",
      summary: "summary_updated",
      publisher: "publisher_updated",
      pageCount: 100,
      finished: false,
      readPage: 25,
      reading: true
    });
  });
});