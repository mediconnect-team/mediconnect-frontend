import api, { publicApi, setToken, setStoredUser, clearAuthData, getToken } from "./api";

export const loginUser = async (email, password) => {
    try {
        // Use publicApi to avoid sending potentially bad tokens
        const response = await publicApi.post("/auth/login", { email, password });
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
        console.error("Login error:", error);

        // Extract user-friendly error message from various formats
        let errorMessage = 'Login failed. Please check your credentials and try again.';

        if (error.response?.data) {
            const data = error.response.data;
            // Backend might return { message: "..." } or just a string
            errorMessage = data.message || data.error || (typeof data === 'string' ? data : errorMessage);
        } else if (error.message) {
            // Network errors
            errorMessage = error.message.includes('Network') ?
                'Network error. Please check your connection.' : error.message;
        }

        throw errorMessage;
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await api.get("/auth/me");
        return response.data;
    } catch (error) {
        console.error("Get Current User Error:", error);
        throw error;
    }
};

export const registerPatient = async (userData) => {
    try {
        console.log("authApi: Registering patient using publicApi...");
        console.log("Payload:", userData);
        // Use publicApi to avoid sending potentially bad tokens
        const response = await publicApi.post("/auth/register-patient", userData, {
            headers: { 'Authorization': undefined } // Explicitly clear any inherited auth header
        });
        console.log("authApi: Registration response:", response.data);
        return {
            success: true,
            user: response.data,
            message: 'Registration successful! Please login to continue.'
        };
    } catch (error) {
        console.error("Registration error:", error);

        // Extract user-friendly error message from various formats
        let errorMessage = 'Registration failed. Please try again.';

        if (error.response?.data) {
            const data = error.response.data;
            // Backend might return { message: "..." } or just a string
            errorMessage = data.message || data.error || (typeof data === 'string' ? data : errorMessage);

            // Handle specific cases
            if (errorMessage.toLowerCase().includes('email') && errorMessage.toLowerCase().includes('exist')) {
                errorMessage = 'This email is already registered. Please use a different email or try logging in.';
            }
        } else if (error.message) {
            // Network errors
            errorMessage = error.message.includes('Network') ?
                'Network error. Please check your connection.' : error.message;
        }

        throw errorMessage;
    }
};

/**
 * Logout user
 * Clears all stored authentication data
 */
export function logoutUser() {
    clearAuthData();
}

export default {
    loginUser,
    registerPatient,
    getCurrentUser,
    logoutUser
};
