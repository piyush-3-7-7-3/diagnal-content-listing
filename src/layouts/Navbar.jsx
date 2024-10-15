// Import CSS styles for the navbar
import './navbar.css';

// Import React hooks
import { useContext, useState, useEffect } from "react";

// Import context for search functionality
import { SearchContext } from '../context/SearchContext';

// Import images for the navbar
import backImage from '../assets/images/back.png';
import searchImage from '../assets/images/search.png';
import closeImage from '../assets/images/close.png';
import navbarImage from '../assets/images/navbar.png';

// Import component for navbar
import NavbarTitle from '../components/ui/NavbarTitle';
import Suggestion from '../components/ui/Suggestion';

// Import Material-UI components
import { IconButton } from '@mui/material';

// Define the Navbar component
const Navbar = ({ movies, handleSetFilteredMovies, title }) => {
    const [searchBool, setSearchBool] = useState(false); // State to manage search input visibility
    const [isNavbarActive, setIsNavbarActive] = useState(true); // State to manage navbar visibility
    const { searchTerm, setSearchTerm } = useContext(SearchContext); // Access search context
    const [suggestions, setSuggestions] = useState([]); // State to hold autocomplete suggestions
    const [showSuggestions, setShowSuggestions] = useState(false); // State to toggle suggestion list visibility

    // Handle scroll event using useEffect to avoid multiple event listeners
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsNavbarActive(false);  // Hide navbar when scrolling down
            } else {
                setIsNavbarActive(true);   // Show navbar when scrolling back up
            }
        };

        window.addEventListener('scroll', handleScroll); // Add scroll event listener

        // Cleanup function to remove the event listener when the component is unmounted
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array ensures it runs once when the component mounts

    // Handle back navigation
    const handleBack = () => {
        window.history.back(); // Go back to the previous page
    };

    // Handle search form submission
    const handleSearch = (event) => {
        event.preventDefault();
        if (searchTerm.length < 3 || searchTerm.length > 15) {
            alert('Please enter between 3 and 15 characters to search.'); // Alert if search term is invalid
            return;
        }
        setSearchBool(true); // Show close button

        setShowSuggestions(false); // Hide suggestions when search is submitted
        handleSetFilteredMovies(movies.filter((movie) => {
            return movie.name.toLowerCase().includes(searchTerm.toLowerCase()); // Filter movies based on search term
        }));
    };

    // Handle closing the search input
    const handleClose = (event) => {
        event.preventDefault();
        setSearchTerm(""); // Clear search term
        setSearchBool(false); // Hide close button
        setSuggestions([]); // Clear suggestions
        handleSetFilteredMovies(movies); // Reset filtered movies to original
    };

    // Handle changes in the search input
    const handleChange = (event) => {
        const input = event.target.value;
        setSearchTerm(input); // Update search term state

        if (input.length === 0) {
            setSearchBool(false); // Hide close button
            setSuggestions([]); // Clear suggestions
            handleSetFilteredMovies(movies); // Reset filtered movies to original
        }

        // Filter suggestions based on search input
        if (input.length >= 1) {
            const filteredSuggestions = movies
                .filter((movie) => movie.name.toLowerCase().includes(input.toLowerCase()))
                .slice(0, 5); // Limit to top 5 suggestions

            setSuggestions(filteredSuggestions); // Update suggestions
            setShowSuggestions(true); // Show suggestions
        } else {
            setSuggestions([]); // Clear suggestions if input is less than 3 characters
            setShowSuggestions(false); // Hide suggestions
        }
    };

    // Handle selecting a suggestion
    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.name); // Set search term to the selected suggestion
        setShowSuggestions(false); // Hide suggestions
        handleSetFilteredMovies(movies.filter((movie) => {
            return movie.name.toLowerCase().includes(searchTerm.toLowerCase()); // Filter movies based on search term
        }));
        setSearchBool(true);
    };

    return (
        <>
            {/* Navbar */}
            <nav className={`navbar ${isNavbarActive ? '' : 'hidden'}`} style={{ display: 'flex' }}>
                <IconButton className="nav-button back-button" onClick={handleBack}>
                    <img
                        src={backImage}
                        alt='back'
                        style={{ width: '30px', height: '30px' }} // Adjust the size as needed
                    />
                </IconButton>
                <NavbarTitle title={title} />
                <form className='form' onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-input"
                        value={searchTerm}
                        onChange={handleChange} // Update search term on input change
                    />
                    {!searchBool && (
                        <IconButton type='submit' className="nav-button search-button">
                            <img
                                src={searchImage}
                                alt='search'
                                style={{ width: '30px', height: '30px' }} // Adjust the size as needed
                            />
                        </IconButton>
                    )}
                    {searchBool && (
                        <IconButton type='button' className="nav-button search-button" onClick={handleClose}>
                            <img
                                src={closeImage}
                                alt='close'
                                style={{ width: '30px', height: '30px' }} // Adjust the size as needed
                            />
                        </IconButton>
                    )}
                </form>
            </nav>

            {/* Autocomplete Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <Suggestion suggestions={suggestions} handleSuggestionClick={handleSuggestionClick} />
            )}

            {/* Scroll Placeholder */}
            <div className={`scroll-placeholder ${!isNavbarActive ? 'visible' : ''}`}>
                {/* You can display an image or another element here */}
                <img src={navbarImage} alt="Scroll Placeholder" />
            </div>
        </>
    );
};

// Export the Navbar component
export default Navbar;
