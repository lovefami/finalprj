import React, { useState } from 'react';
import {Box,SimpleGrid,Heading,Flex,Select,} from '@chakra-ui/react';
import { useContent } from '../hooks/useContent'; // Update the path as necessary
import { selectionFilter } from '../utils/selection-filters'; 
import Card from '../components/Card'; 

export interface SlideItem {
    id: number;
    title: string;
    imageUrl: string;
}

interface Slides {
    [genre: string]: SlideItem[];
}

const BrowseContainer: React.FC = () => {
    const { films } = useContent('films');
    const { series } = useContent('series');
    const [selectedGenre, setSelectedGenre] = useState<string>('all');
    const slides: Slides = selectionFilter({ series, films });

    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGenre(event.target.value);
    };

return (
    <Box>
        <Flex justify="space-between" align="center" p="4">
        <Heading as="h2" size="xl">Movies</Heading>
        <Select onChange={handleGenreChange} placeholder="Genres">
            {/* Generate options based on available genres */}
        </Select>
        </Flex>
        <SimpleGrid columns={[2, null, 5]} spacing="5">
        {slides[selectedGenre]?.map((movie: SlideItem) => (
            <Card key={movie.id} title={movie.title} imageUrl={movie.imageUrl} />
        ))}
        </SimpleGrid>
    </Box>
    );
};

export default BrowseContainer;
