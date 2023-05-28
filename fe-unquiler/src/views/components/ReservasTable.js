import {
  Box, Flex,
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

const ReservasTable = ({ reservas, isFromClub }) => {
  const [reservasData, setReservasData] = useState([]);

  useEffect(() => {
    setReservasData(reservas);
  }, [reservas]);

  const handleCancelarReserva = (datos) => {
    console.log(datos);
    UserService.cancelarReservas(datos?.userId, datos?.id)
      .then((res) => {
        console.log(res);
        setReservasData(res); // Actualiza las reservas después de cancelar
      })
      .catch((e) => console.log(e));
  };

  return (
    <Box>
      {reservasData && reservasData.length > 0 ? (
        <TableContainer>
          <Heading textAlign={'center'}>Mis Reservas:</Heading>
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
                  {!isFromClub && (
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
                  )}
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