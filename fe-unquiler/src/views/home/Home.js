import React from 'react';
import { Heading, Text, VStack } from '@chakra-ui/react';
import Header from '../../components/Header';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <Header />
      <VStack color="brand.200" p={6} align={'flex-start'}>
        <Heading size="4xl"> Bienvenido a UNQuiler!</Heading>
        <Text fontSize={'xl'}>
          Por el momento no tenemos canchas disponibles, pero pronto lo haremos!
        </Text>
      </VStack>
    </Layout>
  );
};

export default Home;
