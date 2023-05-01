import { Box } from '@chakra-ui/react';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <Box pb={2} minHeight={'100vh'} height={'full'} bgColor="brand.500">
      {children}
    </Box>
  );
};

export default Layout;
