// import api from './api';

// /**
//  * Admin API Service
//  * 
//  * Provides all admin-related API calls using the centralized axios instance.
//  * The axios instance automatically handles:
//  * - JWT token injection via request interceptor
//  * - Authentication error handling via response interceptor
//  * - Base URL configuration
//  * 
//  * @author MediConnect Team
//  */

// // =====================
// // STAFF MANAGEMENT
// // =====================

// /**
//  * Get all staff members
//  * @param {object} params - Query parameters (role, status, etc.)
//  * @returns {Promise<Array>} List of staff members
//  */
// export async function getAllStaff(params = {}) {
//     try {
//         const response = await api.get('/admin/staff', { params });
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching staff list:", error);
//         throw error;
//     }
// }

// /**
//  * Get staff member by ID
//  * @param {number} staffId - Staff ID
//  * @returns {Promise<object>} Staff member details
//  */
// export async function getStaffById(staffId) {
//     try {
//         const response = await api.get(`/admin/staff/${staffId}`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching staff member:", error);
//         throw error;
//     }
// }

// /**
//  * Update staff member
//  * @param {number} staffId - Staff ID
//  * @param {object} staffData - Updated staff data
//  * @returns {Promise<object>} Updated staff member
//  */
// export async function updateStaff(staffId, staffData) {
//     try {
//         const response = await api.put(`/admin/staff/${staffId}`, staffData);
//         return response.data;
//     } catch (error) {
//         console.error("Error updating staff member:", error);
//         throw error;
//     }
// }

// /**
//  * Deactivate staff member
//  * @param {number} staffId - Staff ID
//  * @returns {Promise<void>}
//  */
// export async function deactivateStaff(staffId) {
//     try {
//         await api.put(`/admin/staff/${staffId}/deactivate`);
//     } catch (error) {
//         console.error("Error deactivating staff member:", error);
//         throw error;
//     }
// }

// /**
//  * Activate staff member
//  * @param {number} staffId - Staff ID
//  * @returns {Promise<void>}
//  */
// export async function activateStaff(staffId) {
//     try {
//         await api.put(`/admin/staff/${staffId}/activate`);
//     } catch (error) {
//         console.error("Error activating staff member:", error);
//         throw error;
//     }
// }

// // =====================
// // DOCTOR MANAGEMENT
// // =====================

// /**
//  * Get all doctors
//  * @param {object} params - Query parameters
//  * @returns {Promise<Array>} List of doctors
//  */
// export async function getAllDoctors(params = {}) {
//     try {
//         const response = await api.get('/admin/doctors', { params });
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching doctors:", error);
//         throw error;
//     }
// }

// /**
//  * Get doctor by ID
//  * @param {number} doctorId - Doctor ID
//  * @returns {Promise<object>} Doctor details
//  */
// export async function getDoctorById(doctorId) {
//     try {
//         const response = await api.get(`/admin/doctors/${doctorId}`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching doctor:", error);
//         throw error;
//     }
// }

// /**
//  * Update doctor
//  * @param {number} doctorId - Doctor ID
//  * @param {object} doctorData - Updated doctor data
//  * @returns {Promise<object>} Updated doctor
//  */
// export async function updateDoctor(doctorId, doctorData) {
//     try {
//         const response = await api.put(`/admin/doctors/${doctorId}`, doctorData);
//         return response.data;
//     } catch (error) {
//         console.error("Error updating doctor:", error);
//         throw error;
//     }
// }

// // =====================
// // NURSE MANAGEMENT
// // =====================

// /**
//  * Get all nurses
//  * @param {object} params - Query parameters
//  * @returns {Promise<Array>} List of nurses
//  */
// export async function getAllNurses(params = {}) {
//     try {
//         const response = await api.get('/admin/nurses', { params });
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching nurses:", error);
//         throw error;
//     }
// }

// // =====================
// // PATIENT MANAGEMENT
// // =====================

// /**
//  * Get all patients
//  * @param {object} params - Query parameters
//  * @returns {Promise<Array>} List of patients
//  */
// export async function getAllPatients(params = {}) {
//     try {
//         const response = await api.get('/admin/patients', { params });
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching patients:", error);
//         throw error;
//     }
// }

// /**
//  * Get patient by ID
//  * @param {number} patientId - Patient ID
//  * @returns {Promise<object>} Patient details
//  */
// export async function getPatientById(patientId) {
//     try {
//         const response = await api.get(`/admin/patients/${patientId}`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching patient:", error);
//         throw error;
//     }
// }

