import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice';
import { Button } from '@chakra-ui/react';

const UserMenu = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(state => state.auth.email);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <p>Welcome, {userEmail}!</p>
      <Button colorScheme="green" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default UserMenu;
