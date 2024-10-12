import './navbar.css';
import { useContext } from "react";
import { SearchContext } from '../context/SearchContext';
import backImage from '../assets/images/back.png';
import searchImage from '../assets/images/search.png'

const Navbar = ({ movies, handleSetFilteredMovies }) => {
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
        handleSetFilteredMovies(movies.filter((movie) => {
            return movie.name.toLowerCase().includes(searchTerm.toLowerCase())
        }))
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    return (
        <nav className="navbar">
            <button className="nav-button back-button" onClick={handleBack}>
                <img src={backImage} alt='back'></img>
            </button>
            <form className='form'>
                <input
                    type="text"
                    placeholder=""
                    className="search-input"
                    value={searchTerm}
                    onChange={handleChange} // Update search term on input change
                    minLength={3}
                />
                <button type='submit' className="nav-button search-button" onClick={handleSearch}><img src={searchImage} alt='search'></img></button>
            </form>

        </nav>
    );
}

export default Navbar;