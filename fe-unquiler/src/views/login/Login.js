import React from 'react';
import { Box, Heading, Image, Flex, Link } from '@chakra-ui/react';
import registerImage from '../static/register.png';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/AuthService';
import { useAuth } from '../../context/AuthContext';
import useForm from '../../hooks/useForm';
import ClientSignInForm from '../components/ClientSignInForm';
import { toast } from 'react-toastify';
import UnquilerLogo from '../../components/UnquilerLogo';

function Login() {
  const { errors, email, password, values, handleChange, reset } = useForm(
    {
      email: '',
      password: '',
      loginAsClub: false,
    },
    {
      email: false,
      password: false,
    }
  );
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async event => {
    event.preventDefault();
    if (!errors.email && !errors.password) {
      authService
        .login(email, password)
        .then(res => {
          login(res);
          toast('Usuario ingresado con éxito', {
            type: 'success',
          });
          navigate('/');
        })
        .catch(err => {
          const errorText =
            err.response.status === 404
              ? 'Email o contraseña no existentes'
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
              Bienvenido a UNQuiler
            </Heading>
            <UnquilerLogo w="80px" h="80px" />
          </Flex>
          <ClientSignInForm
            values={values}
            onSubmit={handleSubmit}
            onChange={handleChange}
            errors={errors}
            submitBtnText="Ingresar"
          />
          <Link
            onClick={() => navigate('/user/register')}
            width="100%"
            textAlign="center"
            color="blue.600"
            my="3"
            display="block"
          >
            ¿No tienes cuenta? Registrate aqui!
          </Link>
        </Box>
        <Image
          src={registerImage}
          alt="Imagen de login"
          objectFit="cover"
          flex={[0, 1]}
          flexShrink={[1, 0]}
        />
      </Flex>
    </div>
  );
}

export default Login;
