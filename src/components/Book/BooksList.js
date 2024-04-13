import React from "react";

const BooksList = ({
  isloading,
  books,
  isLoggedIn,
  dispatch,
  deleteBook,
  getBookId,
}) => {
  const bookList =
    books.length > 0
      ? books.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex  justify-content-between align-items-center"
          >
            <div>{item.title}</div>
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => getBookId(item.id)}
              >
                Read
              </button>
              <button
                type="button"
                className="btn btn-danger"
                disabled={!isLoggedIn}
                onClick={() =>
                  dispatch(deleteBook(item))
                    .unwrap()
                    .then((originalPromiseResult) => {
                      console.log(originalPromiseResult);
                    })
                    .catch((rejectedValueOrSerializedError) => {
                      console.log(rejectedValueOrSerializedError);
                    })
                }
              >
                Delete
              </button>
            </div>
          </li>
        ))
      : "there is no books avialable";

  return (
    <div>
      <h2>Books List</h2>
      {isloading ? "loading..." : <ul className="list-group">{bookList}</ul>}
    </div>
  );
};

export default BooksList;
