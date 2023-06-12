import axios from 'axios';

const BASE_URL = 'http://localhost:8080/';

export const CanchaService = {
  getByClubName: async text => {
    return axios.get(BASE_URL + 'cancha/clubLike/' + text);
  },
  getLast10Canchas: async (fechaInicio, fechaFin) => {
    return axios.get(
      BASE_URL +
        'cancha/ultimas-canchas?inicio=' +
        fechaInicio +
        '&fin=' +
        fechaFin
    );
  },
  getCancha: async (id_club, id_cancha) => {
    return axios.get(BASE_URL + 'cancha/' + id_club + '/' + id_cancha);
  },
};
