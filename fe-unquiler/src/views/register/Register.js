import React from 'react';
import { Box, Heading, Image, Flex, Link } from '@chakra-ui/react';
import registerImage from '../static/register.png';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/AuthService';
import { useAuth } from '../../context/AuthContext';
import useForm from '../../hooks/useForm';
import ClientSignInForm from '../components/ClientSignInForm';
import { toast } from 'react-toastify';

function Login() {
  const { errors, email, password, values, handleChange, reset } = useForm(
    {
      email: '',
      password: '',
      confirmPassword: '',
    },
    {
      email: false,
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
        .register(email, password)
        .then(res => {
          login(res);
          toast('Usuario registrado con éxito', {
            type: 'success',
          });
          navigate('/');
        })
        .catch(err => {
          const errorText =
            err.response.status === 404
              ? 'Ya existe usuario con ese mail registrado'
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
          <Heading as="h1" mb="4">
            Crea tu cuenta 🏓
          </Heading>
          <ClientSignInForm
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

export default Login;
