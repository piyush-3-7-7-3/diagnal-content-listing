import MovieCard from "./MovieCard";
import { useContext, useMemo } from 'react';
import { SearchContext } from '../../../context/SearchContext';
import Grid from '@mui/material/Grid2';


const MoviesContainer = ({ movies }) => {

    const { searchTerm } = useContext(SearchContext);
    const filteredMovies = useMemo(() => movies.filter((movie) => {
        return movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    }), [movies, searchTerm])

    return (
        <Grid container rowSpacing={10} spacing={5} marginX={5}>
            {movies.map((movie, index) => {
                return <Grid size={{ xs: 4, lg: 2 }} key={`${movie.title}-${index}`}>
                    <MovieCard name={movie.name} posterImage={movie['poster-image']} />
                </Grid>
            })}
        </Grid>
    );
}

export default MoviesContainer;