import api, { publicApi } from "./api";

export const loginUser = async (email, password) => {
    try {
        // Use publicApi to avoid sending potentially bad tokens
        const response = await publicApi.post("/auth/login", { email, password });
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error.response?.data || "Login failed";
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
        // Use publicApi to avoid sending potentially bad tokens
        const response = await publicApi.post("/auth/register-patient", userData);
        return response.data;
    } catch (error) {
        console.error("Registration error:", error);
        throw error.response?.data || "Registration failed";
    }
};
