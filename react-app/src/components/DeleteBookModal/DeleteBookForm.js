import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';import { getAllBooksThunk, deleteBook } from "../../store/booksAlex";

const DeleteBookForm = ({ setShowModal, userBook }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getAllBooksThunk());
  }, [dispatch]);

  const handleDelete = async (e) => {
    e.preventDefault();
    let deletedBook = await dispatch(deleteBook(userBook.id));

    if (deletedBook) {
      setShowModal(false);
      navigate("/my-books");
    }
  };

  return (
    <>
      <div className="delete-book-form">
        <div className="delete-book-form-title">Are you sure?</div>
        <div className="delete-book-modal-body">
          <button
            className="delete-book-form-delete-button"
            onClick={handleDelete}
          >
            Delete Book
          </button>
          <button
            className="delete-book-form-cancel-button"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteBookForm;
