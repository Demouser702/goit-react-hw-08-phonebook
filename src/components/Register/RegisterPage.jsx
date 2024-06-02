import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/slices/authSlice';
import { selectUser } from '../../redux/slices/selector';
import Error from '../common/Error/Error';
import { Input, Button } from '@chakra-ui/react';

function RegisterPage() {
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const userInfo = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleRegisterSubmit = async e => {
    e.preventDefault();
    const payload = {
      email: emailRegister,
      password: passwordRegister,
    };

    await dispatch(registerUser(payload));
  };

  const errorMessage = userInfo?.error || '';

  return (
    <section>
      {userInfo && <code>{JSON.stringify(userInfo, null, 2)}</code>}
      {errorMessage && <Error message={errorMessage} />}

      <form onSubmit={handleRegisterSubmit}>
        <h2>Register</h2>
        <label>
          <span>Email</span>
          <Input type="text" onChange={e => setEmailRegister(e.target.value)} />
        </label>

        <label>
          <span>Password</span>
          <Input
            type="password"
            onChange={e => setPasswordRegister(e.target.value)}
          />
        </label>

        <Button type="submit" colorScheme="orange" variant="outline">
          Register
        </Button>
      </form>
    </section>
  );
}

export default RegisterPage;
