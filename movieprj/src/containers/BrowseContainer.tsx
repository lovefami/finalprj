import React, { useState } from "react";
import { Box, SimpleGrid, Heading, Flex, Select } from "@chakra-ui/react";
import Card from '../components/Card/index';
import { useMoviesList, Movie } from "../hooks/useMovieList";
import { useMovieSearch } from "../hooks/useMovieSearch"; 
import SearchMovie from "../components/SearchMovie";
import {useAuth} from "../hooks/useAuth";
import ReactPaginate from "react-paginate";
import './BrowseContainer.css'

const BrowseContainer: React.FC = () => {
    const [category, setCategory] = useState<string>("popular");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(0);

    const { 
      movies: categoryMovies, 
      loading: categoryLoading,
      totalPages: totalCategoryPages // 使用正确的属性名
    } = useMoviesList(category, currentPage + 1);

    const { 
      movies: searchMovies, 
      loading: searchLoading, 
      totalPages: totalSearchPages // 使用正确的属性名
    } = useMovieSearch(searchQuery);

    const user = useAuth();

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(e.target.value);
      setSearchQuery(""); 
      setCurrentPage(0); // Reset to first page
    };
    
    const handleSearch = (query: string) => {
      setSearchQuery(query);
      setCurrentPage(0); // Reset to first page
    };

    const totalPages = searchQuery ? totalSearchPages : totalCategoryPages;
    
    const handlePageChange = (selectedPage: { selected: number }) => {
      setCurrentPage(selectedPage.selected);
    };

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
            <Card key={movie.id} {...movie} user={user}
              poster_path={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          ))}
        </SimpleGrid>
        <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            activeClassName={'active'}        
        />
      </Box>
    );
};

export default BrowseContainer;
