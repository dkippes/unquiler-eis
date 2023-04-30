import React from 'react';
import { Box, Flex, Heading, Image, Link } from '@chakra-ui/react';
import registerImage from '../static/register.png';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/AuthService';
import { useAuth } from '../../context/AuthContext';
import useForm from '../../hooks/useForm';
import { toast } from 'react-toastify';
import UnquilerLogo from '../../components/UnquilerLogo';
import ClientClubRegisterForm from '../components/ClientClubRegisterForm';

function Register() {
  const {
    errors,
    email,
    password,
    nombreClub,
    direccion,
    values,
    handleChange,
    reset,
  } = useForm(
    {
      email: '',
      nombreClub: '',
      direccion: '',
      password: '',
      confirmPassword: '',
    },
    {
      email: false,
      nombreClub: false,
      direccion: false,
      password: false,
      confirmPassword: false,
    }
  );
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async event => {
    event.preventDefault();
    if (!errors.confirmPassword && !errors.email && !errors.password) {
      authService
        .clubRegister(email, nombreClub, direccion, password)
        .then(res => {
          login(res);
          toast('Club registrado con éxito', {
            type: 'success',
          });
          navigate('/');
        })
        .catch(err => {
          const errorText =
            err.response.status === 404
              ? 'Ya existe club con ese mail registrado'
              : 'Ha ocurrido un error, por favor intente nuevamente más tarde';
          toast(errorText, {
            type: 'error',
          });
          console.error(err);
        });
      reset();
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Flex h="100%">
        <Box
          bg="white"
          p="8"
          borderRadius="lg"
          boxShadow="lg"
          maxW={['lg', 'md']}
          minW={'sm'}
          w="full"
        >
          <Flex justify="space-between" align="center">
            <Heading as="h1" mb="4">
              Registra tu Club
            </Heading>

            <UnquilerLogo
              onClick={() => navigate('/')}
              cursor="pointer"
              w="80px"
              h="80px"
            />
          </Flex>
          <ClientClubRegisterForm
            values={values}
            onSubmit={handleSubmit}
            onChange={handleChange}
            errors={errors}
            submitBtnText="Registrarse"
          />
          <Link
            onClick={() => navigate('/login')}
            width="100%"
            textAlign="center"
            color="blue.600"
            my="3"
            display="block"
          >
            ¿Ya tienes cuenta? Ingresa aquí
          </Link>
        </Box>
        <Image
          src={registerImage}
          alt="Imagen de registro"
          objectFit="cover"
          flex={[0, 1]}
          flexShrink={[1, 0]}
        />
      </Flex>
    </div>
  );
}

export default Register;
