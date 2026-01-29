import api from './api';

/**
 * Doctor API Service
 * 
 * Provides all doctor-related API calls using the centralized axios instance.
 * The axios instance automatically handles:
 * - JWT token injection via request interceptor
 * - Authentication error handling via response interceptor
 * - Base URL configuration
 * 
 * @author MediConnect Team
 */

/**
 * Get doctor dashboard data
 * @param {number} doctorId - Doctor ID
 * @returns {Promise<object>} Dashboard data
 */
export async function getDoctorDashboard(doctorId) {
    try {
        const response = await api.get(`/doctor/${doctorId}/dashboard`);
        return response.data;
    } catch (error) {
        console.error("Error fetching doctor dashboard:", error);
        throw error;
    }
}

/**
 * Get doctor's schedule
 * @param {number} doctorId - Doctor ID
 * @returns {Promise<Array>} Schedule data
 */
export async function getDoctorSchedule(doctorId) {
    try {
        const response = await api.get(`/doctor/${doctorId}/schedule`);
        return response.data;
    } catch (error) {
        console.error("Error fetching doctor schedule:", error);
        throw error;
    }
}

/**
 * Update doctor's schedule
 * @param {number} doctorId - Doctor ID
 * @param {object} scheduleData - Schedule data
 * @returns {Promise<object>} Updated schedule
 */
export async function updateDoctorSchedule(doctorId, scheduleData) {
    try {
        const response = await api.put(`/doctor/${doctorId}/schedule`, scheduleData);
        return response.data;
    } catch (error) {
        console.error("Error updating doctor schedule:", error);
        throw error;
    }
}

/**
 * Get doctor's appointments
 * @param {number} doctorId - Doctor ID
 * @param {object} params - Query parameters (date, status, etc.)
 * @returns {Promise<Array>} List of appointments
 */
export async function getDoctorAppointments(doctorId, params = {}) {
    try {
        const response = await api.get(`/doctor/${doctorId}/appointments`, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching doctor appointments:", error);
        throw error;
    }
}

/**
 * Get today's appointments for a doctor
 * @param {number} doctorId - Doctor ID
 * @returns {Promise<Array>} Today's appointments
 */
export async function getTodayAppointments(doctorId) {
    try {
        const response = await api.get(`/doctor/${doctorId}/appointments/today`);
        return response.data;
    } catch (error) {
        console.error("Error fetching today's appointments:", error);
        throw error;
    }
}

/**
 * Get patient details (for doctor to view)
 * @param {number} patientId - Patient ID
 * @returns {Promise<object>} Patient details
 */
export async function getPatientDetails(patientId) {
    try {
        const response = await api.get(`/doctor/patient/${patientId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching patient details:", error);
        throw error;
    }
}

/**
 * Get patient's medical history
 * @param {number} patientId - Patient ID
 * @returns {Promise<Array>} Medical history
 */
export async function getPatientHistory(patientId) {
    try {
        const response = await api.get(`/doctor/patient/${patientId}/history`);
        return response.data;
    } catch (error) {
        console.error("Error fetching patient history:", error);
        throw error;
    }
}

/**
 * Create a prescription
 * @param {object} prescriptionData - Prescription details
 * @returns {Promise<object>} Created prescription
 */
export async function createPrescription(prescriptionData) {
    try {
        const response = await api.post('/doctor/prescriptions', prescriptionData);
        return response.data;
    } catch (error) {
        console.error("Error creating prescription:", error);
        throw error;
    }
}

/**
 * Get prescriptions created by doctor
 * @param {number} doctorId - Doctor ID
 * @returns {Promise<Array>} List of prescriptions
 */
export async function getDoctorPrescriptions(doctorId) {
    try {
        const response = await api.get(`/doctor/${doctorId}/prescriptions`);
        return response.data;
    } catch (error) {
        console.error("Error fetching doctor prescriptions:", error);
        throw error;
    }
}

/**
 * Complete an appointment
 * @param {number} appointmentId - Appointment ID
 * @param {object} completionData - Completion details (notes, diagnosis, etc.)
 * @returns {Promise<object>} Updated appointment
 */
export async function completeAppointment(appointmentId, completionData) {
    try {
        const response = await api.put(`/doctor/appointments/${appointmentId}/complete`, completionData);
        return response.data;
    } catch (error) {
        console.error("Error completing appointment:", error);
        throw error;
    }
}

/**
 * Get doctor's profile
 * @param {number} doctorId - Doctor ID
 * @returns {Promise<object>} Doctor profile
 */
export async function getDoctorProfile(doctorId) {
    try {
        const response = await api.get(`/doctor/${doctorId}/profile`);
        return response.data;
    } catch (error) {
        console.error("Error fetching doctor profile:", error);
        throw error;
    }
}

/**
 * Update doctor's profile
 * @param {number} doctorId - Doctor ID
 * @param {object} profileData - Updated profile data
 * @returns {Promise<object>} Updated profile
 */
export async function updateDoctorProfile(doctorId, profileData) {
    try {
        const response = await api.put(`/doctor/${doctorId}/profile`, profileData);
        return response.data;
    } catch (error) {
        console.error("Error updating doctor profile:", error);
        throw error;
    }
}

/**
 * Get doctor statistics (appointments count, patients count, etc.)
 * @param {number} doctorId - Doctor ID
 * @returns {Promise<object>} Statistics
 */
export async function getDoctorStats(doctorId) {
    try {
        const response = await api.get(`/doctor/${doctorId}/stats`);
        return response.data;
    } catch (error) {
        console.error("Error fetching doctor stats:", error);
        throw error;
    }
}

export default {
    getDoctorDashboard,
    getDoctorSchedule,
    updateDoctorSchedule,
    getDoctorAppointments,
    getTodayAppointments,
    getPatientDetails,
    getPatientHistory,
    createPrescription,
    getDoctorPrescriptions,
    completeAppointment,
    getDoctorProfile,
    updateDoctorProfile,
    getDoctorStats,
};
