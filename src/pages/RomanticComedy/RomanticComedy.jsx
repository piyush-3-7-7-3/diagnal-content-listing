import MoviesContainer from "./Components/MoviesContainer";
import { useState, useEffect } from 'react';
import fetchRomanticComedies from "../../services/fetchRomanticComedies";
import hasMoreItems from "../../utils/hasMoreItems";

const RomanticComedy = () => {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    
    useEffect(() => {
        const getMovies = async () => {
            if (hasMore) {
                setLoading(true);
                try {
                    const response = await fetchRomanticComedies(page);
                    const content = response.page['content-items'].content;
                    // Extract total content items and page size returned from the response
                    const totalContentItems = parseInt(response.page["total-content-items"], 10);
                    const pageSizeRequested = parseInt(response.page["page-size-requested"], 10);

                    // Call the utility function to check if there are more items
                    const moreItems = hasMoreItems(totalContentItems, pageSizeRequested, page);
                    setHasMore(moreItems);
                    setMovies((prev) => [...prev, ...content]);
                } catch (err) {
                    setError('Error in fetching movies');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }

        };
        getMovies();
    }, [page]);




    const handleInfiniteScroll = () => {
        try {
            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                setLoading(true);
                setPage((prev) => prev + 1);
            }
        }
        catch (err) {

        }
    }

    useEffect(() => {
        // Use a debounce technique for better performance
        const debounceScroll = () => {
            let timeout;
            return () => {
                if (timeout) clearTimeout(timeout);
                timeout = setTimeout(handleInfiniteScroll, 200); // 200ms debounce
            };
        };

        const handleScroll = debounceScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading]); // Pass loading as a dependency

    if (error) return <p>{error}</p>;


    return (
        <div className="romantic-movie-container">
            <div className="movies">
                <MoviesContainer movies={movies} />
                {loading && <p>Loading....</p>}
            </div>
        </div>
    );
};

export default RomanticComedy;