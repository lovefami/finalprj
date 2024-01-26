import React from 'react';
import {Box, Flex, Text, Button, useColorMode} from '@chakra-ui/react';
import  {Link} from 'react-router-dom';

const Header: React.FC = () => {
    const { colorMode, toggleColorMode } = useColorMode();  //light and dark mode

    return(
        <Box bg = {colorMode === 'light' ? 'gray.100' : 'gray.600'} px = {4}>
            <Flex h={16} alignItems = {'center'} justifyContent = {'space-between '}>
                <Box>Logo</Box>
                <Flex alignItems = {'center'}>
                    <Text p={4}>
                        <Link to="/">Home</Link>
                    </Text>
                    <Text p={4}>
                        <Link to ="/about">About</Link>
                    </Text>
                    <button onClick = {toggleColorMode}>
                        Toggle{colorMode === 'light'?'Dark' : 'Light'}
                    </button>
                </Flex>
            </Flex>
        </Box>
    );
};
export default Header;