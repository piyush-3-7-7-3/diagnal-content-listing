import './navbar.css';
import { useContext, useState } from "react";
import { SearchContext } from '../context/SearchContext';
import backImage from '../assets/images/back.png';
import searchImage from '../assets/images/search.png'
import closeImage from '../assets/images/close.png'

const Navbar = ({ movies, handleSetFilteredMovies }) => {
    const [ searchBool, setSearchBool ] = useState(true);
    const { searchTerm, setSearchTerm } = useContext(SearchContext);

    const handleBack = () => {
        window.history.back(); // Go back to the previous page
    };

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchTerm.length < 3 || searchTerm.length > 10) {
            alert('Please enter between 3 and 10 characters to search.');
            return;
        }
        setSearchBool(true);
        handleSetFilteredMovies(movies.filter((movie) => {
            return movie.name.toLowerCase().includes(searchTerm.toLowerCase())
        }))
    };

    const handleClose = (event) => {
        event.preventDefault();
        setSearchTerm("");
        setSearchBool(false);
        handleSetFilteredMovies(movies);
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    return (
        <nav className="navbar">
            <button className="nav-button back-button" onClick={handleBack}>
                <img src={backImage} alt='back'></img>
            </button>
            <form className='form' onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder=""
                    className="search-input"
                    value={searchTerm}
                    onChange={handleChange} // Update search term on input change
                    minLength={3}
                />
                {!searchBool && <button type='submit' className="nav-button search-button"><img src={searchImage} alt='search'></img></button>}
                {searchBool && <button type='button' className="nav-button search-button" onClick={handleClose}><img src={closeImage} alt='close'></img></button>}
            </form>

        </nav>
    );
}

export default Navbar;