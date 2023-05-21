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
};
