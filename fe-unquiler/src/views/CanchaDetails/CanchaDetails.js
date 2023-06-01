import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CanchaService } from '../../api/CanchaService';
import {
  Box,
  Button,
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
import { useAuth } from '../../context/AuthContext';
import { dateFormatter } from '../../utils';
import { UserService } from '../../api/UserService';

const CanchaDetails = () => {
  const { id_club, id_cancha } = useParams();
  const [canchaDetail, setCanchaDetail] = useState();
  const { user } = useAuth();
  const userIsNotClub = user && !user.isClub;

  useEffect(() => {
    CanchaService.getCancha(id_club, id_cancha)
      .then(res => {
        console.log(res);
        setCanchaDetail(res.data);
      })
      .catch(err =>
        toast('Error al cargar la cancha', {
          type: 'error',
          position: 'top-right',
        })
      );
  }, [id_cancha, id_club]);

  const handleAlquilar = horario => {
    UserService.alquilar(user.id, id_cancha, {
      fecha: dateFormatter(new Date()),
      hora: horario.hora,
    })
      .then(() => {
        toast('Reserva realizada exitosamente', { type: 'success' });
        const hs = canchaDetail.horariosDisponibles[
          dateFormatter(new Date())
        ].map(h => (h.hora === horario.hora ? { ...h, disponible: false } : h));

        const nuevosHorarios = {
          ...canchaDetail.horariosDisponibles,
          [dateFormatter(new Date())]: hs,
        };

        setCanchaDetail({
          ...canchaDetail,
          horariosDisponibles: nuevosHorarios,
        });
      })
      .catch(() =>
        toast(
          'La cancha ya fue reservada en esa fecha. Recargue la página para ver los horarios disponibles',
          {
            type: 'error',
          }
        )
      );
  };

  const renderContent = () => {
    if (!canchaDetail)
      return (
        <Center m={5}>
          <Spinner size={'xl'} thickness="10px" color="brand.200" />
        </Center>
      );

    const todayDateFormat = dateFormatter(new Date())

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
            {canchaDetail?.horariosDisponibles[todayDateFormat] && canchaDetail?.horariosDisponibles[todayDateFormat]?.some((h) => h?.disponible) ? (
              canchaDetail?.horariosDisponibles[todayDateFormat]?.map(
                (horario, i) => (
                  <HStack key={horario.hora + i}>
                    <HStack>
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
                    {userIsNotClub && horario.disponible && (
                      <Button
                        colorScheme="green"
                        onClick={() => handleAlquilar(horario)}
                      >
                        Alquilar
                      </Button>
                    )}
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
