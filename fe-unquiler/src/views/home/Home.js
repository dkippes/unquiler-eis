import React from 'react';
import {Flex, Heading, IconButton, Input, Spinner, Text, VStack} from '@chakra-ui/react';
import Header from '../../components/Header';
import Layout from '../components/Layout';
import {SearchIcon} from "@chakra-ui/icons";


const Home = () => {
  return (
    <Layout>
          <Header>
              <Flex>
                  <Input bg="whitesmoke" placeholder='Buscar...' focusBorderColor="grey" borderColor="grey"/>
                  <IconButton ml="10px" aria-label='Buscar club' icon={<SearchIcon />}   borderColor="blackAlpha.100" spinner={<Spinner/>}/>
              </Flex>
          </Header>
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
