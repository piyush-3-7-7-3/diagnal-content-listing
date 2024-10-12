// Import necessary styles
import './movieCard.css';

// Import React and related libraries
import { useContext, memo } from 'react';
import { Typography } from '@mui/material';

// Import third-party libraries
import Highlighter from 'react-highlight-words';

// Import context
import { SearchContext } from '../../../context/SearchContext';

// Import constants
import { MOVIES_API_BASE_URL, IMAGES_ENDPOINT } from '../../../data/constants';

// Define the MovieCard component and wrap it in memo for performance optimization
const MovieCard = memo(({ name, posterImage }) => {
    // Get the search term from the SearchContext
    const { searchTerm } = useContext(SearchContext);

    return (
        <>
            <div className="thumbnail">
                <img
                    src={`${MOVIES_API_BASE_URL}${IMAGES_ENDPOINT}/${posterImage}`}  // Construct the full URL for the poster image
                    alt={name}  // Alt text for the image
                    onError={(e) => { 
                        // Fallback image for missing images
                        e.target.src = `${MOVIES_API_BASE_URL}${IMAGES_ENDPOINT}/placeholder_for_missing_posters.png`; 
                    }}  
                />
                <Typography
                    sx={{
                        fontSize: {
                            xs: '0.8rem',  // Responsive font size for extra small screens
                            sm: '1rem',    // Responsive font size for small screens
                            md: '1.3rem',   // Responsive font size for medium screens
                            lg: '1.5rem'    // Responsive font size for large screens
                        },
                        whiteSpace: 'nowrap',        // Prevent text wrapping
                        overflow: 'hidden',          // Hide overflow text
                        textOverflow: 'ellipsis',    // Show ellipsis for overflow text
                        display: 'block',             // Display block for proper layout
                        width: '100%',                // Full width
                        marginTop: 1,                // Margin above the text
                        marginBottom: 10              // Margin below the text
                    }}
                >
                    <Highlighter
                        highlightClassName="highlight"  // Class for highlighted text
                        searchWords={[searchTerm]}      // Highlighting based on the search term
                        autoEscape={true}               // Escape special characters
                        textToHighlight={name}           // Movie name to highlight
                    />
                </Typography>
            </div>
        </>
    );
});

// Export the MovieCard component
export default MovieCard;
