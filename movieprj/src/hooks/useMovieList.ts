// src/hooks/useMoviesList.ts
import { useState, useEffect } from 'react';
import { getPopularMovie, discoverMovies, getNowPlaying } from '../api/tmdb'; 

export const useMoviesList = (catagory: string) => { 
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
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
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [catagory]);

    return { movies, loading, error };
};
