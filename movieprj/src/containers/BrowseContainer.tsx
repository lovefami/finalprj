import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, Heading, Flex, Select } from '@chakra-ui/react';
import Card from '../components/Card';
import { getPopularMovie, discoverMovies, getNowPlaying} from '../api/tmdb'; 
import SearchMovie from '../components/SearchMovie';
export interface Movie {
    movieId: number;
    title: string;
    poster_path: string;

}

const BrowseContainer: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
    const [catagory, setCatagory] = useState<string>('popular');

    useEffect(() => {
        const fetchMovies = async () => {
        setLoading(true);
        try {
            let data;
            switch (catagory) {
            case 'popular':
                data = await getPopularMovie();
                break;
            case 'discover':
                data = await discoverMovies({ 'sort_by': 'popularity.desc' }); 
                break;

            case 'change':
                data = await getNowPlaying();
                break;
            default:
                data = [];
            }
            setMovies(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    fetchMovies();
}, [catagory]);

if (loading) return <Box>Loading...</Box>;
if (error) return <Box>Error: {error.message}</Box>;

return (
<Box>
<Flex justify="space-between" align="center" p="4">
    <Heading as="h2" size="xl">Movies</Heading>
    <Select value={catagory} onChange={(e) => setCatagory(e.target.value)}>
    <option value="popular">Popular Movies</option>
    <option value="discover">Discover Movies</option>
    <option value ="change">New Movie</option>
    </Select>
</Flex>
<SearchMovie />
<SimpleGrid columns={[2, null, 5]} spacing="5">
    {movies.map(movie => (
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

export default BrowseContainer;
