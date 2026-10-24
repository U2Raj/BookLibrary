import type { BookModel } from "../../../models/BookModel";

export const CheckoutBox:React.FC<{book:BookModel}> = (props) => {


  const copies = props.book.copies ?? 0 ;
  const copiesAvailable = props.book.copiesAvailable ?? 0;
  const isAvailable = copiesAvailable > 0;

  return (
    <div className="card d-flex mt-5 mb-5 col-12 col-lg-3">
      <div className="card-body container">
        <div className="mt-3">
          <p>
            <b>{(copies - copiesAvailable)}/{copies} </b>
            books checked out
          </p>
          <hr />
          {isAvailable ? (<h4 className="text-success">Available</h4>)
          :(<h4 className="text-danger">Unvailable</h4>)}
          <div className="row">
            <p className="col-6 lead">
              <b>{copies}</b> copies
            </p>
            <p className="col-6 lead">
              <b>{copiesAvailable}</b> available
            </p>
          </div>
        </div>
        <a href="#" className="btn btn-success btn-lg">
          Sign in
        </a>
        <hr />
        <p className="mt-3">
          This number can change until placing order has been complete.
        </p>
        <p>Sign in to be able to leave a review.</p>
      </div>
    </div>
  );
};
