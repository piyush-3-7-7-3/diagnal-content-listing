import MoviesContainer from "./Components/MoviesContainer";
import { useState, useEffect, useContext } from 'react';
import fetchRomanticComedies from "../../services/fetchRomanticComedies";
import hasMoreItems from "../../utils/hasMoreItems";
import { SearchContext } from "../../context/SearchContext";
import Grid from '@mui/material/Grid2';
import { Skeleton } from "@mui/material";


const RomanticComedy = ({ handleSetMovies, filteredMovies, handleSetFilteredMovies }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const { searchTerm } = useContext(SearchContext);

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
                    handleSetMovies((prev) => [...prev, ...content]);
                    if (searchTerm != "") {
                        let filteredContent = content.filter((movie) => {
                            return movie.name.toLowerCase().includes(searchTerm.toLowerCase())
                        })
                        handleSetFilteredMovies((prev) => [...prev, ...filteredContent]);
                    }
                    else {
                        handleSetFilteredMovies((prev) => [...prev, ...content]);
                    }

                } catch (err) {
                    console.log(err)
                    setError('Error in fetching movies');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }

        };
        getMovies();
    }, [page, hasMore]);

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
    }, [loading]);

    if (error) return <p>{error}</p>;

    return (
        <div className="romantic-movie-container">
            <div className="movies">
                <MoviesContainer movies={filteredMovies} />
                {loading &&
                    <Grid container spacing={2} marginX={5} justifyContent="center" alignItems="flex-start">
                        {Array.from(new Array(12)).map((_, index) => (
                            <Grid xs={12} sm={6} md={4} key={index}>
                                <Skeleton
                                    sx={{ bgcolor: 'grey.800' }}
                                    variant="rectangular"
                                    width={300}
                                    height={400}
                                />
                            </Grid>
                        ))}
                    </Grid>
                }
            </div>
        </div>
    );
};

export default RomanticComedy;