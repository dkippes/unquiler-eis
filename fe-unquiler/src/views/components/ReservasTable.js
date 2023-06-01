import {
  Box, Button,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { UserService } from '../../api/UserService';
import {ClubService} from "../../api/ClubService";
import {useParams} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

const ReservasTable = ({ reservas, isFromClub }) => {

    const { user } = useAuth();

    const [reservasData, setReservasData] = useState([]);

  useEffect(() => {
    setReservasData(reservas);
  }, [reservas]);

  const handleCancelarReserva = (datos) => {
    UserService.cancelarReservas(datos?.userId, datos?.id)
      .then((res) => {
        console.log(res);
        setReservasData(res.data); // Actualiza las reservas después de cancelar
      })
      .catch((e) => console.log(e));
  };

  const handleMarcarComoPago = (datosReserva) => {

      //se obtiene dato del club logueado
      const clubId = user.id

      ClubService.markAsPaid(clubId,datosReserva.id)
          .then((res) => {
              setReservasData(res.data); // Actualiza las reservas después de marcar paga
          })
          .catch((e) => console.log(e));
  }

  function getActionButton(datos){
    if(isFromClub){
        //Si está pagado no se puede volver a presionar el botón
      return !datos.pagado && (
          <Td textAlign={'center'}>
            <Button
                onClick={() => handleMarcarComoPago(datos)}
                colorScheme='green'
            >
              Marcar como paga
            </Button>
          </Td>
      )
    }
    return (
        <Td textAlign={'center'}>
          <button
              onClick={() => handleCancelarReserva(datos)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
          >
            <CloseIcon boxSize={3} color='red.500' />
          </button>
        </Td>
    )
  }

  return (
    <Box>
      {reservasData && reservasData.length > 0 ? (
        <TableContainer>
          <Heading textAlign={'center'}>Mis Reservas</Heading>
          <Table size='lg'>
            <Thead>
              <Tr>
                {isFromClub ? <Th>Email Cliente</Th> : <Th>Nombre Club</Th>}
                <Th>Nombre Cancha</Th>
                <Th>Deporte</Th>
                <Th>Fecha</Th>
                <Th>Horario</Th>
                <Th>Precio</Th>
                <Th>Pagado</Th>
                {!isFromClub && <Th>Cancelar</Th>}
              </Tr>
            </Thead>
            <Tbody>
              {reservasData.map((datos) => (
                <Tr key={datos?.id}>
                  <Td>
                    {isFromClub ? datos?.emailCliente : datos?.nombreClub}
                  </Td>
                  <Td>{datos?.nombreCancha}</Td>
                  <Td>{datos?.deporte}</Td>
                  <Td>{datos?.fecha}</Td>
                  <Td>{datos?.horario}</Td>
                  <Td>{datos?.precio}</Td>
                  <Td>{datos?.pagado ? 'Sí' : 'No'}</Td>
                  {getActionButton(datos)}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Heading textAlign={'center'}>No hay reservas por el momento.</Heading>
      )}
    </Box>
  );
};

export default ReservasTable;