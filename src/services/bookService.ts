import type { BookModel } from "../models/BookModel";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface BookResponse {
  content: BookModel[];
  page: {
    totalElements: number;
    totalPages: number;
  };
}

export const bookService = {
  //All the services regarding books
  async getBooks(pageNo: number, pageSize: number): Promise<BookResponse> {
    const response = await fetch(
      `${BASE_URL}/books?pageNo=${pageNo}&&pageSize=${pageSize}`,
    );

    if (!response.ok) {
      throw new Error("Failed to load the data");
    }
    return await response.json();
  },

  //Search API
  async searchByTitle(
    title: string,
    pageNo: number,
    pageSize: number,
  ): Promise<BookResponse> {
    const response = await fetch(
      `${BASE_URL}/books/search/title?title=${title}&pageNo=${pageNo}&&pageSize=${pageSize}`,
    );

    if (!response.ok) {
      throw new Error("Failed to load the data");
    }
    return await response.json();
  },

  //Search By Category
  async searchByCategory(
    category: string,
    pageNo: number,
    pageSize: number,
  ): Promise<BookResponse> {
    const response = await fetch(
      `${BASE_URL}/books/search/category?category=${category}&pageNo=${pageNo}&&pageSize=${pageSize}`,
    );

    if (!response.ok) {
      throw new Error("Failed to load the data");
    }
    return await response.json();
  },


  //getting individual book by id
  async getBookById(id: string) {
    const response = await fetch(`${BASE_URL}/books/${id}`);
    if (!response.ok) {
      throw new Error("Failed to load the data");
    }
    return await response.json();
  },
};
