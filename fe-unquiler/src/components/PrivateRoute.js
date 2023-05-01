import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, canEnter, redirectTo }) => {
  if (!canEnter) return <Navigate to={redirectTo} />;
  return children;
};

export default PrivateRoute;
