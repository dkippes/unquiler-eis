import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClubService } from '../../api/ClubService';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import Header from '../../components/Header';
import ReservasTable from '../components/ReservasTable';
import { Box } from '@chakra-ui/react';

const CanchaReservadas = () => {
  const { id } = useParams();
  const [reservadas, setReservadas] = useState([]);

  useEffect(() => {
    ClubService.reservadas(id)
      .then(res => {
        setReservadas(res.data);
      })
      .catch(err => {
        toast(err);
      });
  }, [id]);

  return (
    <Layout>
      <Header />
      <Box p={2} bgColor="brand.200" w="80%" margin="20px auto">
        <ReservasTable reservas={reservadas} isFromClub />
      </Box>
    </Layout>
  );
};

export default CanchaReservadas;
