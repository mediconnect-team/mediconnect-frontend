import axios from 'axios';
import { config } from '../utils/constants';

/**
 * Axios Instance Configuration
 * 
 * This module provides a pre-configured axios instance with:
 * - Base URL configuration
 * - Request interceptor for automatic JWT token injection
 * - Response interceptor for centralized error handling
 * - Automatic redirect on authentication failures
 * 
 * Industry Standard Implementation:
 * - Single source of truth for API configuration
 * - Automatic token management
 * - Centralized error handling
 * - Token refresh capability (can be extended)
 * 
 * @author MediConnect Team
 */

// Token storage keys
const TOKEN_KEY = 'token';
const USER_KEY = 'user';

/**
 * Get stored authentication token
 * @returns {string|null} JWT token or null
 */
export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

/**
 * Set authentication token in storage
 * @param {string} token - JWT token
 */
export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Remove authentication token from storage
 */
export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

/**
 * Get stored user data
 * @returns {object|null} User object or null
 */
export const getStoredUser = () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
};

/**
 * Set user data in storage
 * @param {object} user - User data object
 */
export const setStoredUser = (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Remove user data from storage
 */
export const removeStoredUser = () => {
    localStorage.removeItem(USER_KEY);
};

/**
 * Clear all authentication data
 */
export const clearAuthData = () => {
    removeToken();
    removeStoredUser();
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if token exists
 */
export const isAuthenticated = () => {
    return !!getToken();
};

// Create axios instance with default configuration
const api = axios.create({
    baseURL: config.server,
    timeout: 30000, // 30 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Request Interceptor
 * 
 * Automatically attaches JWT token to all outgoing requests.
 * This eliminates the need to manually add authorization headers
 * in every API call throughout the application.
 */
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        
        if (token) {
            // Standard Authorization header format for JWT
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor
 * 
 * Handles all API responses centrally:
 * - 401 Unauthorized: Log warning (let Redux handle the redirect)
 * - 403 Forbidden: Log access denial (user doesn't have permission)
 * - 500+ Server errors: Log and provide user-friendly message
 * 
 * Note: We don't automatically redirect on 401 here because:
 * 1. It can cause race conditions during auth initialization
 * 2. Redux should manage the auth state and navigation
 * 3. Some 401s are expected (e.g., when checking if token is valid)
 */
api.interceptors.response.use(
    (response) => {
        // Successful response - return data
        return response;
    },
    (error) => {
        const { response } = error;
        
        if (response) {
            switch (response.status) {
                case 401:
                    // Unauthorized - token expired or invalid
                    // Don't auto-redirect here - let Redux handle it
                    // This prevents race conditions during initialization
                    console.warn('Authentication failed (401):', response.config?.url);
                    break;
                    
                case 403:
                    // Forbidden - user doesn't have permission
                    console.warn('Access forbidden:', response.data?.message || 'You do not have permission to access this resource.');
                    break;
                    
                case 404:
                    // Not found
                    console.warn('Resource not found:', response.config?.url);
                    break;
                    
                case 500:
                case 502:
                case 503:
                    // Server error
                    console.error('Server error:', response.data?.message || 'Internal server error');
                    break;
                    
                default:
                    console.error('API error:', response.status, response.data);
            }
        } else if (error.request) {
            // Request was made but no response received (network error)
            console.error('Network error - no response received:', error.message);
        } else {
            // Something happened in setting up the request
            console.error('Request setup error:', error.message);
        }
        
        return Promise.reject(error);
    }
);

export default api;
