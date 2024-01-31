import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Heading,
    Stack,
    Divider,
    CardFooter,
    Image,
    Text,
  } from "@chakra-ui/react";

  import { fetchGenreNames } from "../../api/tmdb"; 


export interface CardProps {
  title: string;
  imageUrl: string;
  vote_average: number;
  genre_ids: number[];
  genres?: string[];
}

const MovieCard: React.FC<CardProps> = ({
  title,
  imageUrl,
  vote_average,
  genre_ids,
  genres,
}) => {
    const [genreNames, setGenreNames] = useState<string[]>([]);
    
    useEffect(() => {
        const fetchGenreData = async () => {
          try {
            const names = await fetchGenreNames(genre_ids);
            setGenreNames(names);
          } catch (error) {
            console.error('Error fetching genre names:', error);
          }
        };
    
        fetchGenreData();
      }, [genre_ids]);

  return (
    <Card maxW="sm">
      <CardBody>
        <Image src={imageUrl} alt={title} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md" textAlign="center">
            {title}
          </Heading>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Stack spacing="1" textAlign="center" width="100%">
        <Text fontSize="lg" as="b" color="orange.500">
            {vote_average !== undefined ? vote_average.toFixed(1) : "N/A"}/10
          </Text>
          <Text fontSize="md" color="gray.500">
            {genreNames.join(', ') ?? "Unknown Genres"}
          </Text>
        </Stack>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
