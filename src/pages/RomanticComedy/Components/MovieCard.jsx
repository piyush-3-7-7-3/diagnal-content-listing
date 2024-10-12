import './movieCard.css';
import { useContext, memo } from 'react';
import Highlighter from 'react-highlight-words';
import { SearchContext } from '../../../context/SearchContext';
import { MOVIES_API_BASE_URL, IMAGES_ENDPOINT } from '../../../data/constants';
import { Typography } from '@mui/material';

const MovieCard = memo(({ name, posterImage }) => {
    const { searchTerm } = useContext(SearchContext);

    return (
        <>
            <div className="thumbnail">
                <img
                    src={`${MOVIES_API_BASE_URL}${IMAGES_ENDPOINT}/${posterImage}`}  // Use the correct path to your image
                    alt={name}
                    onError={(e) => { e.target.src = 'https://test.create.diagnal.com/images/placeholder_for_missing_posters.png'; }}  // Fallback image for missing images
                />
                <Typography
                    sx={{
                        fontSize: {
                            xs: '0.8rem',  
                            sm: '1rem', 
                            md: '1.3rem',
                            lg: '1.5rem' 
                        },
                        whiteSpace: 'nowrap',        
                        overflow: 'hidden',          
                        textOverflow: 'ellipsis',    
                        display: 'block',             
                        width: '100%',  
                        marginTop: 1,
                        marginBottom: 10             
                    }}
                >
                    <Highlighter
                        highlightClassName="highlight"
                        searchWords={[searchTerm]}  // Highlighting based on the search term
                        autoEscape={true}
                        textToHighlight={name}  // Movie name to highlight
                    />
                </Typography>

            </div>

        </>
    );
});

export default MovieCard;