import { useState, useEffect } from 'react';
import { API_KEY } from '../service/api_client'; 

export interface Movie {
    movieId: string;
    title: string;
    poster_path: string;
}

export const useMovieSearch = (query: string, page: number = 1) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        let url;
        if (query) {
            // 
            url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`;
        } else {
            // default movielist
            url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const moviesData = data.results.map((movie: any) => ({
                    movieId: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                }));
                setMovies(moviesData || []);
            })
            .catch(err => {
                setError('An error occurred while fetching data');
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [query, page]);

    return { movies, loading, error };
};
