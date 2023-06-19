import {
    Button,
    Container,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    Tag,
    TagLabel,
    TagLeftIcon,
    Text,
    VStack,
} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import Header from '../../components/Header';
import Layout from '../components/Layout';
import useForm from '../../hooks/useForm';
import {ClubService} from '../../api/ClubService';
import {toast} from 'react-toastify';
import {AiFillCloseCircle} from 'react-icons/ai';
import {useAuth} from '../../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import {validateUrl} from "../../utils";

const Publish = () => {
    const [deportes, setDeportes] = React.useState([]);
    const [horarios, setHorarios] = React.useState({});
    const [date, setDate] = React.useState('');
    const {user} = useAuth();
    const navigate = useNavigate();

    const horariosEntries = Object.entries(horarios);

    useEffect(() => {
        ClubService.deportes().then(res => {
            setDeportes(res.data);
        });
    }, []);

    const {
        nombre,
        urlImagen,
        direccion,
        capacidad,
        precio,
        deporte,
        hora,
        handleChange,
        handleChangeInCustomInput,
        reset,
        errors,
    } = useForm(
        {
            nombre: '',
            direccion: '',
            capacidad: 0,
            precio: 0,
            deporte: '',
            hora: '00:00',
        },
        {
            nombre: false,
            direccion: false,
            capacidad: false,
            precio: false,
            deporte: false,
        }
    );

    const disableSubmit =
        Object.values(errors).some(Boolean) ||
        !nombre.length ||
        !urlImagen ||
        !direccion.length ||
        !capacidad ||
        !precio ||
        !deporte ||
        !horariosEntries.length;

    const handleSubmit = e => {
        e.preventDefault();

        if (horariosEntries.length < 1 || !horariosEntries.every(([f, hs]) => hs.length >= 1))
            return toast('Debes agregar al menos un horario', {type: 'error'});

        ClubService.publish(user.id, {
            nombre,
            direccion,
            urlImagen,
            capacidad: parseInt(capacidad),
            precio: parseFloat(precio),
            deporte,
            horariosDisponibles: horarios,
        })
            .then(res => {
                navigate('/club/' + user.id);
                console.log(res.data);
                toast('Cancha publicada con exito', {type: 'success'});
            })
            .catch(err => toast('Error al publicar cancha', {type: 'error'}));

        reset();
        setHorarios({});
        setDate('');
    };

    const addHour = () => {
        if (!date) return toast('Debes seleccionar una fecha', {type: 'error'});

        if (new Date(`${date}T${hora}:00`).getTime() < new Date().getTime())
            return toast('No se puede seleccionar fechas anteriores a hoy', {
                type: 'error',
            });

        const horariosDeFecha = horarios[date];

        if (!horariosDeFecha) {
            setHorarios({...horarios, [date]: [{hora, disponible: true}]});
            return;
        }

        if (horariosDeFecha.find(h => h.hora === hora))
            return toast('Ese horario ya esta elegido', {type: 'error'});

        const newHour = horariosDeFecha
            ? horariosDeFecha.concat({hora, disponible: true})
            : [{hora, disponible: true}];

        setHorarios({
            ...horarios,
            [date]: newHour,
        });
    };

    return (
        <Layout>
            <Header/>
            <Container p={4} my={4} borderRadius={5} bgColor="brand.200" maxW="md">
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <Heading>Publica tu cancha</Heading>
                        <FormControl>
                            <FormLabel htmlFor="nombre">Nombre:</FormLabel>
                            <Input
                                value={nombre}
                                onChange={e => handleChange(e, e.target.value.length < 2)}
                                type="text"
                                name="nombre"
                                id="nombre"
                            />
                            {errors.nombre && (
                                <FormHelperText color="red">Nombre invalido</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor="urlImagen">Url imagen:</FormLabel>
                            <Input
                                name="urlImagen"
                                type="url"
                                id="urlImagen"
                                value={urlImagen}
                                onChange={e => handleChange(e, !validateUrl(e.target.value))}
                                width="100%"
                            />
                            {errors.urlImagen && urlImagen.length > 0 && (
                                <FormHelperText color="red">La URL provista es inválida</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="direccion">Dirección:</FormLabel>
                            <Input
                                value={direccion}
                                onChange={e => handleChange(e, e.target.value.length < 2)}
                                type="text"
                                name="direccion"
                                id="direccion"
                            />
                            {errors.direccion && (
                                <FormHelperText color="red">Direccion invalida</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="capacidad">Capacidad:</FormLabel>
                            <NumberInput
                                value={capacidad}
                                name="capacidad"
                                id="capacidad"
                                onChange={v =>
                                    handleChangeInCustomInput('capacidad', v, parseInt(v) < 0)
                                }
                                min={1}
                            >
                                <NumberInputField/>
                                <NumberInputStepper>
                                    <NumberIncrementStepper/>
                                    <NumberDecrementStepper/>
                                </NumberInputStepper>
                            </NumberInput>
                            {errors.capacidad && (
                                <FormHelperText color="red">Capacidad invalida</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="precio">Precio:</FormLabel>
                            <NumberInput
                                value={precio}
                                name="precio"
                                id="precio"
                                min={1}
                                onChange={v =>
                                    handleChangeInCustomInput('precio', v, parseInt(v) < 0)
                                }
                            >
                                <NumberInputField/>
                                <NumberInputStepper>
                                    <NumberIncrementStepper/>
                                    <NumberDecrementStepper/>
                                </NumberInputStepper>
                            </NumberInput>
                            {errors.precio && (
                                <FormHelperText color="red">Precio invalido</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="deporte">Deporte:</FormLabel>
                            <Select
                                name="deporte"
                                id="deporte"
                                value={deporte}
                                onChange={e => handleChange(e, e.target.value === '')}
                            >
                                <option value="">Selecciona un deporte</option>
                                {deportes.map(d => (
                                    <option key={d} value={d}>
                                        {d.toLowerCase().replace(/_/, ' ')}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <VStack w="full" spacing={2} alignItems={'flex-start'}>
                            <Flex w="full">
                                <FormControl>
                                    <FormLabel htmlFor="date">Fecha:</FormLabel>
                                    <Input
                                        type="date"
                                        name="date"
                                        id="date"
                                        value={date}
                                        onChange={e => setDate(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl flexShrink={1}>
                                    <FormLabel htmlFor="hora">Hora:</FormLabel>
                                    <Input
                                        onChange={e => handleChange(e)}
                                        type="time"
                                        name="hora"
                                        id="hora"
                                        value={hora}
                                    />
                                </FormControl>
                            </Flex>
                            <Button
                                alignSelf={'center'}
                                colorScheme="green"
                                variant="link"
                                type="button"
                                onClick={addHour}
                            >
                                Agregar hora
                            </Button>
                        </VStack>

                        <VStack w="full" alignItems={'flex-start'}>
                            <Heading size="md">Horarios seleccionados:</Heading>
                            <VStack w="full" spacing={2}>
                                {horariosEntries.length === 0 && (
                                    <Text alignSelf={'flex-start'}>
                                        No hay horarios seleccionados
                                    </Text>
                                )}
                                {horariosEntries.map(([dateKey, hours]) => {
                                    if (hours.length === 0) return null;

                                    return (
                                        <Flex w="full" key={dateKey}>
                                            <Text fontWeight="bold">{dateKey}</Text> :
                                            <Flex flexWrap={'wrap'} gap={1}>
                                                {hours
                                                    .map(h => h.hora)
                                                    .map(h => (
                                                        <Tag
                                                            size={'sm'}
                                                            key={h}
                                                            mt={1}
                                                            variant="solid"
                                                            colorScheme="brand"
                                                        >
                                                            <TagLeftIcon
                                                                onClick={() =>
                                                                    setHorarios({
                                                                        ...horarios,
                                                                        [dateKey]: hours.filter(
                                                                            hh => hh.hora !== h
                                                                        ),
                                                                    })
                                                                }
                                                                boxSize="15px"
                                                                as={AiFillCloseCircle}
                                                            />
                                                            <TagLabel>{h}</TagLabel>
                                                        </Tag>
                                                    ))}
                                            </Flex>
                                        </Flex>
                                    );
                                })}
                            </VStack>
                        </VStack>

                        <Button
                            isDisabled={disableSubmit}
                            w="full"
                            colorScheme="green"
                            type="submit"
                        >
                            Publicar
                        </Button>
                    </VStack>
                </form>
            </Container>
        </Layout>
    );
};

export default Publish;
