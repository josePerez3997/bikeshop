import axios from 'axios';
import { ErrorResponse } from '../types/common';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const errorResponse: ErrorResponse = {
            status: error.response?.status || 500,
            message: error.response?.data?.message || 'Error en el servidor',
            details: error.response?.data?.details,
        };
        return Promise.reject(errorResponse);
    }
);

export default api;