// // src/hooks/useMoviesList.ts
// import { useState, useEffect } from 'react';
// import { getPopularMovie, discoverMovies, getNowPlaying } from '../api/tmdb'; 


// export interface Movie{
//     movieId: string;
//     title:string;
//     poster_path:string;
//     vote_average:number;
//     genre_ids: number[]
// }
// export const useMoviesList = (catagory: string) => { 
//     const [movies, setMovies] = useState<Movie[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<Error | null>(null);

//     useEffect(() => {
//         const fetchMovies = async ():Promise<void> => {
//             try {
//                 let data;
//                 switch (catagory) {
//                     case 'popular':
//                         data = await getPopularMovie();
//                         break;
//                     case 'discover':
//                         data = await discoverMovies({ 'sort_by': 'popularity.desc' });
//                         break;
//                     case 'change':
//                         data = await getNowPlaying();
//                         break;

//                     default:
//                         data = [];
//                 }

//                 const fetchedMovies = data.map((movie:Movie)=>({
//                     movieId: movie.movieId,
//                     title: movie.title,
//                     poster_path: movie.poster_path,
//                     vote_average: movie.vote_average,
//                     genre_ids: movie.genre_ids,
//                 }));
//                 setMovies(fetchedMovies);
//             } catch (err) {
//                 setError(err as Error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMovies();
//     }, [catagory]);

//     return { movies, loading, error };
// };
