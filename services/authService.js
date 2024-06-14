import axios from 'axios';

const login = async (email, password) => {
  const response = await axios.post('/api/auth/login', { email, password });
  return response.data;
};

const signup = async (email, password) => {
  const response = await axios.post('/api/auth/signup', { email, password });
  return response.data;
};

export default { login, signup };
