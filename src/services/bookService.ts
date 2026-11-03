import type { BookModel } from "../models/BookModel";
import type { ReviewModel } from "../models/ReviewModel";
import { fetchWithAuth } from "./fetchWithAuth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface BookResponse {
  content: BookModel[];
  page: {
    totalElements: number;
    totalPages: number;
  };
}

interface ReviewResponse {
  content: ReviewModel[];
  page: {
    totalElements: number;
    totalPages: number;
  };
}

interface ReviewRequest {
  bookId:number,
  rating:number,
  reviewDescription?:string
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

  //getBook reviews by id
    async getBookReviewsById(bookId : string, pageNo:number=0, pageSize:number=3): Promise<ReviewResponse> {
    const response = await fetch(
      `${BASE_URL}/reviews/book/${bookId}?pageNo=${pageNo}&${pageSize}`,
    );

    if (!response.ok) {
      throw new Error("Failed to load the data");
    }
    return await response.json();
  },

  async createReview(reviewRequest:ReviewRequest) : Promise<ReviewModel> {
       const response = await fetchWithAuth(`${BASE_URL}/reviews`,{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(reviewRequest)
       });

       if(!response.ok){
        throw new Error('Failed to craate review');
       }

       return response.json();
  },

  async getBookAverageRating(bookId:string) : Promise<number>{
       const response = await fetch(`${BASE_URL}/reviews/book/${bookId}/average-rating`);
       if(!response.ok){
        throw new Error("Failed to fetch average rating");
       }
       return response.json();
  }
};
