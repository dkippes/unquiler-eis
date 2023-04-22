import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const PasswordInput = ({ value, onChange, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <InputGroup>
      <Input
        type={showPassword ? 'text' : 'password'}
        id="password"
        value={value}
        onChange={onChange}
        width="100%"
        name={name}
      />
      <InputRightElement>
        <IconButton
          variant="link"
          onClick={toggleShowPassword}
          icon={
            <Icon
              fontSize={'2xl'}
              as={showPassword ? AiFillEyeInvisible : AiFillEye}
            />
          }
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;
