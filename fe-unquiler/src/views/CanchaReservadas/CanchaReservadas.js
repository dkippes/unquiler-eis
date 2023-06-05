import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClubService } from '../../api/ClubService';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import Header from '../../components/Header';
import ReservasTable from '../components/ReservasTable';
import { Box } from '@chakra-ui/react';

const CanchaReservadas = () => {


  return (
    <Layout>
      <Header />
      <Box p={2} bgColor="brand.200" w="80%" margin="20px auto">
          <ReservasTable  isFromClub />
      </Box>
    </Layout>
  );
};

export default CanchaReservadas;
