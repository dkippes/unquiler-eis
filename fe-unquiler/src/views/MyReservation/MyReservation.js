import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../../components/Header';
import {
  Box,
  HStack,
  Heading,
  VStack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  TableContainer,
  Td,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserService } from '../../api/UserService';
import { useAuth } from '../../context/AuthContext';
import ReservasTable from '../components/ReservasTable';

const MyReservations = () => {
  const { user } = useAuth();
  const [reservas, setReservas] = React.useState();

  useEffect(() => {
    UserService.reservas(user?.id)
      .then(res => {
        setReservas(res);
      })
      .catch(e => console.log(e));
  }, [user?.id]);

  return (
    <Layout>
      <Header />
      <VStack
        bgColor="brand.200"
        alignItems={'flex-start'}
        m={6}
        p={4}
        borderRadius={5}
      >
        <VStack w="full" spacing={4} alignItems={'flex-start'}>
          <HStack justifyContent="center" w="full" alignSelf="center">
            <ReservasTable reservas={reservas} />
          </HStack>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default MyReservations;
