import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Login,
  Signup,
  Home,
  Rules,
  Quiz,
  Result,
  Profile,
  ErrorPage,
} from '../pages';
import AuthenticatedRoutes from './AuthenticatedRoutes';

const RoutesContainer = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />

      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />

      <Route path='/' element={<AuthenticatedRoutes />}>
        <Route path='/rules/:categoryId' element={<Rules />} />
        <Route path='/quiz/:quizId' element={<Quiz />} />
        <Route path='/result' element={<Result />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default RoutesContainer;
