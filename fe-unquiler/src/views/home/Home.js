import React, {useEffect, useState} from 'react';
import {Box, Flex, Heading, HStack, Icon, IconButton, Image, Input, Spinner, Text, VStack} from '@chakra-ui/react';
import Header from '../../components/Header';
import Layout from '../components/Layout';
import {SearchIcon} from "@chakra-ui/icons";
import {Form, useNavigate} from "react-router-dom";
import {ClubService} from "../../api/ClubService";
import {toast} from "react-toastify";
import {CanchaService} from "../../api/CanchaService";
import Placeholder from "../static/image-placeholder.jpg";
import {BsPeopleFill} from "react-icons/bs";


const Home = () => {

    const [canchas, setCanchas] = useState([]);
    const [searchActivated, setSearchActivated] = useState(false)
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const fetchInitialResults = async () => {
            try {
                const res = await CanchaService.getLast10Canchas();
                if (res.data.length > 0) {
                    console.log(canchas)
                    setCanchas(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchInitialResults();
    }, []);


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const isInputValueValid = inputValue.length >= 2;

    const handleSubmit = (e)=>{
        e.preventDefault();
        CanchaService.getByClubName(inputValue)
            .then(res => {
                console.log(res.data);
                setSearchActivated(true)
                setCanchas(res.data)
            })
            .catch(err => console.log(err));

    };

    const handleImageClick= (cancha) =>{
        console.log(cancha)
        navigate(cancha.club_id +'/' + cancha.id + '/ver-detalle' );
    }

    let content = null;

    if (canchas.length === 0 && !searchActivated) {
        content = (
            <VStack color="brand.200" p={6} align={'flex-start'}>
                <Heading size="4xl">Bienvenido a UNQuiler!</Heading>
                <Text fontSize={'xl'}>
                    Por el momento no tenemos canchas disponibles, pero pronto lo haremos!
                </Text>
            </VStack>
        );
    } else if (canchas.length === 0 && searchActivated) {
        content =  (
            <VStack color="brand.200" p={6} align={'flex-start'}>
                <Text fontSize={'xl'}>
                    No hay resultados para tu búsqueda. Intenta nuevamente con otro texto.
                </Text>
            </VStack>
        );
    } else {
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
                <form onSubmit={handleSubmit}>
                    <Flex>
                        <Input
                            bg="whitesmoke"
                            placeholder='Buscar...'
                            focusBorderColor="grey"
                            borderColor="grey"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <IconButton
                            ml="10px"
                            aria-label='Buscar club'
                            icon={<SearchIcon />}
                            borderColor="blackAlpha.100"
                            spinner={<Spinner />}
                            type="submit"
                            isDisabled={!isInputValueValid}
                        />
                    </Flex>
                </form>
            </Header>

            {content}
        </Layout>
    );
};

export default Home;
