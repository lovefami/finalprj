import { useState, useEffect } from 'react';
import { getPopularMovie, getTrendingMovies, getNowPlaying } from '../api/tmdb'; 

export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    genre_ids: number[];
    genres: string[];
}

export const useMoviesList = (category: string) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
        setLoading(true);
        try {
            let data;
            switch (category) {
            case 'popular':
                data = await getPopularMovie();
                break;
            case 'discover':
                data = await getTrendingMovies('week');
                break;
            case 'change':
                data = await getNowPlaying();
                break;
            default:
                data = [];
            }
            setMovies(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
        };  

    fetchMovies();
}, [category]);
return { movies, loading, error };
};
