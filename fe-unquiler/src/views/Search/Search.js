import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {CanchaService} from "../../api/CanchaService";
import {Box, Flex, Heading, HStack, Icon, IconButton, Image, Input, Spinner, Text, VStack} from "@chakra-ui/react";
import Placeholder from "../static/image-placeholder.jpg";
import {BsPeopleFill} from "react-icons/bs";
import Layout from "../components/Layout";
import Header from "../../components/Header";
import SearchForm from "../../components/SearchForm";

const Search = () => {

    const {text} = useParams();
    const [canchas, setCanchas] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        const fetchInitialResults = async () => {
            CanchaService.getByClubName(text)
                .then(res => {
                    setCanchas(res.data)
                })
                .catch(err => console.log(err));
        };

        fetchInitialResults();
    }, [text]);




    const handleImageClick= (cancha) =>{
        navigate(cancha.club_id +'/' + cancha.id + '/ver-detalle' );
    }

    let content = null;

    if (canchas.length === 0) {
        content = (
            <VStack color="brand.200" p={6} align={'flex-start'}>
                <Text fontSize={'xl'}>
                    No hay resultados para tu búsqueda. Intenta nuevamente con otro texto.
                </Text>
            </VStack>
        );
    }  else {
        content =  (
            <HStack align="center" spacing={8} mt={4} flexWrap="wrap" justify="space-evenly">
                {canchas?.map((cancha) => (
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
                <SearchForm/>
            </Header>

            {content}
        </Layout>
    );
};

export default Search;