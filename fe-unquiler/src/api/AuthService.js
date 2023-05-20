import axios from 'axios';

const BASE_URL = 'http://localhost:8080/';

export const authService = {
  userRegister: async (email, password) => {
    const response = await axios.post(BASE_URL + 'user/register', {
      email,
      password,
    });

    return response.data;
  },
  clubRegister: async (email, nombreClub, direccion, password, urlImagen) => {
    const response = await axios.post(BASE_URL + 'club/register', {
      email,
      nombreClub,
      direccion,
      password,
      urlImagen
    });

    return response.data;
  },
  login: async (email, password, isClub = false) => {
    const endpoint = isClub ? 'club/login' : 'login';
    const response = await axios.post(BASE_URL + endpoint, {
      email,
      password,
    });

    return response.data;
  },
};
