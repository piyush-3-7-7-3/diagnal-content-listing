import './navbar.css';
import { useContext, useState, useEffect } from "react";
import { SearchContext } from '../context/SearchContext';
import backImage from '../assets/images/back.png';
import searchImage from '../assets/images/search.png';
import closeImage from '../assets/images/close.png';
import navbarImage from '../assets/images/navbar.png';
import Grid from '@mui/material/Grid2';
import { IconButton, Box, Typography } from '@mui/material';

const Navbar = ({ movies, handleSetFilteredMovies }) => {
    const [searchBool, setSearchBool] = useState(false);
    const [isNavbarActive, setIsNavbarActive] = useState(true);
    const { searchTerm, setSearchTerm } = useContext(SearchContext);

    // Handle scroll event using useEffect to avoid multiple event listeners
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsNavbarActive(false);  // Hide navbar when scrolling down
            } else {
                setIsNavbarActive(true);   // Show navbar when scrolling back up
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove the event listener when the component is unmounted
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array ensures it runs once when the component mounts


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
        <>
            {/* Navbar */}
            <nav className={`${isNavbarActive ? '' : 'hidden'}`} style={{ display: 'flex' }}>
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
                    <Typography variant="h5"> {/* Adjust the variant as needed */}
                        Romantic Comedy
                    </Typography>
                </Box>
                <form className='form' onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-input"
                        value={searchTerm}
                        onChange={handleChange}
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

export default Navbar;