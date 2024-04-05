import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import SplashPage from './components/SplashPage';

import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import BooksList from './components/BooksListAlex';
import User from './components/User';
import { authenticate } from './store/session';
import BookById from './components/BookByIdAlex';
import Bookshelves from './components/Bookshelves';
import UserBooks from './components/UserBooks';
import NotFound from './components/NotFound'



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {sessionUser && <NavBar />}
      <Routes>
        <Route path='/' element={<SplashPage />} exact={true}>
          {/* <SplashPage /> */}
        </Route>
        <Route
        exact
        path='/users'
        element={
            <ProtectedRoute>
                <UsersList />
            </ProtectedRoute>
        }
    />

        <Route path='/books' element={<BooksList />} exact={true} >
          {/* <BooksList /> */}
        </Route>
        <Route path='/books/:id' element={<BookById />} exact={true} >
          {/* <BookById /> */}
        </Route>
     

        <Route
        exact
        path='/users/:userId'
        element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
        }
    />
        <Route path='/bookshelves'  element={<Bookshelves />} exact={true}>
          {/* <Bookshelves /> */}
        </Route>
        <Route path='/my-books' element={<UserBooks />} exact={true}>
          {/* <UserBooks /> */}
        </Route>
        <Route  element={<NotFound />}>
          {/* <NotFound /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
