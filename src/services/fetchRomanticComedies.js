import axios from 'axios';
import { MOVIES_API_BASE_URL } from '../data/constants';
import { ROMANTIC_COMEDY_ENDPOINT } from '../data/constants';

const fetchRomanticComedies = async (page=1) => {
    try {
        const response = await axios.get(`${MOVIES_API_BASE_URL}${ROMANTIC_COMEDY_ENDPOINT}/page${page}.json`);

        // Process the response
        if (response?.data?.page['content-items']?.content) {
            return response.data;  // Return only the content array
        } else {
            throw new Error('Movies not found');  // Handle missing data structure
        }
    } catch (error) {
        throw error;  // Propagate the error to the caller
    }
};


export default fetchRomanticComedies;