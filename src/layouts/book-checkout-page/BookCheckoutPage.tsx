import { useEffect, useState } from "react";
import { bookService } from "../../services/bookService";
import { useParams } from "react-router-dom";
import type { BookModel } from "../../models/BookModel";
import { SpinnerLoading } from "../../components/SpinnerLoading";
import { CheckoutBox } from "./components/CheckoutBox";
import { LatestReviews } from "./components/LatestReviews";
import type { ReviewModel } from "../../models/ReviewModel";

export const BookCheckoutPage = () => {
  const { id } = useParams<{ id: string }>();
  const [reviews, setReviews] = useState<ReviewModel[]>([]);


  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookById = async () => {
      if (!id) {
        setHttpError("Book ID is missing from the URL");
        setIsLoading(false);
        return;
      }
      try {
         const [bookData, reviewsData] = await Promise.all([
          bookService.getBookById(id),
          bookService.getBookReviewsById(id)
         ])
         setBook(bookData);
         setReviews(reviewsData.content);
         setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching books:", error);
        setHttpError(
          error instanceof Error ? error.message : "An error has occured",
        );
      }
    };

    fetchBookById();
  }, [id]);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return <div>{httpError}</div>;
  }
  
  if(!book){
    return <p>Book Not Found</p>
  }

  return (
    <>
      {/* Desktop View */}
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            <img
              src={book.img}
              width="226"
              height="349"
              alt="Book"
            />
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{book.title}</h2>
              <h5 className="text-primary">{book.author}</h5>
              <p className="lead">{book.description}</p>
            </div>
          </div>
          <CheckoutBox book={book}/>
        </div>
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} />
      </div>
      {/* Mobile View */}
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-center">
          <img
            src={book.img}
            width="226"
            height="349"
            alt="Book"
          />
        </div>
        <div className="mt-4">
          <div className="ml-2">
              <h2>{book.title}</h2>
              <h5 className="text-primary">{book.author}</h5>
              <p className="lead">{book.description}</p>
          </div>
        </div>
        <CheckoutBox book={book}/>
        <hr />
         <LatestReviews reviews={reviews} bookId={book?.id} />
      </div>
    </>
  );
};
