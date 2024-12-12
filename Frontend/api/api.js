import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api/v1', // Your backend base URL
    withCredentials: true, // Include cookies for token handling
    headers:{ 'Content-Type': 'application/json' }
});

export default API;
