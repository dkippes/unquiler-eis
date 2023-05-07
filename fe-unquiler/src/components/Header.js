import {Avatar, Button, Flex, Heading, IconButton, Input} from '@chakra-ui/react';
import React from 'react';
import UnquilerLogo from './UnquilerLogo';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Header = ({children}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Flex bgColor="brand.200" justify="space-between" p="2" align="center">
      <Flex gap="3" align="center">
        <UnquilerLogo onClick={() => navigate('/')} cursor="pointer" />
        <Heading color="brand.500">UNQuiler</Heading>
      </Flex>

      {children}

      {user ? (
        <Flex gap={2} alignItems={'center'}>
          {user.isClub && (
            <Button
              colorScheme="brand"
              onClick={() => navigate('/club/publish')}
              variant="outline"
            >
              Publicar Cancha
            </Button>
          )}
          <Button colorScheme="brand" onClick={logout} variant="outline">
            Cerrar Sesion
          </Button>
          {user.isClub && (
            <Avatar
              onClick={() => navigate('/club/' + user.id)}
              cursor="pointer"
            />
          )}
        </Flex>
      ) : (
        <Flex gap="6">
          <Button
            colorScheme="brand"
            onClick={() => navigate('/login')}
            variant="link"
          >
            Ingresar
          </Button>
          <Button
            colorScheme="brand"
            onClick={() => navigate('/user/register')}
          >
            Registrar Cliente
          </Button>
          <Button
            colorScheme="brand"
            onClick={() => navigate('/club/register')}
          >
            Registrar Club
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
