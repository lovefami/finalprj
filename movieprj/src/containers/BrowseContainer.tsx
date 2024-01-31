import React, { useState } from "react";
import { Box, SimpleGrid, Heading, Flex, Select } from "@chakra-ui/react";
import Card from '../components/Card/index';
import { useMoviesList, Movie } from "../hooks/useMovieList";
import { useMovieSearch } from "../hooks/useMovieSearch"; // 假设这是用于搜索的钩子
import SearchMovie from "../components/SearchMovie";

const BrowseContainer: React.FC = () => {
  const [category, setCategory] = useState<string>("popular");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { movies: categoryMovies, loading: categoryLoading } = useMoviesList(category);
  const { movies: searchMovies, loading: searchLoading } = useMovieSearch(searchQuery);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setSearchQuery(""); // 重置搜索查询
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // 根据是否有搜索查询来决定显示哪个电影列表
  const movies = searchQuery ? searchMovies : categoryMovies;
  const loading = searchQuery ? searchLoading : categoryLoading;

  return (
    <Box>
      <Flex justify="space-between" align="center" p="4">
        <Heading as="h2" size="xl">Movies</Heading>
        <Select value={category} onChange={handleCategoryChange}>
          <option value="popular">Popular Movies</option>
          <option value="discover">Discover Movies</option>
          <option value="change">New Movies</option>
        </Select>
      </Flex>
      <SearchMovie query={searchQuery} onSearch={handleSearch} />
      {loading && <Box>Loading...</Box>}
      <SimpleGrid columns={[2, null, 5]} spacing="5">
        {movies.map((movie: Movie) => (
          <Card key={movie.id} {...movie}
            poster_path={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default BrowseContainer;
