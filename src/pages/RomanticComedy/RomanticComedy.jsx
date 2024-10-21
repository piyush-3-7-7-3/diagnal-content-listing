// Import necessary components and hooks
import MoviesContainer from "./Components/MoviesContainer";
import { useState, useEffect, useContext } from 'react';

// Import services and utilities
import fetchRomanticComedies from "../../services/fetchRomanticComedies";
import hasMoreItems from "../../utils/hasMoreItems";

// Import context for search functionality
import { SearchContext } from "../../context/SearchContext";

// Import loading component
import Shimmer from "../../components/ui/Shimmer";

// Define the RomanticComedy component
const RomanticComedy = ({ handleSetMovies, filteredMovies, handleSetFilteredMovies }) => {

    const [loading, setLoading] = useState(false); // State to manage loading status
    const [page, setPage] = useState(1); // State to track current page
    const [hasMore, setHasMore] = useState(true); // State to check if more items are available
    const { searchTerm } = useContext(SearchContext); // Access search term from context

    // Fetch movies when the component mounts or when page/hasMore changes
    useEffect(() => {
        const getMovies = async () => {
            if (hasMore) {
                setLoading(true); // Set loading to true
                try {
                    const response = await fetchRomanticComedies(page); // Fetch movies from API
                    const content = response.page['content-items'].content; // Get movie content

                    // Extract total content items and page size returned from the response
                    const totalContentItems = parseInt(response.page["total-content-items"], 10);
                    const pageSizeRequested = parseInt(response.page["page-size-requested"], 10);

                    // Call the utility function to check if there are more items
                    const moreItems = hasMoreItems(totalContentItems, pageSizeRequested, page);
                    setHasMore(moreItems); // Update hasMore state

                    handleSetMovies((prev) => [...prev, ...content]); // Update movies state

                    // Filter movies based on search term if it exists
                    if (searchTerm !== "") {
                        let filteredContent = content.filter((movie) => {
                            return movie.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filter logic
                        });
                        handleSetFilteredMovies((prev) => [...prev, ...filteredContent]); // Update filtered movies state
                    } else {
                        handleSetFilteredMovies((prev) => [...prev, ...content]); // Update filtered movies state if no search term
                    }

                } catch (err) {
                    // TODO ADD LOGGER IN FUTURE ITERATIONS
                    console.log(err);
                } finally {
                    setLoading(false); // Set loading to false after fetching
                }
            } else {
                setLoading(false); // Set loading to false if no more items
            }
        };
        getMovies(); // Call the fetch function
    }, [page, hasMore]); // Run effect when page or hasMore changes

    // Handle infinite scrolling
    const handleInfiniteScroll = () => {
        try {
            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                setLoading(true); // Set loading to true
                setPage((prev) => prev + 1); // Increment page number
            }
        } catch (err) {
            // TODO ADD LOGGER IN FUTURE ITERATIONS
            // Handle any potential errors 
            console.log(err)
        }
    }

    // Use effect for scroll event with debounce
    useEffect(() => {
        // Use a debounce technique for better performance
        const debounceScroll = () => {
            let timeout;
            return () => {
                if (timeout) clearTimeout(timeout); // Clear previous timeout
                timeout = setTimeout(handleInfiniteScroll, 200); // 200ms debounce
            };
        };

        const handleScroll = debounceScroll(); // Create debounced scroll handler

        window.addEventListener("scroll", handleScroll); // Add scroll event listener
        return () => window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
    }, [loading]); // Re-run effect when loading changes


    return (
        <>
            {!loading ? (
                // Render movie content when not loading
                <div className="romantic-movie-container">
                    <MoviesContainer filteredMovies={filteredMovies} /> {/* Render MoviesContainer with filtered movies */}
                </div>
            ) : (
                <Shimmer /> // Show loading animation while fetching
            )}
        </>
    );
};

// Export the RomanticComedy component
export default RomanticComedy;
