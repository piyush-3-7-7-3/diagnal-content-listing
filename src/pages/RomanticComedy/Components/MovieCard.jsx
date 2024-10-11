import './movieCard.css';
import { useContext, memo } from 'react';
import Highlighter from 'react-highlight-words';
import { SearchContext } from '../../../context/SearchContext';
import { MOVIES_API_BASE_URL, IMAGES_ENDPOINT } from '../../../data/constants';

const MovieCard = memo(({ name, posterImage }) => {
    const { searchTerm } = useContext(SearchContext);

    return (
        <>
            <img
                className="thumbnail"
                src={`${MOVIES_API_BASE_URL}${IMAGES_ENDPOINT}/${posterImage}`}  // Use the correct path to your image
                alt={name}
                onError={(e) => { e.target.src = 'https://test.create.diagnal.com/images/placeholder_for_missing_posters.png'; }}  // Fallback image for missing images
            />
            <h3>
                <Highlighter
                    highlightClassName="highlight"
                    searchWords={[searchTerm]}  // Highlighting based on the search term
                    autoEscape={true}
                    textToHighlight={name}  // Movie name to highlight
                />
            </h3>
        </>
    );
});

export default MovieCard;