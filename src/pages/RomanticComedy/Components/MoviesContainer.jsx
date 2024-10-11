import './movieContainer.css';
import MovieCard from "./MovieCard";

const MoviesContainer = ({ movies }) => {

    return (
        <div className="movies-container">
            {movies.map((movie, index) => {
                return <div className='column' key={`${movie.title}-${index}`}>
                    <MovieCard name={movie.name} posterImage={movie['poster-image']} />
                </div>
            })}
        </div>
    );
}

export default MoviesContainer;