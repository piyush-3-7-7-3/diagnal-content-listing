// Import the Home component from the pages directory
import Home from "./pages/Home";

// Define the main App component
function App() {
  return (
    // Render the Home component inside a div with class "App"
    <div className="App">
      <Home />
    </div>
  );
}

// Export the App component for use in other parts of the application
export default App;
