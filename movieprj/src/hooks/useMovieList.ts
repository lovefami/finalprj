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

export const useMoviesList = (category: string, page: number) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [totalPages,setTotalPages] = useState<number>(0);

    useEffect(() => {
        const fetchMovies = async () => {
        setLoading(true);
        try {
            let data;
            
            switch (category) {
            case 'popular':
                data = await getPopularMovie(page);
                break;
            case 'discover':
                data = await getTrendingMovies('week',page);
                break;
            case 'change':
                data = await getNowPlaying(page);
                break;
            default:
                data = [];
            }
            setMovies(data);
            setTotalPages(data.total_pages || 0)
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
        };  

    fetchMovies();
}, [category,page]);
return { movies, totalPages:totalPages,loading, error };
};
