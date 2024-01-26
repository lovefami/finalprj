import React from 'react';
import { Box, Image } from '@chakra-ui/react';

// Define the props using an interface
export interface CardProps {
    title: string;
    imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, imageUrl }) => {
    return (
        <Box borderRadius="md" overflow="hidden">
        <Image src={imageUrl} alt={title} />
        </Box>
    );
};

export default Card;
