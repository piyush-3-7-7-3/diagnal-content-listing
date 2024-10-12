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

// Import Material-UI components
import { IconButton, Box, Typography } from '@mui/material';

// Define the Navbar component
const Navbar = ({ movies, handleSetFilteredMovies }) => {
    const [searchBool, setSearchBool] = useState(false); // State to manage search input visibility
    const [isNavbarActive, setIsNavbarActive] = useState(true); // State to manage navbar visibility
    const { searchTerm, setSearchTerm } = useContext(SearchContext); // Access search context

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
        if (searchTerm.length < 3 || searchTerm.length > 10) {
            alert('Please enter between 3 and 10 characters to search.'); // Alert if search term is invalid
            return;
        }
        setSearchBool(true); // Show close button
        handleSetFilteredMovies(movies.filter((movie) => {
            return movie.name.toLowerCase().includes(searchTerm.toLowerCase()); // Filter movies based on search term
        }));
    };

    // Handle closing the search input
    const handleClose = (event) => {
        event.preventDefault();
        setSearchTerm(""); // Clear search term
        setSearchBool(false); // Hide close button
        handleSetFilteredMovies(movies); // Reset filtered movies to original
    };

    // Handle changes in the search input
    const handleChange = (event) => {
        setSearchTerm(event.target.value); // Update search term state
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
                <Box
                    className="page-title"
                    sx={{
                        flexGrow: 1, // Allow the Box to grow
                        flexShrink: 0, // Prevent shrinking
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Typography sx={{
                        fontSize: {
                            xs: '0.7rem',
                            sm: '1rem',
                            md: '1.2rem',
                            lg: '1.4rem'
                        },
                        width: '100%'
                    }}> {/* Adjust the variant as needed */}
                        Romantic Comedy
                    </Typography>
                </Box>
                <form className='form' onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-input"
                        value={searchTerm}
                        onChange={handleChange} // Update search term on input change
                        minLength={3}
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

            {/* Scroll Placeholder */}
            <div className={`scroll-placeholder ${!isNavbarActive ? 'visible' : ''}`}>
                {/* You can display an image or another element here */}
                <img src={navbarImage} alt="Scroll Placeholder" />
            </div>
        </>
    );
}

// Export the Navbar component
export default Navbar;
