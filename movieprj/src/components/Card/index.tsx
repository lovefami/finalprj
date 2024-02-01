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
import { AuthType } from '../../components/Auth';
import Favorite from "../Favorite";

export interface CardProps {
    title: string;
    poster_path: string;
    vote_average: number;
    genre_ids: number[];
    genres?: string[];
    user: AuthType | null;
}

const MovieCard: React.FC<CardProps> = ({
    title,
    poster_path,
    vote_average,
    genre_ids,
    genres,
    user,
}) => {
    const [genreNames, setGenreNames] = useState<string[]>([]);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    
    useEffect(() => {
        const fetchGenreData = async () => {
            try {
                const names: string[] = await fetchGenreNames(genre_ids);
                setGenreNames(names);
            } catch (error) {
                console.error('Error fetching genre names:', error);
            }
        };
    
        fetchGenreData();
    }, [genre_ids]);

    const updateFavoriteStatus = (newStatus: boolean) => {
        setIsFavorite(newStatus);
    };

    return (
        <Card maxW="sm">
            <CardBody>
                <Image src={poster_path} alt={title} borderRadius="lg" />
                <Stack mt="6" spacing="3">
                    <Heading size="md" textAlign="center">
                        <span style={{ marginRight: '10px' }}>{title}</span>
                        <Favorite user={user} title={title} isFavorite={isFavorite} updateFavoriteStatus={updateFavoriteStatus} />
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
