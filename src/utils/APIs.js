import axios from 'axios';

export const signupAPI = async (userData) => {
    try {
        const response = await axios.post('https://localhost:3000/signup', userData);
        return response.data; 
    } catch (error) {
        throw new Error('An error occurred during signup post request', error); 
    }
};

export const signinAPI = async (userData) => {
    try {
        const response = await axios.post('https://localhost:3000/signin', userData);
        return response.data; 
    } catch (error) {
        throw new Error('An error occurred during signin post reuqest', error);  
    }
};