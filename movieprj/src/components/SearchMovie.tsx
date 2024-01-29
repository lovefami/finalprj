// src/components/SearchMovie.tsx
import React, { useState, useEffect,useRef } from 'react';
import { useMovieSearch } from '../hooks/useMovieSearch';
import { Box, Input, SimpleGrid } from '@chakra-ui/react';
import Card from './Card';

const SearchMovie: React.FC = () => {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const { movies} = useMovieSearch(debouncedQuery);
    const inputRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        // setup timer
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        // time reset
        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    useEffect(() => {
        //allow focu stay in input 
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [movies]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };


    return (
        <Box>
            <Input
                type="text"
                placeholder="search movie"
                value={query}
                onChange={handleSearch}
                style={{ width: '100%', height: '40px', fontSize: '1em' }}
            />
            <SimpleGrid columns={[2, null, 5]} spacing="5">
                {movies.map((movie) => (
                    <Card
                        key={movie.movieId}
                        title={movie.title}
                        imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    />
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default SearchMovie;
