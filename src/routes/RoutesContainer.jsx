import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Signup, Home } from '../pages';
import AuthenticatedRoutes from './AuthenticatedRoutes';

const RoutesContainer = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />

      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />

      <Route path='/' element={<AuthenticatedRoutes />}>
        {/* <Route path='/home' element={<Home />} />
        <Route path='/archive' element={<Archive />} />
        <Route path='/trash' element={<Trash />} /> */}
      </Route>
    </Routes>
  );
};

export default RoutesContainer;
