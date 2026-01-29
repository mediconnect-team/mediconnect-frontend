import api, { setToken, setStoredUser, clearAuthData, getToken } from './api';

/**
 * Authentication API Service
 * 
 * Provides all authentication-related API calls:
 * - User login
 * - Patient registration
 * - Staff registration (Admin only)
 * - Current user retrieval
 * - Logout functionality
 * 
 * Industry Standard Implementation:
 * - Centralized authentication logic
 * - Automatic token storage after successful login
 * - Error handling with meaningful messages
 * - Support for role-based responses
 * 
 * @author MediConnect Team
 */

/**
 * Login user with email and password
 * 
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<object>} Response containing:
 *   - token: JWT access token
 *   - username: User's email
 *   - name: User's display name
 *   - role: User's role (ROLE_PATIENT, ROLE_DOCTOR, ROLE_ADMIN)
 *   - userId: Base user ID
 *   - patientId: Patient ID (if role is ROLE_PATIENT)
 *   - doctorId: Doctor ID (if role is ROLE_DOCTOR)
 *   - adminId: Admin ID (if role is ROLE_ADMIN)
 * @throws {Error} Authentication failed or network error
 */
export async function loginUser(email, password) {
    try {
        const response = await api.post('/api/auth/login', {
            email,
            password
        });
        
        const data = response.data;
        
        // Store token for subsequent requests
        setToken(data.token);
        
        // Prepare user object for storage
        const user = {
            userId: data.userId,
            name: data.name,
            email: data.username,
            role: data.role,
            patientId: data.patientId,
            doctorId: data.doctorId,
            adminId: data.adminId
        };
        
        // Store user data
        setStoredUser(user);
        
        return {
            success: true,
            user,
            token: data.token
        };
    } catch (error) {
        console.error('Login error:', error);
        
        // Extract error message
        let message = 'Login failed. Please try again.';
        
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    message = 'Invalid email or password.';
                    break;
                case 403:
                    message = 'Your account has been disabled. Please contact support.';
                    break;
                case 404:
                    message = 'Account not found.';
                    break;
                default:
                    message = error.response.data?.message || message;
            }
        } else if (error.request) {
            message = 'Unable to connect to server. Please check your internet connection.';
        }
        
        return {
            success: false,
            message
        };
    }
}

/**
 * Register a new patient
 * 
 * @param {object} patientData - Patient registration data
 * @param {string} patientData.name - Full name
 * @param {string} patientData.email - Email address
 * @param {string} patientData.password - Password
 * @param {string} patientData.phone - Phone number
 * @param {string} patientData.dob - Date of birth (YYYY-MM-DD)
 * @param {string} patientData.address - Full address
 * @param {string} patientData.gender - Gender (optional)
 * @param {string} patientData.bloodGroup - Blood group (optional)
 * @returns {Promise<object>} Response with success status and user data
 * @throws {Error} Registration failed or network error
 */
export async function registerPatient(patientData) {
    try {
        const response = await api.post('/api/auth/register-patient', {
            name: patientData.name,
            email: patientData.email,
            password: patientData.password,
            phone: patientData.phone,
            dob: patientData.dob,
            address: patientData.address,
            gender: patientData.gender,
            bloodGroup: patientData.bloodGroup,
            userRole: 'ROLE_PATIENT'
        });
        
        return {
            success: true,
            user: response.data,
            message: 'Registration successful! Please login to continue.'
        };
    } catch (error) {
        console.error('Registration error:', error);
        
        let message = 'Registration failed. Please try again.';
        
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    message = error.response.data?.message || 'Invalid registration data. Please check your inputs.';
                    break;
                case 409:
                    message = 'An account with this email already exists.';
                    break;
                default:
                    message = error.response.data?.message || message;
            }
        } else if (error.request) {
            message = 'Unable to connect to server. Please check your internet connection.';
        }
        
        return {
            success: false,
            message
        };
    }
}

/**
 * Register a staff member (Doctor, Admin, Nurse)
 * Admin only endpoint
 * 
 * @param {object} staffData - Staff registration data
 * @param {string} staffData.name - Full name
 * @param {string} staffData.email - Email address
 * @param {string} staffData.password - Password
 * @param {string} staffData.phone - Phone number
 * @param {string} staffData.dob - Date of birth
 * @param {string} staffData.userRole - Role (ROLE_DOCTOR, ROLE_ADMIN, ROLE_NURSE)
 * @param {object} staffData.additionalInfo - Role-specific data (specialization, department, etc.)
 * @returns {Promise<object>} Response with success status and user data
 */
export async function registerStaff(staffData) {
    try {
        const response = await api.post('/api/auth/register-staff', staffData);
        
        return {
            success: true,
            user: response.data,
            message: 'Staff member registered successfully!'
        };
    } catch (error) {
        console.error('Staff registration error:', error);
        
        let message = 'Staff registration failed.';
        
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    message = 'You must be logged in to register staff.';
                    break;
                case 403:
                    message = 'Only administrators can register staff members.';
                    break;
                case 400:
                    message = error.response.data?.message || 'Invalid registration data.';
                    break;
                case 409:
                    message = 'An account with this email already exists.';
                    break;
                default:
                    message = error.response.data?.message || message;
            }
        }
        
        return {
            success: false,
            message
        };
    }
}

/**
 * Get current authenticated user information
 * 
 * @returns {Promise<object>} Current user data including role-specific IDs
 */
export async function getCurrentUser() {
    try {
        const response = await api.get('/api/auth/me');
        
        const data = response.data;
        
        return {
            success: true,
            user: {
                userId: data.id,
                name: data.name,
                email: data.email,
                role: data.userRole,
                patientId: data.patientId,
                doctorId: data.doctorId,
                adminId: data.adminId
            }
        };
    } catch (error) {
        console.error('Get current user error:', error);
        
        return {
            success: false,
            message: 'Failed to fetch user information'
        };
    }
}

/**
 * Logout user
 * Clears all stored authentication data
 */
export function logoutUser() {
    clearAuthData();
}

/**
 * Check if user has a valid token
 * 
 * @returns {boolean} True if token exists
 */
export function hasValidToken() {
    return !!getToken();
}

/**
 * Validate token by calling /me endpoint
 * Useful for checking if stored token is still valid
 * 
 * @returns {Promise<boolean>} True if token is valid
 */
export async function validateToken() {
    if (!hasValidToken()) {
        return false;
    }
    
    const result = await getCurrentUser();
    return result.success;
}

export default {
    loginUser,
    registerPatient,
    registerStaff,
    getCurrentUser,
    logoutUser,
    hasValidToken,
    validateToken
};
