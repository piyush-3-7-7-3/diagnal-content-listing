import './navbar.css';
import { useContext, useState, useEffect } from "react";
import { SearchContext } from '../context/SearchContext';
import backImage from '../assets/images/back.png';
import searchImage from '../assets/images/search.png';
import closeImage from '../assets/images/close.png';
import navbarImage from '../assets/images/navbar.png';

const Navbar = ({ movies, handleSetFilteredMovies }) => {
    const [searchBool, setSearchBool] = useState(true);
    const [isNavbarActive, setIsNavbarActive] = useState(true);
    const { searchTerm, setSearchTerm } = useContext(SearchContext);

    // Handle scroll event using useEffect to avoid multiple event listeners
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsNavbarActive(false);  // Hide navbar when scrolling down
                console.log("HERE");
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
            <nav className={`navbar ${isNavbarActive ? '' : 'hidden'}`}>
                
                <button className="nav-button back-button" onClick={handleBack}>
                    <img src={backImage} alt='back' />
                </button>
                <form className='form' onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-input"
                        value={searchTerm}
                        onChange={handleChange} // Update search term on input change
                        minLength={3}
                    />
                    {!searchBool && (
                        <button type='submit' className="nav-button search-button">
                            <img src={searchImage} alt='search' />
                        </button>
                    )}
                    {searchBool && (
                        <button type='button' className="nav-button search-button" onClick={handleClose}>
                            <img src={closeImage} alt='close' />
                        </button>
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