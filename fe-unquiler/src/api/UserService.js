import axios from 'axios';

const baseUrl = 'http://localhost:8080/user';

export const UserService = {
  alquilar: async (userId, canchaId, body) => {
    const response = await axios.put(
      `${baseUrl}/${userId}/alquilar/${canchaId}`,
      body
    );
    return response.data;
  },
  reservas: async (userId) => {
    const response = await axios.get(
        `${baseUrl}/${userId}/reservas`
    );
    return response.data;
  },
};
