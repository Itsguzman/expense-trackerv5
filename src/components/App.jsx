// import { SharedLayout } from '../shared/SharedLayout';
import { HomePage } from 'pages/HomePage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import { RestrictedRoute } from './RestrictedRoute/RestrictedRoute';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { ContactsPage } from '../pages/ContactsPage';

export const App = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<SharedLayout />}> */}
        {/* <Route index element={<LoginPage />} /> */}
        <Route index element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/contacts" component={RegisterPage} />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={LoginPage} />
          }
        />
        {/* </Route> */}

        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={ContactsPage} />
          }
        />
      </Routes>
    </>
  );
};
