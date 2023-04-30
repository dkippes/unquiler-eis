import {
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React from 'react';
import { validateEmail } from '../../utils';
import PasswordInput from '../../components/PasswordInput';

const ClientSignInForm = ({
  values,
  errors,
  onChange,
  onSubmit,
  submitBtnText = 'Continuar',
}) => {
  const { email, password, confirmPassword } = values;
  const disabledSubmitting =
    errors.email ||
    errors.password ||
    errors.confirmPassword ||
    !email.length ||
    !password.length ||
    (confirmPassword !== undefined && !confirmPassword.length);

  return (
    <form onSubmit={onSubmit}>
      <FormControl isRequired>
        <FormLabel htmlFor="email">Email:</FormLabel>
        <Input
          name="email"
          type="email"
          id="email"
          value={email}
          onChange={e => onChange(e, !validateEmail(e.target.value))}
          width="100%"
        />
        {errors.email && email.length > 0 && (
          <FormHelperText color="red">Ingresa un correo válido</FormHelperText>
        )}
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="nombreClub">Nombre Club:</FormLabel>
        <Input
            name="nombreClub"
            type="text"
            id="nombreClub"
            value={email}
            onChange={e => onChange(e, !validateEmail(e.target.value))}
            width="100%"
        />
        {errors.email && email.length > 0 && (
            <FormHelperText color="red">Ingresa un correo válido</FormHelperText>
        )}
      </FormControl>
      <FormControl isRequired mt="4">
        <FormLabel htmlFor="password">Contraseña:</FormLabel>
        <PasswordInput
          name="password"
          value={password}
          onChange={e => onChange(e, e.target.value.length < 6)}
        />
        {errors.password && password.length > 0 && (
          <FormHelperText color="red">
            La contraseña debe tener al menos 6 caracteres
          </FormHelperText>
        )}
      </FormControl>
      {confirmPassword !== undefined && (
        <FormControl isRequired mt="4">
          <FormLabel htmlFor="confirm-password">
            Confirmar contraseña:
          </FormLabel>
          <PasswordInput
            value={confirmPassword}
            onChange={e => onChange(e, e.target.value !== password)}
            name="confirmPassword"
          />
          {errors.confirmPassword && confirmPassword.length > 0 && (
            <FormHelperText color="red">
              Las contraseñas no coinciden
            </FormHelperText>
          )}
        </FormControl>
      )}
      <ButtonGroup mt="4" width="100%">
        <Button
          type="submit"
          width="100%"
          backgroundColor="#E74646"
          _hover={{ background: '#FA9884' }}
          isDisabled={disabledSubmitting}
        >
          {disabledSubmitting ? 'Complete los datos' : submitBtnText}
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default ClientSignInForm;
