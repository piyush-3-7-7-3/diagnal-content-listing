import RomanticComedy from "./RomanticComedy/RomanticComedy";
import Navbar from "../layouts/Navbar";
import { SearchProvider } from "../context/SearchContext";

const Home = () => {
    return (
        <SearchProvider>
            <Navbar/>
            <RomanticComedy />
        </SearchProvider>
    );
};

export default Home;