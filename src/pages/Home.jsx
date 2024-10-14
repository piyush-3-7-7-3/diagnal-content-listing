// Import React hooks
import { useState } from "react";

// Import context provider
import { SearchProvider } from "../context/SearchContext";

// Import layout components
import Navbar from "../layouts/Navbar";

// Import pages/components
import RomanticComedy from "./RomanticComedy/RomanticComedy";

// Define the Home component
const Home = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    return (
        <SearchProvider>
            <Navbar movies={movies} handleSetFilteredMovies={setFilteredMovies} title="Romantic Comedy"/>
            <RomanticComedy handleSetMovies={setMovies} filteredMovies={filteredMovies} handleSetFilteredMovies={setFilteredMovies}/>
        </SearchProvider>
    );
};

// Export the Home component
export default Home;
