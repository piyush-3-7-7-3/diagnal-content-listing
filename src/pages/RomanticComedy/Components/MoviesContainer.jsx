// Import necessary components and hooks
import MovieCard from "./MovieCard";

// Import Material UI components
import Grid from '@mui/material/Grid2';
import { Typography } from "@mui/material";

// Define the MoviesContainer component
const MoviesContainer = ({ movies }) => {

    
    return (
        <Grid container rowSpacing={8} spacing={2} marginX={5}>
            {movies.length === 0 ? (  // Check if there are no movies
                <Grid xs={12}>  
                    <Typography variant="h6" align="center" justifyContent="center">
                        No movies found. Please try again later.  {/* Message to display when no movies are found */}
                    </Typography>
                </Grid>
            ) : (
                movies.map((movie, index) => (  // Map over the movies array
                    <Grid size={{ xs: 4, lg: 2 }} key={`${movie.title}-${index}`}>
                        <MovieCard name={movie.name} posterImage={movie['poster-image']} /> {/* Render MovieCard for each movie */}
                    </Grid>
                ))
            )}
        </Grid>
    );
}

// Export the MoviesContainer component
export default MoviesContainer;
