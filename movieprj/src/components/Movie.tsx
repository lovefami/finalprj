import React from "react";
import { useTmdb } from "../hooks/useTmdb";
import Card from "../components/Card";

interface MovieProps {
  movieId: string;
}

interface MovieData {
  title: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
}

const Movie: React.FC<MovieProps> = ({ movieId }) => {
  const { data, loading, error } = useTmdb<MovieData>(movieId);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Movie not found</div>;
  }

  return (
    <div>
      <Card
        title={data.title}
        imageUrl={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        vote_average={data.vote_average}
        genre_ids={data.genre_ids}
      />
    </div>
  );
};

export default Movie;
