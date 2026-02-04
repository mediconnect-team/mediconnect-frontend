import api from "./api";

export const registerStaff = async (staffData) => {
    try {
        const response = await api.post("/auth/register-staff", staffData);
        return response.data;
    } catch (error) {
        console.error("Staff Registration Error:", error);
        throw error.response?.data || "Failed to register staff";
    }
};

export const getAllStaff = async () => {
    try {
        const response = await api.get("/admin/staff");
        return response.data;
    } catch (error) {
        console.error("Fetch Staff Error:", error);
        throw error.response?.data || "Failed to fetch staff directory";
    }
};