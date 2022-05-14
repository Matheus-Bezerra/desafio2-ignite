import { MovieProps } from "../interface/moviesProps";
import { MovieCard } from "./MovieCard";

export function Content({movies}: {movies: MovieProps[]}) {
  return (
  <main>
    <div className="movies-list">
      {movies.map(movie => (
        <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
      ))}
    </div>
  </main>)
}