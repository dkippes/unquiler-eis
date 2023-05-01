import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../../components/Header';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClubService } from '../../api/ClubService';
import { ImLocation2 } from 'react-icons/im';
import { BsPeopleFill } from 'react-icons/bs';
import Placeholder from '../static/image-placeholder.jpg';

const ClubDetails = () => {
  const { id } = useParams();
  const [club, setClub] = React.useState();
  const navigate = useNavigate();

  useEffect(() => {
    ClubService.clubInformation(id)
      .then(res => setClub(res.data))
      .catch();
  }, [id]);

  return (
    <Layout>
      <Header />
      <VStack
        bgColor="brand.200"
        alignItems={'flex-start'}
        m={6}
        p={4}
        borderRadius={5}
      >
        <VStack w="full" spacing={4} alignItems={'flex-start'}>
          <HStack spacing={4} align={'center'}>
            <Avatar /> <Heading>{club?.nombreClub.toUpperCase()}</Heading>
            <HStack align="center" fontSize="26px">
              <Icon color="brand.500" fontSize="25px" as={ImLocation2} />
              <Text>{club?.direccion}</Text>
            </HStack>
          </HStack>
          <Heading size={'sm'} as={'h6'} color="gray.500">
            Correo electronico: {club?.email}
          </Heading>

          <HStack
            justifyContent="center"
            w="full"
            alignSelf={club?.canchas.length === 0 ? 'center' : 'flex-start'}
          >
            {club?.canchas.length === 0 ? (
              <VStack spacing={2}>
                <Heading>No tienes canchas publicadas!</Heading>
                <Button
                  colorScheme="brand"
                  onClick={() => navigate('/club/publish')}
                >
                  Publicar Cancha
                </Button>
              </VStack>
            ) : (
              <Box>
                <Heading textAlign={'center'}>Mis canchas:</Heading>
                <Flex justifyContent="center" flexWrap="wrap">
                  {club?.canchas?.map(cancha => (
                    <Box border="2px solid red" m={2} key={cancha.id}>
                      <Image
                        w={300}
                        h={200}
                        objectFit={'contain'}
                        alt="imagen de cancha"
                        src={Placeholder}
                      />
                      <VStack p={2}>
                        <Heading as="h4" size="lg">
                          {cancha.nombre}
                        </Heading>
                        <HStack color="gray.500" spacing={4}>
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
                </Flex>
              </Box>
            )}
          </HStack>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default ClubDetails;
