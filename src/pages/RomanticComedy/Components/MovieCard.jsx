import './movieCard.css';

const MovieCard = ({ name, posterImage }) => {
    return (
        <>
            <img
                className="thumbnail"
                src={`https://test.create.diagnal.com/images/${posterImage}`}  // Use the correct path to your image
                alt={name}
                onError={(e) => { e.target.src = 'https://test.create.diagnal.com/images/placeholder_for_missing_posters.png'; }}  // Fallback image for missing images
            />
            <h3>{name}</h3>
        </>
    );
};

export default MovieCard;