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
    useDisclosure, Text, ButtonGroup,
} from "@chakra-ui/react";
import registerImage from "./register.png";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
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
        setConfirmPassword(event.target.value);
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
                        <FormControl>
                            <FormLabel htmlFor="email">Email:</FormLabel>
                            <Input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            {!isValidEmail && email.length > 0 && (
                                <Text color="red">Ingresa un correo válido</Text>
                            )}
                        </FormControl>
                        <FormControl mt="4">
                            <FormLabel htmlFor="password">Contraseña:</FormLabel>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            {!isValidPassword && password.length > 0 && (
                                <Text color="red">La contraseña debe tener al menos 6 caracteres</Text>
                            )}
                        </FormControl>
                        <FormControl mt="4">
                            <FormLabel htmlFor="confirm-password">
                                Confirmar contraseña:
                            </FormLabel>
                            <Input
                                type="password"
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                        </FormControl>
                        <ButtonGroup>
                            {isValidEmail && isValidPassword ? (
                                <Button onClick={handleSubmit} style={{ margin: "10px" }}>Registrarse</Button>
                            ) : (
                                <Button isDisabled style={{ margin: "10px" }}>Complete los datos</Button>
                            )}
                        </ButtonGroup>
                        {/*<Button mt="4" type="submit" disabled={!isValidEmail || !isValidPassword} style={{ cursor: 'default',  pointerEvents: "none" }}>*/}
                        {/*    Registrarse*/}
                        {/*</Button>*/}
                    </form>
                    <Text mt="4" fontSize="sm">
                        ¿Ya tienes cuenta?{" "}
                        <a
                            href="/login"
                            style={{ textDecoration: "underline" }}
                            color="blue.500"
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