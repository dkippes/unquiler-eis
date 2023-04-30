import axios from 'axios';

export const authService = {
  userRegister: async (email, password) => {
    const response = await axios.post('http://localhost:8080/user/register', {
      email,
      password,
    });

    return response.data;
  },
  clubRegister: async (email, nombreClub, direccion, password) => {
    const response = await axios.post('http://localhost:8080/club/register', {
      email,
      nombreClub,
      direccion,
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
