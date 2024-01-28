import axios from 'axios';

// get api key and token

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BEARER_TOKEN = process.env.REACT_APP_TMDB_BEARER_TOKEN;

// create axios

const tmdbApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json;charset=utf-8',
    },
});

// fetch movie
export const getMovie = async (movieId: string) => {
    const response = await tmdbApi.get(`/movie/${movieId}?api_key=${API_KEY}`);
    return response.data;
};

// 可以在此处添加更多与 TMDB API 的交互函数
