import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/'

export default axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
});

export const axiosPrivate = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json'},
});