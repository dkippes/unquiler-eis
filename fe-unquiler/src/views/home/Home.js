import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import Header from '../../components/Header';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { CanchaService } from '../../api/CanchaService';
import Placeholder from '../static/image-placeholder.jpg';
import { BsPeopleFill } from 'react-icons/bs';
import SearchForm from '../../components/SearchForm';
import useForm from '../../hooks/useForm';
import { toast } from 'react-toastify';

const Home = () => {
  const { fechaFin, fechaInicio, handleChange, reset, errors } = useForm(
    {
      fechaInicio: '',
      fechaFin: '',
    },
    {
      fechaInicio: false,
      fechaFin: false,
    }
  );
  const [canchas, setCanchas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialResults = async () => {
      try {
        const res = await CanchaService.getLast10Canchas();
        if (res.data.length > 0) {
          setCanchas(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchInitialResults();
  }, []);

  useEffect(() => {
    CanchaService.getLast10Canchas(fechaInicio || null, fechaFin || null)
      .then(res => {
        setCanchas(res.data);
      })
      .catch(err => toast(err.message, { type: 'error' }));
  }, [fechaFin, fechaInicio]);

  const handleImageClick = cancha => {
    navigate(cancha.club_id + '/' + cancha.id + '/ver-detalle');
  };

  let content = null;

  if (canchas.length === 0) {
    content = (
      <VStack color="brand.200" p={6} align={'flex-start'}>
        <Heading size="4xl">Bienvenido a UNQuiler!</Heading>
        <Text fontSize={'xl'}>
          Por el momento no tenemos canchas disponibles, pero pronto lo haremos!
        </Text>
      </VStack>
    );
  } else {
    content = (
      <HStack
        align="center"
        spacing={8}
        mt={4}
        flexWrap="wrap"
        justify="space-evenly"
      >
        {canchas?.map(cancha => (
          <Box border="1px solid black" key={cancha.id} mb={6}>
            <Image
              w={300}
              h={200}
              objectFit={'contain'}
              alt="imagen de cancha"
              src={Placeholder}
              onClick={() => handleImageClick(cancha)}
              _hover={{ cursor: 'pointer' }}
            />
            <VStack p={2} color="brand.200">
              <Heading as="h4" size="lg">
                {cancha.nombre}
              </Heading>
              <HStack color="gray.800" spacing={4}>
                <Text>{cancha.deporte}</Text>
                <Text color="gray.900">
                  $
                  {Intl.NumberFormat('es-AR', {
                    maximumSignificantDigits: 3,
                  }).format(cancha.precio)}
                </Text>
                <HStack title="capacidad">
                  <Icon fontSize="15px" as={BsPeopleFill} />
                  <Text>{cancha.capacidad}</Text>
                </HStack>
              </HStack>
            </VStack>
          </Box>
        ))}
      </HStack>
    );
  }

  return (
    <Layout>
      <Header>
        <SearchForm />
      </Header>
      <VStack bgColor="brand.200" alignItems={'flex-start'} p={2} w="full">
        <HStack w="full" gap={2}>
          <FormControl maxW={'xs'}>
            <FormLabel
              display={'flex'}
              alignItems={'center'}
              gap={2}
              htmlFor="fechaInicio"
            >
              Desde:{' '}
              <Input
                bgColor="brand.100"
                onChange={e =>
                  handleChange(e, new Date(e.target.value) > new Date(fechaFin))
                }
                value={fechaInicio}
                id="fechaInicio"
                type="date"
                name="fechaInicio"
              />
            </FormLabel>
          </FormControl>
          <FormControl maxW={'xs'}>
            <FormLabel
              display={'flex'}
              alignItems={'center'}
              gap={2}
              htmlFor="fechaFin"
            >
              Hasta:
              <Input
                bgColor="brand.100"
                onChange={e =>
                  handleChange(
                    e,
                    new Date(e.target.value) < new Date(fechaInicio)
                  )
                }
                value={fechaFin}
                id="fechaFin"
                type="date"
                name="fechaFin"
              />
            </FormLabel>
          </FormControl>

          <Button colorScheme="brand" type="button" onClick={reset}>
            Eliminar Filtros
          </Button>
        </HStack>
        <Text color="brand.500">
          {errors.fechaInicio &&
            'La fecha de inicio debe ser menor a la de fin'}
          <br />
          {errors.fechaFin && 'La fecha de fin debe ser mayor a la de inicio'}
        </Text>
      </VStack>
      {content}
    </Layout>
  );
};

export default Home;
