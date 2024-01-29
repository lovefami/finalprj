import axios from 'axios';
import apiClient,{API_KEY, BEARER_TOKEN} from '../service/api_client';
// get api key and token


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

// 获取热门电影
export const getPopularMovie = async () => {
    const response = await apiClient.get("/movie/popular");
    return response.data.results;
};


export const discoverMovies = async (params: Record<string, any>) => {
    const apiKey = API_KEY as string;
    const query = new URLSearchParams({ ...params, 'api_key': apiKey }).toString();
    const response = await tmdbApi.get(`/discover/movie?${query}`);
    return response.data.results;
}

export const getNowPlaying = async () => { 
    try {
        const startDate = getStartDate();
        const response = await tmdbApi.get('/movie/now_playing', {
            params: {
                start_date: startDate.toISOString().split('T')[0],
            },
        });
        return response.data.results;
    } catch (error) {
        throw error;
    }
};

    const getStartDate =() =>{
        const currentDate = new Date();
        const pass24Hours = 24 * 60 * 60 * 1000;
        const startDate = new Date(currentDate.getTime() + pass24Hours)
        return startDate;
    };
