import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../../redux/slices/selector';

const ProtectedRoute = ({ children }) => {
  const auth = useSelector(selectIsAuthenticated);
  return auth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
