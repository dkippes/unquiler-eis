import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    Image,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure, Text, ButtonGroup, FormHelperText,
} from "@chakra-ui/react";
import registerImage from "./register.png";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleEmailChange = (event) => {
        const emailValue = event.target.value;
        setEmail(emailValue);
        const emailRegex = /^[A-Z0-9._%+-]+@(gmail|hotmail|live)\.com$/i;
        setIsValidEmail(emailRegex.test(emailValue));
    };

    const handlePasswordChange = (event) => {
        const passwordValue = event.target.value;
        setPassword(passwordValue);
        setIsValidPassword(passwordValue.length >= 6);
    };

    const handleConfirmPasswordChange = (event) => {
        const confirmPwd = event.target.value;
        setConfirmPassword(confirmPwd);

        if (confirmPwd !== password) {
            setIsValidConfirmPassword(false);
        } else {
            setIsValidConfirmPassword(true);
        }
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword || !isValidEmail || !isValidPassword) {
            onOpen();
            return;
        }

        const response = await fetch("http://localhost:8080/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        const data = await response.json();
        console.log(data);

        // if (response.ok) {
        //     window.location.href = "https://www.google.com";
        // }
    };

    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <Flex h="100%">
                <Box
                    bg="white"
                    p="8"
                    borderRadius="lg"
                    boxShadow="lg"
                    maxW="sm"
                    w="full"
                    mr="4"
                >
                    <Heading as="h1" mb="4">
                        Registro
                    </Heading>
                    <form onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="email">Email:</FormLabel>
                            <Input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                width="100%"
                            />
                            {!isValidEmail && email.length > 0 && (
                                <FormHelperText color="red">Ingresa un correo válido</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl isRequired mt="4">
                            <FormLabel htmlFor="password">Contraseña:</FormLabel>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                width="100%"
                            />
                            {!isValidPassword && password.length > 0 && (
                                <FormHelperText color="red">
                                    La contraseña debe tener al menos 6 caracteres
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl isRequired mt="4">
                            <FormLabel htmlFor="confirm-password">
                                Confirmar contraseña:
                            </FormLabel>
                            <Input
                                type="password"
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                width="100%"
                            />
                            {!isValidConfirmPassword && confirmPassword.length > 0 && (
                                <FormHelperText color="red">
                                    Las contraseñas no coinciden
                                </FormHelperText>
                            )}
                        </FormControl>
                        <ButtonGroup mt="4" width="100%">
                            {isValidEmail && isValidPassword && isValidConfirmPassword ? (
                                <Button onClick={handleSubmit} width="100%" backgroundColor="#E74646" _hover={{ background: "#FA9884" }}>
                                    Registrarse
                                </Button>
                            ) : (
                                <Button isDisabled width="100%">
                                    Complete los datos
                                </Button>
                            )}
                        </ButtonGroup>
                    </form>
                    <Text mt="4" width="100%" textAlign="center">
                        ¿Ya tienes cuenta?{" "}
                        <a
                            href="/login"
                            style={{ textDecoration: "underline" }}
                        >
                            Ingresa aquí
                        </a>
                    </Text>
                </Box>
                <Image src={registerImage} alt="Imagen de registro" objectFit="cover" flex={1} />
            </Flex>
        </div>
    );
}

export default Register;