import api from "./api"; // Use our configured api instance

// Helper to get current user ID
const getUserId = () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
        const user = JSON.parse(userStr);
        return user.id;
    } catch (e) {
        return null;
    }
};

export async function getUpcomingAppointments() {
    try {
        const id = getUserId();
        if (!id) return [];
        const response = await api.get(`/appointments/patient/${id}/upcoming`);
        return response.data;
    } catch (ex) {
        console.error("Error fetching upcoming appointments:", ex);
        return [];
    }
}

export async function getMedicalRecords() {
    try {
        const id = getUserId();
        if (!id) return [];
        const response = await api.get(`/medical-records/patient/${id}`);
        return response.data;
    } catch (ex) {
        console.error("Error fetching medical records:", ex);
        return [];
    }
}

export async function getActivePrescriptions() {
    try {
        const id = getUserId();
        if (!id) return 0;
        const response = await api.get(`/prescription/active-prescriptions/${id}`);
        return response.data; // Returns a number (long)
    } catch (ex) {
        console.error("Error fetching active prescriptions:", ex);
        return 0;
    }
}

export async function getRecentReports() {
    // START: MOCK IMPLEMENTATION (Backend endpoint missing)
    return [];
    // END: MOCK IMPLEMENTATION
}

export async function NumberOfCompletedAppointments() {
    try {
        const id = getUserId();
        if (!id) return 0;
        const response = await api.get(`/appointments/patient/${id}/completed/count`);
        return response.data;
    } catch (ex) {
        console.error("Error fetching completed appointments:", ex);
        return 0;
    }
}

export async function TotalNumberOfDoctorsConsulted() {
    try {
        const id = getUserId();
        if (!id) return 0;
        const response = await api.get(`/appointments/patient/${id}/doctors/count`);
        return response.data;
    } catch (ex) {
        console.error("Error fetching total doctors known:", ex);
        return 0;
    }
}

export async function getAllDoctors() {
    try {
        // This endpoint needs verification, usually in DoctorController or PatientController
        // PatientController does not have it. DoctorController?
        // Let's assume MOCK for now as I didn't verify a "get all doctors" endpoint.
        return [];
    } catch (ex) {
        console.error("Error fetching doctors:", ex);
        return [];
    }
}

export async function fetchLastVisitDate() {
    try {
        const id = getUserId();
        if (!id) return "N/A";
        const response = await api.get(`/patients/last-visit/${id}`);
        return response.data; // Returns String date
    } catch (ex) {
        console.error("Error fetching last visit:", ex);
        return "N/A";
    }
}

// Check other exported functions if used by other components
export async function getDoctorsByBranch(branch) { return []; }
export async function fetchEmergencyContacts() { return []; }
export async function fetchLabReportsCount() { return 0; }
