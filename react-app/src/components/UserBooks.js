import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooksThunk } from "../store/booksAlex";
import CreateBookModal from "./CreateBookModal";
import EditBookModal from "./EditBookModal";
import DeleteBookModal from "./DeleteBookModal";
import "./CSS/UserBooks.css";

const UserBooks = () => {
  console.log("INSIDE USER BOOKS COMPONENT");

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.session?.user);
  const booksList = useSelector((state) => Object.values(state?.books));

  useEffect(() => {
    console.log("GET ALL BOOKS/USERBOOKS USE EFFECT");
    dispatch(getAllBooksThunk());
  }, [dispatch]);

  if (currentUser == null) {
    console.log("currentUser == null conditional");
    return null;
  }

  const userBooks = booksList.filter(
    (book) => book.user_id === currentUser["id"]
  );

  return (
    <>
      {currentUser && userBooks && (
        <div className="my-books-page-outer">
          <div className="my-books-page-container">
            <div className="my-books-page-header-container">
              <div className="my-books-page-title">My Books</div>
              <div className="my-books-page-create-button-container">
                <CreateBookModal />
              </div>
            </div>
            <div className="my-books-page-separator"></div>
            <div className="my-books-page-books-item-container">
              {userBooks?.map((userBook, index) => (
                <div className="my-books-page-book-item" key={index}>
                  <NavLink to={`/books/${userBook.id}`}>
                    <img
                      className="my-books-page-book-cover"
                      src={userBook.image_url}
                      alt="bookcover"
                      style={{ height: "200px" }}
                    />
                    {/* <div className="my-books-page-info-popup-container">
                      <div className="my-books-page-book-popup">
                        {userBook.title}
                        {userBook.author}
                      </div>
                    </div> */}
                  </NavLink>
                  <div className="my-books-page-buttons-container">
                    <div className="my-books-page-edit-button-container">
                        <EditBookModal userBook={userBook} />
                    </div>
                    <div className="my-books-page-delete-button-container">
                        <DeleteBookModal userBook={userBook} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      )}
       <div className="footerMainDiv">
                <div className='footerContainerDiv'>
                    <div className='footerColumn'>
                        <h2 className='footerColumnTitle'>INSPIRED BY</h2>
                        <a href="https://www.goodreads.com/">goodreads</a>
                    </div>
                    <div className='footerColumn'>
                        <h2 className='footerColumnTitle'>WORK WITH US</h2>
                        <a href="https://github.com/ARGON90">Alex Gonglach</a>
                        <a href="https://github.com/benwaldee">Ben Waldee</a>
                        <a href="https://github.com/julieyj">Julie Jung</a>
                        <a href="https://github.com/jvstinejvng">Justine Jang</a>
                    </div>
                    <div className='footerColumn'>
                        <h2 className='footerColumnTitle'>SOURCE CODE</h2>
                        <a href="https://github.com/ARGON90/BadReads">Github Repository</a>
                    </div>
                </div>
            </div>
    </>
  );
};

export default UserBooks;
