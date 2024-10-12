import MovieCard from "./MovieCard";
import { useContext, useMemo } from 'react';
import { SearchContext } from '../../../context/SearchContext';
import Grid from '@mui/material/Grid2';
import { Typography } from "@mui/material";


const MoviesContainer = ({ movies }) => {

    const { searchTerm } = useContext(SearchContext);
    const filteredMovies = useMemo(() => movies.filter((movie) => {
        return movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    }), [movies, searchTerm])

    return (
        <Grid container rowSpacing={8} spacing={2} marginX={5}>
        {movies.length === 0 ? (  
            <Grid xs={12}>  
                <Typography variant="h6" align="center" justifyContent="center">
                    No movies found. Please try again later.
                </Typography>
            </Grid>
        ) : (
            movies.map((movie, index) => (
                <Grid size={{ xs: 4, lg: 2 }} key={`${movie.title}-${index}`}>
                    <MovieCard name={movie.name} posterImage={movie['poster-image']} />
                </Grid>
            ))
        )}
    </Grid>
    );
}

export default MoviesContainer;