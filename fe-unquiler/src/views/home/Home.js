import React, {useState} from 'react';
import {Flex, Heading, IconButton, Input, Spinner, Text, VStack} from '@chakra-ui/react';
import Header from '../../components/Header';
import Layout from '../components/Layout';
import {SearchIcon} from "@chakra-ui/icons";
import {Form} from "react-router-dom";
import {ClubService} from "../../api/ClubService";
import {toast} from "react-toastify";
import {CanchaService} from "../../api/CanchaService";


const Home = () => {

    //hacer en submit el fetch para traer las ultmas 10 canchas del club con el nombre similar

    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const isInputValueValid = inputValue.length >= 2;

    const handleSubmit = (e)=>{
        e.preventDefault();
        CanchaService.getByClubName(inputValue)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));

    };



    return (
    <Layout>
          <Header>
              <form onSubmit={handleSubmit}>
                  <Flex>
                  <Input bg="whitesmoke" placeholder='Buscar...' focusBorderColor="grey" borderColor="grey"  value={inputValue}
                         onChange={handleInputChange}/>
                  <IconButton ml="10px" aria-label='Buscar club' icon={<SearchIcon  />}   borderColor="blackAlpha.100" spinner={<Spinner/>}
                               type="submit" isDisabled={!isInputValueValid}
                  />
                  </Flex>
              </form>
          </Header>

        {/*Si no hay canchas todavía...*/}
        <VStack color="brand.200" p={6} align={'flex-start'}>
        <Heading size="4xl"> Bienvenido a UNQuiler!</Heading>
        <Text fontSize={'xl'}>
          Por el momento no tenemos canchas disponibles, pero pronto lo haremos!
        </Text>
      </VStack>
    </Layout>
  );
};

export default Home;
