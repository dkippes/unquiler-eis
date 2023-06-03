import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Header from '../../components/Header';
import { VStack } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { UserService } from '../../api/UserService';
import ReservasTable from '../components/ReservasTable';

const MyReservations = () => {


  return (
    <Layout>
      <Header />
      <VStack
        bgColor="brand.200"
        alignItems="flex-start"
        m={6}
        p={4}
        borderRadius={5}
      >
        <VStack w="full" spacing={4} alignItems="flex-start">
            <ReservasTable  />
        </VStack>
      </VStack>
    </Layout>
  );
};

export default MyReservations;