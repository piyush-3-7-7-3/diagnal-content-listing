import RomanticComedy from "./RomanticComedy/RomanticComedy";
import Navbar from "../layouts/Navbar";
import { SearchProvider } from "../context/SearchContext";
import { useState } from "react";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    return (
        <SearchProvider>
            <Navbar movies={movies} handleSetFilteredMovies={setFilteredMovies}/>
            <RomanticComedy handleSetMovies={setMovies} filteredMovies={filteredMovies} handleSetFilteredMovies={setFilteredMovies}/>
        </SearchProvider>
    );
};

export default Home;