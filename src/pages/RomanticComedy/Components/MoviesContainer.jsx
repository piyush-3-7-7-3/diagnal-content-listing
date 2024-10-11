import './movieContainer.css';
import MovieCard from "./MovieCard";
import { useContext, useMemo } from 'react';
import { SearchContext } from '../../../context/SearchContext';

const MoviesContainer = ({ movies }) => {

    const { searchTerm } = useContext(SearchContext);
    const filteredMovies = useMemo(() => movies.filter((movie) => {
        return movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    }), [movies, searchTerm])

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