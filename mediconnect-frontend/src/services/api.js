import axios from "axios";

// 1. Private API (Attaches Token)
const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
    (config) => {
        const userStr = localStorage.getItem("user");
        console.log("API Interceptor: Checking user in localStorage...");
        if (userStr) {
            const user = JSON.parse(userStr);
            if (user && user.token) {
                console.log("API Interceptor: Attaching Token ->", user.token.substring(0, 10) + "...");
                config.headers.Authorization = `Bearer ${user.token}`;
            } else {
                console.warn("API Interceptor: User found but NO TOKEN.");
            }
        } else {
            console.warn("API Interceptor: No user found in localStorage.");
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 2. Public API (No Token - for Login/Register)
export const publicApi = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
