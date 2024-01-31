import React, { useState, useEffect } from "react";
import { Box, SimpleGrid, Heading, Flex, Select } from "@chakra-ui/react";
import Card from "../components/Card";
import {
  getPopularMovie,
  discoverMovies,
  getNowPlaying,
  getGenreList,
} from "../api/tmdb";
import SearchMovie from "../components/SearchMovie";
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
  genres: string[];
}

const BrowseContainer: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [catagory, setCatagory] = useState<string>("popular");
  const [genres, setGenres] = useState<Map<number, string>>(
    new Map<number, string>()
  );

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let data;
        switch (catagory) {
          case "popular":
            data = await getPopularMovie();
            break;
          case "discover":
            data = await discoverMovies({ sort_by: "popularity.desc" });
            break;

          case "change":
            data = await getNowPlaying();
            break;
          default:
            data = [];
        }

        const genreList = await getGenreList();

        const genreMap = new Map<number, string>(
          genreList.genres.map((genre: any) => [genre.id, genre.name])
        );

        const moviesWithGenres = data.map((movie: Movie) => ({
          ...movie,
          genres: movie.genre_ids.map((genreId) => genreMap.get(genreId)),
        }));

        setMovies(moviesWithGenres);
        setGenres(genreMap);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box>Error: {error.message}</Box>;

  return (
    <Box>
      <Flex justify="space-between" align="center" p="4">
        <Heading as="h2" size="xl">
          Movies
        </Heading>
        <Select value={catagory} onChange={(e) => setCatagory(e.target.value)}>
          <option value="popular">Popular Movies</option>
          <option value="discover">Discover Movies</option>
          <option value="change">New Movie</option>
        </Select>
      </Flex>
      <SearchMovie />
      <SimpleGrid columns={[2, null, 5]} spacing="5">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            title={movie.title}
            imageUrl={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            genres={movie.genres || []}
            genre_ids={movie.genre_ids}
            vote_average={movie.vote_average}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default BrowseContainer;
