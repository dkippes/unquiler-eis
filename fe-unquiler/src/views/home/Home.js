import React from 'react';
import { Box, Button, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <Box minHeight={'100vh'} bgColor="brand.500">
      <Flex bgColor="brand.200" justify="space-between" p="2" align="center">
        <Heading color="brand.500">🏓 UNQuiler</Heading>

        {user ? (
          <Button colorScheme="brand" onClick={logout} variant="outline">
            Cerrar Sesion
          </Button>
        ) : (
          <Flex gap="6">
            <Button
              colorScheme="brand"
              onClick={() => navigate('/login')}
              variant="link"
            >
              Ingresar
            </Button>
            <Button colorScheme="brand" onClick={() => navigate('/register')}>
              Registrarse
            </Button>
          </Flex>
        )}
      </Flex>
      <VStack color="brand.200" p={6} align={'flex-start'}>
        <Heading size="4xl"> Bienvenido a UNQuiler!</Heading>
        <Text fontSize={'xl'}>
          Por el momento no tenemos canchas disponibles, pero pronto lo haremos!
        </Text>
      </VStack>
    </Box>
  );
};

export default Home;
