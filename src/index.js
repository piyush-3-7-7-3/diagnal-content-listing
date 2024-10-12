// Import React library
import React from 'react';

// Import ReactDOM for rendering components
import ReactDOM from 'react-dom/client';

// Import global styles
import './styles.css';

// Import the main App component
import App from './App';

// Create a root element to render the App component into
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element
root.render(
  <App />
);
