import React, {useEffect} from 'react';
import Layout from '../components/Layout';
import Header from '../../components/Header';
import {
    Avatar,
    Box,
    Button,
    Flex,
    HStack,
    Heading,
    Icon,
    Image,
    Text,
    VStack, Center, Table, TableCaption, Thead, Tr, Th, Tbody, Tfoot, TableContainer, Td,
} from '@chakra-ui/react';
import {useNavigate, useParams} from 'react-router-dom';
import {ClubService} from '../../api/ClubService';
import {ImLocation2} from 'react-icons/im';
import {BsPeopleFill} from 'react-icons/bs';
import Placeholder from '../static/image-placeholder.jpg';
import {UserService} from "../../api/UserService";
import {dateFormatter} from "../../utils";
import {toast} from "react-toastify";
import {useAuth} from "../../context/AuthContext";
import {CanchaService} from "../../api/CanchaService";
import { CloseIcon } from '@chakra-ui/icons';

const MyReservations = () => {
    const {id} = useParams();
    const {user} = useAuth();
    const [reservas, setReservas] = React.useState();
    const navigate = useNavigate();

    useEffect(() => {
        UserService.reservas(user?.id)
            .then((res) => {
                setReservas(res);
            })
            .catch((e) =>
                console.log(e)
            );
    }, [user?.id]);

    const handleCancelarReserva = (datos) => {
        console.log(datos);
        UserService.cancelarReservas(datos?.userId, datos?.id)
          .then((res) => {
              setReservas(res);
          })
          .catch((e) =>
            console.log(e)
          );
    };

    return (
        <Layout>
            <Header/>
            <VStack
                bgColor="brand.200"
                alignItems={'flex-start'}
                m={6}
                p={4}
                borderRadius={5}
            >
                <VStack w="full" spacing={4} alignItems={'flex-start'}>
                    <HStack
                        justifyContent="center"
                        w="full"
                        alignSelf='center'
                    >
                        <Box>
                            {reservas && reservas.length > 0 ? (
                                <TableContainer>
                                    <Heading textAlign={'center'}>Mis Reservas:</Heading>
                                    <Table size='lg'>
                                        <Thead>
                                            <Tr>
                                                <Th textAlign={'center'}>Nombre Club</Th>
                                                <Th textAlign={'center'}>Nombre Cancha</Th>
                                                <Th textAlign={'center'}>Deporte</Th>
                                                <Th textAlign={'center'}>Fecha</Th>
                                                <Th textAlign={'center'}>Horario</Th>
                                                <Th textAlign={'center'}>Precio</Th>
                                                <Th textAlign={'center'}>Pagado</Th>
                                                <Th textAlign={'center'}>Cancelar</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {reservas.map((datos) => (
                                                <Tr key={datos?.id}>
                                                    <Td textAlign={'center'}>{datos?.nombreClub}</Td>
                                                    <Td textAlign={'center'}>{datos?.nombreCancha}</Td>
                                                    <Td textAlign={'center'}>{datos?.deporte}</Td>
                                                    <Td textAlign={'center'}>{datos?.fecha}</Td>
                                                    <Td textAlign={'center'}>{datos?.horario}</Td>
                                                    <Td textAlign={'center'}>{datos?.precio}</Td>
                                                    <Td textAlign={'center'}>{datos?.pagado ? 'Sí' : 'No'}</Td>
                                                    <Td textAlign={'center'}>
                                                        <button
                                                          onClick={() => handleCancelarReserva(datos)} // Llama a la función handleCancelarReserva pasando los datos de la reserva
                                                          style={{
                                                              background: 'none',
                                                              border: 'none',
                                                              cursor: 'pointer',
                                                          }}
                                                        >
                                                            <CloseIcon boxSize={3} color="red.500" />
                                                        </button>
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <Heading textAlign={'center'}>No hay reservas por el momento.</Heading>
                            )}
                        </Box>
                    </HStack>
                </VStack>
            </VStack>
        </Layout>
    );
};

export default MyReservations;
