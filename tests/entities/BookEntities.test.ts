import { InputBookInterfaces } from "../../src/interfaces/InputBookInterfaces";
import { BookEntities } from "../../src/entities/BookEntities";

describe("BookEntities", () => {
  it("should throw error when the payload name doesnt exist", () => {
    const payload = {
      year: 2010,
      author: "John Doe",
      summary: "Lorem ipsum dolor sit amet",
      publisher: "Dicoding Indonesia",
      pageCount: 100,
      readPage: 25,
      reading: true
    } as InputBookInterfaces;

    expect(() => new BookEntities(payload)).toThrowError("doesnt_have_any_name");
  });

  it("should throw error when the readpage is more than page count", () => {
    const payload: InputBookInterfaces = {
      name: "Buku A",
      year: 2010,
      author: "John Doe",
      summary: "Lorem ipsum dolor sit amet",
      publisher: "Dicoding Indonesia",
      pageCount: 35,
      readPage: 100,
      reading: true
    };

    expect(() => new BookEntities(payload)).toThrowError("read_page_is_more_than_the_page_count");
  });

  it("should create BookEntites when the payload is correct", () => {
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

    const bookEntities = new BookEntities(payload);

    expect(bookEntities).toBeInstanceOf(BookEntities);
    expect(bookEntities.name).toStrictEqual(payload.name);
    expect(bookEntities.year).toStrictEqual(payload.year);
    expect(bookEntities.author).toStrictEqual(payload.author);
    expect(bookEntities.summary).toStrictEqual(payload.summary);
    expect(bookEntities.publisher).toStrictEqual(payload.publisher);
    expect(bookEntities.pageCount).toStrictEqual(payload.pageCount);
    expect(bookEntities.readPage).toStrictEqual(payload.readPage);
    expect(bookEntities.reading).toStrictEqual(payload.reading);
  })
});