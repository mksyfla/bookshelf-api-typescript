import { books } from "./books";
import { BookInterface } from "./interfaces";
import { Response } from "express";

export function bookIndexFunction(bookId: string): number {
  return books.findIndex((book) => book.id === bookId);
}

export function bookFilterFunction(bookId: string): BookInterface {
  return books.filter((book) => book.id === bookId)[0];
}

export function errorResponse(res: Response, statusCode: number, status: string, message: string): Response {
  return res.status(statusCode)
    .send({
      status: status,
      message: message
    });
}
