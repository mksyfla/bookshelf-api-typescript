import { BookRepositoryTestHelper } from "../helper/BookRepositoryTestHelper";
import { BookRepositoriesImpl } from "../../src/repostories/BookRepositoriesImpl";
import { Books } from "../../src/data/Books";
import { BookInterfaces } from "../../src/interfaces/BookInterfaces";
import { BookEntities } from "../../src/entities/BookEntities";
import { InputBookInterfaces } from "../../src/interfaces/InputBookInterfaces";
import { ResponseErrors } from "../../src/errors/ResponseErrors";

describe("BookRepositoriesImpl", () => {
  afterEach(() => {
    BookRepositoryTestHelper.cleanArray();
  });

  describe("postBook method", () => {
    it("should post a book", () => {
      const payload: InputBookInterfaces = {
        name: "name",
        year: 2010,
        author: "author",
        summary: "summary",
        publisher: "publisher",
        pageCount: 10,
        readPage: 1,
        reading: true,
      };

      const expectedPayload: BookInterfaces = {
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
        insertedAt: "",
        updatedAt: "",
      }

      const bookEntities: BookEntities = new BookEntities(payload);
      const bookRepositories = new BookRepositoriesImpl(() => '123');

      const bookId = bookRepositories.postBook(bookEntities);

      const books = BookRepositoryTestHelper.getBookById(bookId);
      expect(books.id).toEqual(expectedPayload.id);
      expect(books.name).toEqual(expectedPayload.name);
      expect(books.year).toEqual(expectedPayload.year);
      expect(books.author).toEqual(expectedPayload.author);
      expect(books.summary).toEqual(expectedPayload.summary);
      expect(books.publisher).toEqual(expectedPayload.publisher);
      expect(books.pageCount).toEqual(expectedPayload.pageCount);
      expect(books.readPage).toEqual(expectedPayload.readPage);
      expect(books.finished).toEqual(expectedPayload.finished);
      expect(books.reading).toEqual(expectedPayload.reading);
    });
  });

  describe("getBooks method", () => {
    it("should get book by id", () => {
      BookRepositoryTestHelper.postBook();
      
      const payload: BookInterfaces = {
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
      };

      const bookRepositories = new BookRepositoriesImpl(() => '');

      const books = bookRepositories.getBooks();

      expect(books[0].id).toEqual(payload.id);
      expect(books[0].name).toEqual(payload.name);
      expect(books[0].year).toEqual(payload.year);
      expect(books[0].author).toEqual(payload.author);
      expect(books[0].summary).toEqual(payload.summary);
      expect(books[0].publisher).toEqual(payload.publisher);
      expect(books[0].pageCount).toEqual(payload.pageCount);
      expect(books[0].readPage).toEqual(payload.readPage);
      expect(books[0].finished).toEqual(payload.finished);
      expect(books[0].insertedAt).toEqual(payload.insertedAt);
      expect(books[0].updatedAt).toEqual(payload.updatedAt);
    });
  });

  describe("getBookById method", () => {
    it("should get book by id", () => {
      const bookId = BookRepositoryTestHelper.postBook();
    
      const payload: BookInterfaces = {
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
      };
  
      const bookRepositories = new BookRepositoriesImpl(() => '');
  
      const books = bookRepositories.getBookById(bookId);
  
      expect(books.id).toEqual(payload.id);
      expect(books.name).toEqual(payload.name);
      expect(books.year).toEqual(payload.year);
      expect(books.author).toEqual(payload.author);
      expect(books.summary).toEqual(payload.summary);
      expect(books.publisher).toEqual(payload.publisher);
      expect(books.pageCount).toEqual(payload.pageCount);
      expect(books.readPage).toEqual(payload.readPage);
      expect(books.finished).toEqual(payload.finished);
      expect(books.insertedAt).toEqual(payload.insertedAt);
      expect(books.updatedAt).toEqual(payload.updatedAt);  
    });

    it("should throw error when the id not found", () => {
      const bookRepositories = new BookRepositoriesImpl(() => '');
      try {
        bookRepositories.getBookById('123')
      } catch (error) {
        expect(error.statusCode).toBe(404);
        expect(error.status).toBe("fail");
        expect(error.message).toBe("buku_tidak_ditemukan");
      }
    });
  });

  describe("putBookById method", () => {
    it("should put book by id", () => {
      const bookId = BookRepositoryTestHelper.postBook();
      const payload: InputBookInterfaces = {
        name: "name_updated",
        year: 2010,
        author: "author_updated",
        summary: "summary_updated",
        publisher: "publisher_updated",
        pageCount: 10,
        readPage: 10,
        reading: true,
      };

      const expectedPayload: BookInterfaces = {
        id: "123",
        name: "name_updated",
        year: 2010,
        author: "author_updated",
        summary: "summary_updated",
        publisher: "publisher_updated",
        pageCount: 10,
        readPage: 10,
        finished: true,
        reading: true,
        insertedAt: "date",
        updatedAt: "date",
      }

      const bookEntities: BookEntities = new BookEntities(payload);
      const bookRepositories = new BookRepositoriesImpl(() => '');

      bookRepositories.putBookById(bookId, bookEntities);

      const books = BookRepositoryTestHelper.getBookById(bookId);
      expect(books.id).toEqual(expectedPayload.id);
      expect(books.name).toEqual(expectedPayload.name);
      expect(books.year).toEqual(expectedPayload.year);
      expect(books.author).toEqual(expectedPayload.author);
      expect(books.summary).toEqual(expectedPayload.summary);
      expect(books.publisher).toEqual(expectedPayload.publisher);
      expect(books.pageCount).toEqual(expectedPayload.pageCount);
      expect(books.readPage).toEqual(expectedPayload.readPage);
      expect(books.finished).toEqual(expectedPayload.finished);
      expect(books.reading).toEqual(expectedPayload.reading);
    });
  });

  describe("deleteBookById method", () => {
    it("should delete book by id", () => {
      const bookId = BookRepositoryTestHelper.postBook();

      const bookRepositories = new BookRepositoriesImpl(() => '');
      bookRepositories.deleteBookById(bookId);

      expect(Books).toEqual([]);
    });
  });
});
