import { useEffect, useState } from "react";

import { api } from "../services/api";
import { MovieCard } from "../components/MovieCard";

import "../styles/content.scss";

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

type ContentProps = {
  idMovie: number;
  genreTitle: string;
};

export function Content({ idMovie, genreTitle }: ContentProps) {
  // Complete aqui
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${idMovie}`).then((response) => {
      setMovies(response.data);
    });
  }, [idMovie]);

  return (
    <>
      <div className="container">
        <header>
          <span className="category">
            Categoria:<span> {genreTitle}</span>
          </span>
        </header>
      </div>
      <div className="movies-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            poster={movie.Poster}
            runtime={movie.Runtime}
            rating={movie.Ratings[0].Value}
          />
        ))}
      </div>
    </>
  );
}
