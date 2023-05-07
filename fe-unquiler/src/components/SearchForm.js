import {Flex, IconButton, Input, Spinner} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";


const SearchForm = () => {
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const isInputValueValid = inputValue.length >= 2;

    const handleSubmit = (e)=>{
        e.preventDefault();
        navigate(`/search/${inputValue}`,{replace:true})

    };




    return (<form onSubmit={handleSubmit}>
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
    )
};

export default SearchForm;
