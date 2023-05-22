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
                                                <Th>Nombre Club</Th>
                                                <Th>Nombre Cancha</Th>
                                                <Th>Deporte</Th>
                                                <Th>Fecha</Th>
                                                <Th>Horario</Th>
                                                <Th>Precio</Th>
                                                <Th>Pagado</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {reservas.map((datos) => (
                                                <Tr key={datos?.nombreClub + datos?.nombreCancha}>
                                                    <Td>{datos?.nombreClub}</Td>
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
                    </HStack>
                </VStack>
            </VStack>
        </Layout>
    );
};

export default MyReservations;
