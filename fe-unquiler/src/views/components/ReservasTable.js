import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';

const ReservasTable = ({ reservas, isFromClub }) => {
  return (
    <Box>
      {reservas && reservas.length > 0 ? (
        <TableContainer>
          <Heading textAlign={'center'}>Mis Reservas:</Heading>
          <Table size="lg">
            <Thead>
              <Tr>
                {isFromClub ? <Th>Email Cliente</Th> : <Th>Nombre Club</Th>}
                <Th>Nombre Cancha</Th>
                <Th>Deporte</Th>
                <Th>Fecha</Th>
                <Th>Horario</Th>
                <Th>Precio</Th>
                <Th>Pagado</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reservas.map((datos, i) => (
                <Tr key={datos?.nombreClub + datos?.nombreCancha + i}>
                  <Td>
                    {isFromClub ? datos?.emailCliente : datos?.nombreClub}
                  </Td>
                  <Td>{datos?.nombreCancha}</Td>
                  <Td>{datos?.deporte}</Td>
                  <Td>{datos?.fecha}</Td>
                  <Td>{datos?.horario}</Td>
                  <Td>{datos?.precio}</Td>
                  <Td>{datos?.pagado ? 'Sí' : 'No'}</Td>
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
