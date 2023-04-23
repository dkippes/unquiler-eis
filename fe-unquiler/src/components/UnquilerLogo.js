import React from 'react';
import { Image } from '@chakra-ui/react';
import Logo from '../static/unquiler-logo-edited.png';

const UnquilerLogo = ({ w = '60px', h = '60px' }) => {
  return (
    <Image objectFit={'contain'} w={w} h={h} src={Logo} alt="unquiler logo" />
  );
};

export default UnquilerLogo;
