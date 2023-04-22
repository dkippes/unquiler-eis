import axios from 'axios';

export const authService = {
  register: async (email, password) => {
    const response = await axios.post('http://localhost:8080/register', {
      email,
      password,
    });

    return response.data;
  },
  login: async (email, password) => {
    const response = await axios.post('http://localhost:8080/login', {
      email,
      password,
    });

    return response.data;
  },
};
