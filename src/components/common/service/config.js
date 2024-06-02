import axios from 'axios';

function setAxiosDefaults() {
  const token = localStorage.getItem('token');

  axios.defaults.baseURL = 'http://localhost:3009/';
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default setAxiosDefaults;
