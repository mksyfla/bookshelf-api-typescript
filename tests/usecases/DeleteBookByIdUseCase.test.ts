import { BookRepositories } from "../../src/repostories/BookRepositories";
import { DeleteBookByIdUseCase } from "../../src/usecases/DeleteBookByIdUseCase";

describe("DeleteBookByIdUseCase", () => {
  it("should orchestrating the delete book action correctly", () => {
    const payloadId: string = "123";

    const mockBookRepositories: BookRepositories = {
      postBook: jest.fn().mockImplementation(),
      getBooks: jest.fn().mockImplementation(),
      getBookById: jest.fn().mockImplementation(),
      putBookById: jest.fn().mockImplementation(),
      deleteBookById: jest.fn().mockImplementation()
    }

    const deleteBookByIdUseCase = new DeleteBookByIdUseCase(mockBookRepositories);

    deleteBookByIdUseCase.execute(payloadId);

    expect(mockBookRepositories.getBookById).toBeCalledWith(payloadId);
    expect(mockBookRepositories.deleteBookById).toBeCalledWith(payloadId);
  });
});