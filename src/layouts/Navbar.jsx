import './navbar.css';
import { useContext } from "react";
import { SearchContext } from '../context/SearchContext';
import backImage from '../assets/images/back.png';
import searchImage from '../assets/images/search.png'

const Navbar = () => {
    const { searchTerm, setSearchTerm } = useContext(SearchContext);

    const handleBack = () => {
        window.history.back(); // Go back to the previous page
    };

    const handleSearch = () => {
        alert(`Search term: ${searchTerm}`); // Placeholder for search functionality
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    return (
        <nav className="navbar">
            <button className="nav-button back-button" onClick={handleBack}>
                <img src={backImage} alt='back'></img>
            </button>
            <input
                type="text"
                placeholder=""
                className="search-input"
                value={searchTerm}
                onChange={handleChange} // Update search term on input change
            />
            <button className="nav-button search-button" onClick={handleSearch}><img src={searchImage} alt='search'></img></button>
        </nav>
    );
}

export default Navbar;