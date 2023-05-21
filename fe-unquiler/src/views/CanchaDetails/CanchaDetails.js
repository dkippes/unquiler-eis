import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CanchaService } from '../../api/CanchaService';
import {
  Box,
  Center,
  HStack,
  Heading,
  Icon,
  Image,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import Layout from '../components/Layout';
import Header from '../../components/Header';
import Placeholder from '../static/image-placeholder.jpg';
import { BsPeopleFill } from 'react-icons/bs';
import { MdSchedule } from 'react-icons/md';
import { toast } from 'react-toastify';

const CanchaDetails = () => {
  const { id_club, id_cancha } = useParams();
  const [canchaDetail, setCanchaDetail] = useState();

  useEffect(() => {
    CanchaService.getCancha(id_club, id_cancha)
      .then(res => {
        setCanchaDetail(res.data);
      })
      .catch(err =>
        toast('Error al cargar la cancha', {
          type: 'error',
          position: 'top-right',
        })
      );
  }, [id_cancha, id_club]);

  const renderContent = () => {
    if (!canchaDetail)
      return (
        <Center m={5}>
          <Spinner size={'xl'} thickness="10px" color="brand.200" />
        </Center>
      );

    const todayDateFormat = (() => {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      return `${year}-${month < 10 ? '0' + month : month}-${day}`;
    })();

    return (
      <HStack
        overflow="hidden"
        margin="1rem auto"
        w="80%"
        borderRadius={'md'}
        bgColor="brand.200"
      >
        <Box
          position="relative"
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Heading size={['xs', 'lg']} position="absolute">
            Por el momento esta cancha no tiene imagen
          </Heading>
          <Image alt="image_placeholder" src={Placeholder} />
        </Box>
        <VStack
          alignItems={'flex-start'}
          spacing={4}
          p={4}
          alignSelf="flex-start"
        >
          <Heading textAlign={'center'}>{canchaDetail.nombre}</Heading>
          <Text fontSize={'lg'}>
            Precio: ${Intl.NumberFormat('es-AR').format(canchaDetail.precio)}
          </Text>
          <HStack fontSize={'lg'}>
            <Text>Capacidad: {canchaDetail.capacidad}</Text>{' '}
            <Icon as={BsPeopleFill} />
          </HStack>
          <Text fontSize={'lg'}>Deporte: {canchaDetail.deporte}</Text>
          <Heading size="md">Proximos Horarios de hoy disponibles:</Heading>
          <VStack alignItems={'flexStart'}>
            <Heading size="md">Hoy ({todayDateFormat}):</Heading>
            {canchaDetail.horariosDisponibles[todayDateFormat] ? (
              canchaDetail.horariosDisponibles[todayDateFormat].map(
                (horario, i) => (
                  <HStack key={horario.hora + i}>
                    <Icon as={MdSchedule} />
                    <Text fontSize={'lg'}>
                      {horario.hora} -{' '}
                      <Text
                        color={horario.disponible ? 'green.500' : 'red.500'}
                        as="span"
                      >
                        {horario.disponible ? 'Disponible' : 'Ocupado'}
                      </Text>
                    </Text>
                  </HStack>
                )
              )
            ) : (
              <Text>No hay horarios para hoy</Text>
            )}
          </VStack>
        </VStack>
      </HStack>
    );
  };

  return (
    <Layout>
      <Header />
      {renderContent()}
    </Layout>
  );
};

export default CanchaDetails;
