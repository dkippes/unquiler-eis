import axios from 'axios';

const BASE_URL = 'http://localhost:8080/';

export const ClubService = {
  deportes: async () => {
    return axios.get(BASE_URL + 'club/deportes');
  },
  publish: async (
    clubId,
    { nombre, urlImagen, direccion, capacidad, precio, deporte, horariosDisponibles }
  ) => {
    console.log(urlImagen)
    return axios.post(BASE_URL + 'club/' + clubId + '/publish', {
      nombre,
      urlImagen,
      direccion,
      capacidad,
      club: null,
      precio,
      deporte,
      horariosDisponibles,
    });
  },
  clubInformation: async id => {
    return axios.get(BASE_URL + 'club/' + id);
  },
  reservadas: async id => {
    return axios.get(BASE_URL + 'club/' + id + '/reservadas');
  },
  markAsPaid: async (idClub, idReserva) => {
    return axios.get(BASE_URL + 'club/' + idClub+ '/marcar-paga/'  + idReserva);
  }

};