// /**
//  * Get patient records
//  * @param {number} patientId - Patient ID
//  * @returns {Promise<Array>} Patient medical records
//  */
// export async function getPatientRecords(patientId) {
//     try {
//         const response = await api.get(`/admin/patients/${patientId}/records`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching patient records:", error);
//         throw error;
//     }
// }

// // =====================
// // APPOINTMENT MANAGEMENT
// // =====================

// /**
//  * Get all appointments
//  * @param {object} params - Query parameters (date, status, doctorId, etc.)
//  * @returns {Promise<Array>} List of appointments
//  */
// export async function getAllAppointments(params = {}) {
//     try {
//         const response = await api.get('/admin/appointments', { params });
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching appointments:", error);
//         throw error;
//     }
// }

// /**
//  * Get appointments for a specific date
//  * @param {string} date - Date in YYYY-MM-DD format
//  * @returns {Promise<Array>} Appointments for the date
//  */
// export async function getAppointmentsByDate(date) {
//     try {
//         const response = await api.get('/admin/appointments', { params: { date } });
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching appointments by date:", error);
//         throw error;
//     }
// }

// /**
//  * Update appointment status
//  * @param {number} appointmentId - Appointment ID
//  * @param {string} status - New status
//  * @returns {Promise<object>} Updated appointment
//  */
// export async function updateAppointmentStatus(appointmentId, status) {
//     try {
//         const response = await api.put(`/admin/appointments/${appointmentId}/status`, { status });
//         return response.data;
//     } catch (error) {
//         console.error("Error updating appointment status:", error);
//         throw error;
//     }
// }

// // =====================
// // DEPARTMENT MANAGEMENT
// // =====================

// /**
//  * Get all departments
//  * @returns {Promise<Array>} List of departments
//  */
// export async function getAllDepartments() {
//     try {
//         const response = await api.get('/api/departments');
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching departments:", error);
//         throw error;
//     }
// }

// /**
//  * Create a new department
//  * @param {object} departmentData - Department details
//  * @returns {Promise<object>} Created department
//  */
// export async function createDepartment(departmentData) {
//     try {
//         const response = await api.post('/admin/departments', departmentData);
//         return response.data;
//     } catch (error) {
//         console.error("Error creating department:", error);
//         throw error;
//     }
// }

// /**
//  * Update department
//  * @param {number} departmentId - Department ID
//  * @param {object} departmentData - Updated department data
//  * @returns {Promise<object>} Updated department
//  */
// export async function updateDepartment(departmentId, departmentData) {
//     try {
//         const response = await api.put(`/admin/departments/${departmentId}`, departmentData);
//         return response.data;
//     } catch (error) {
//         console.error("Error updating department:", error);
//         throw error;
//     }
// }

// // =====================
// // ANALYTICS & REPORTS
// // =====================

// /**
//  * Get admin dashboard statistics
//  * @returns {Promise<object>} Dashboard statistics
//  */
// export async function getDashboardStats() {
//     try {
//         const response = await api.get('/admin/dashboard/stats');
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching dashboard stats:", error);
//         throw error;
//     }
// }

// /**
//  * Get analytics data
//  * @param {object} params - Date range and filters
//  * @returns {Promise<object>} Analytics data
//  */
// export async function getAnalytics(params = {}) {
//     try {
//         const response = await api.get('/admin/analytics', { params });
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching analytics:", error);
//         throw error;
//     }
// }

// /**
//  * Generate report
//  * @param {string} reportType - Type of report
//  * @param {object} params - Report parameters
//  * @returns {Promise<object>} Report data
//  */
// export async function generateReport(reportType, params = {}) {
//     try {
//         const response = await api.get(`/admin/reports/${reportType}`, { params });
//         return response.data;
//     } catch (error) {
//         console.error("Error generating report:", error);
//         throw error;
//     }
// }

// export default {
//     // Staff
//     getAllStaff,
//     getStaffById,
//     updateStaff,
//     deactivateStaff,
//     activateStaff,
//     // Doctors
//     getAllDoctors,
//     getDoctorById,
//     updateDoctor,
//     // Nurses
//     getAllNurses,
//     // Patients
//     getAllPatients,
//     getPatientById,
//     getPatientRecords,
//     // Appointments
//     getAllAppointments,
//     getAppointmentsByDate,
//     updateAppointmentStatus,
//     // Departments
//     getAllDepartments,
//     createDepartment,
//     updateDepartment,
//     // Analytics
//     getDashboardStats,
//     getAnalytics,
//     generateReport,
// };
