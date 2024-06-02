import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3009/';

async function login(payload) {
  try {
    const response = await axios.post('/login', payload);
    console.log('Login response:', response);
    return response;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

async function register(payload) {
  const response = await axios.post('/register', payload);
  return response;
}

async function logout() {
  localStorage.removeItem('token');
}

const authService = {
  login,
  logout,
  register,
};

export default authService;
