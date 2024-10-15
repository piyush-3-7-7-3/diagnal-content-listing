const Suggestion = ({suggestions, handleSuggestionClick}) => {
    return (<div className="dropdown-suggestions">
        {suggestions.reduce((unique, suggestion) => {
            // Check if the suggestion is already included in the unique array
            if (!unique.some(item => item.name === suggestion.name)) {
                unique.push(suggestion); // Add if it's unique
            }
            return unique; // Return the unique array
        }, []).map((uniqueSuggestion, index) => (
            <div
                key={index}
                className="dropdown-item"
                onClick={() => handleSuggestionClick(uniqueSuggestion)}
            >
                {uniqueSuggestion.name}
            </div>
        ))}
    </div>)
}

export default Suggestion;