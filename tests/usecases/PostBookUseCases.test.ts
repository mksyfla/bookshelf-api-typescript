import { InputBookInterfaces } from "../../src/interfaces/InputBookInterfaces";
import { BookRepositories } from "../../src/repostories/BookRepositories";
import { PostBookUseCases } from "../../src/usecases/PostBookUseCases";

describe("PostBookUseCases", () => {
  interface inputReturn {
    id: string;
  }

  it("should orchestrating the post book action correctly", () => {
    const payload: InputBookInterfaces = {
      name: "Buku A",
      year: 2010,
      author: "John Doe",
      summary: "Lorem ipsum dolor sit amet",
      publisher: "Dicoding Indonesia",
      pageCount: 100,
      readPage: 25,
      reading: true
    };

    const returnPayload: inputReturn = {
      id: "123",
    };

    const mockBookRepositories: BookRepositories = {
      postBook: jest.fn().mockImplementation(() => ({
        id: '123',
      })),
      getBooks: jest.fn().mockImplementation(),
      getBookById: jest.fn().mockImplementation(),
      putBookById: jest.fn().mockImplementation(),
      deleteBookById: jest.fn().mockImplementation()
    };

    const postBookUseCases = new PostBookUseCases(mockBookRepositories);

    const action = postBookUseCases.execute(payload);
    
    expect(action).toStrictEqual(returnPayload);
    expect(mockBookRepositories.postBook).toBeCalledWith({
      name: "Buku A",
      year: 2010,
      author: "John Doe",
      summary: "Lorem ipsum dolor sit amet",
      publisher: "Dicoding Indonesia",
      pageCount: 100,
      finished: false,
      readPage: 25,
      reading: true
    });
  });
});