export interface BookInterface {
  id: string,
  name: string,
  year: number,
  author: string,
  summary: string,
  publisher: string,
  pageCount: number,
  readPage: number,
  finished: boolean,
  reading: boolean,
  insertedAt: string,
  updatedAt: string
}

export interface InputBookInterface {
  name: string,
  year: number,
  author: string,
  summary: string,
  publisher: string,
  pageCount: number,
  readPage: number,
  reading: boolean
}