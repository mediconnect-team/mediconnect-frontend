import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, Alert } from "react-bootstrap";
import PageTitle from "../../components/common/PageTitle";
import StatCard from "../../components/patient/StatCard";
import AppointmentCard from "../../components/patient/AppointmentCard";
import ReportCard from "../../components/patient/ReportCard";
import PrescriptionCard from "../../components/patient/PrescriptionCard";

import DoctorRecommender from "../../components/patient/DoctorRecommender";
import DailyTip from "../../components/patient/DailyTip";
import HealthScore from "../../components/patient/HealthScore";
import BMIAnalytics from "../../components/patient/BMIAnalytics";
import HealthTrends from "../../components/patient/HealthTrends"; // Keep for now in case of rollback
import "./PatientDashboard.css";
import {
    getUpcomingAppointments,
    getActivePrescriptions,
    getPrescriptionsByPatientId,
    getActiveMedications
} from "../../services/patientApi";
import useAuth from "../../hooks/useAuth";

/**
 * Patient Dashboard Component
 * 
 * Displays an overview of the patient's health information including:
 * - Statistics (appointments, records, prescriptions)
 * - Upcoming appointments
 * - Recent reports
 * - Quick action buttons
 * 
 * Uses the patientId from auth context for all API calls.
 * 
 * @author MediConnect Team
 */
export default function PatientDashboard() {
    const navigate = useNavigate();
    const { user, patientId } = useAuth();

    // State for dashboard data
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [activePrescriptions, setActivePrescriptions] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [activeMedications, setActiveMedications] = useState([]);

    // Loading and error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Fetch all dashboard data
     */
    const fetchDashboardData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch all data in parallel for better performance
            const [appointments] = await Promise.allSettled([
                getUpcomingAppointments(patientId)
            ]);

            if (appointments.status === 'fulfilled' && appointments.value) {
                setUpcomingAppointments(appointments.value);
            }

            const prescriptionsResponse = await getPrescriptionsByPatientId(patientId);
            setPrescriptions(prescriptionsResponse);

            const medicationsResponse = await getActiveMedications();
            setActiveMedications(medicationsResponse);

        } catch (err) {
            console.error("Error fetching dashboard data:", err);
            setError("Failed to load some dashboard data. Please refresh the page.");
        } finally {
            setLoading(false);
        }
    }, [patientId]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    /**
     * Format date for display
     */
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    /**
     * Get user's first name for greeting
     */
    const getFirstName = () => {
        if (!user?.name) return 'Patient';
        return user.name.split(' ')[0];
    };

    // Calculate stats
    const appointmentCount = upcomingAppointments.length;

    return (
        <div className="container-fluid dashboard-gradient p-4">
            {/* Title - Uses actual user name */}
            <PageTitle
                title={`Welcome Back, ${getFirstName()}!`}
                subtitle="Here's an overview of your health information"
            />

            {/* Error Alert */}
            {error && (
                <Alert variant="warning" dismissible onClose={() => setError(null)} className="mb-4">
                    {error}
                </Alert>
            )}

            {/* Loading State */}
            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2 text-muted">Loading your dashboard...</p>
                </div>
            ) : (
                <>
                    {/* Top Section: Appointments & Health Trends */}
                    <div className="row g-4 mb-4">
                        {/* Left Column: Stats + Mini List */}
                        <div className="col-lg-5">
                            <div className="d-flex flex-column gap-4 h-100">
                                {/* Single Stat Card */}
                                <div className="glass-card p-4 d-flex align-items-center justify-content-between overflow-hidden position-relative" style={{ minHeight: '130px' }}>
                                    <div className="z-1">
                                        <h6 className="text-muted text-uppercase fw-semibold mb-1" style={{ letterSpacing: '0.5px', fontSize: '13px' }}>Upcoming Appointments</h6>
                                        <h2 className="display-4 fw-bold mb-0 text-primary">{appointmentCount}</h2>
                                        <div className="mt-2 small text-success fw-medium">
                                            <i className="bi bi-arrow-up-right me-1"></i>
                                            Live Schedule
                                        </div>
                                    </div>
                                    <div className="bg-primary bg-opacity-10 p-4 rounded-circle position-absolute" style={{ right: '-20px', top: '-10px', transform: 'scale(1.5)' }}>
                                        <i className="bi bi-calendar-check text-primary h1 mb-0"></i>
                                    </div>
                                </div>

                                {/* Recent Prescriptions List */}
                                <div className="glass-card p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h5 className="fw-bold mb-0 text-primary">
                                            <i className="bi bi-file-earmark-medical me-2"></i>Recent Prescriptions
                                        </h5>
                                        <button
                                            className="btn btn-link text-primary p-0 text-decoration-none small fw-medium"
                                            onClick={() => navigate('/patient/prescriptions')}
                                        >
                                            View All <i className="bi bi-arrow-right ms-1"></i>
                                        </button>
                                    </div>

                                    <div className="prescription-scroll-area">
                                        {!prescriptions || prescriptions.length === 0 ? (
                                            <div className="text-center py-4 bg-light bg-opacity-10 rounded-4 border border-dashed">
                                                <i className="bi bi-file-earmark-medical text-muted h2 mb-2 d-block"></i>
                                                <p className="text-muted small mb-0 fw-medium">No recent prescriptions available</p>
                                                <p className="text-muted extra-small mb-0">Your doctor's suggestions will appear here</p>
                                            </div>
                                        ) : (
                                            prescriptions.slice(0, 2).map((prescription) => (
                                                <PrescriptionCard
                                                    key={prescription.id}
                                                    doctor={prescription.doctorName || 'Doctor'}
                                                    date={formatDate(prescription.issuedAt)}
                                                    notes={prescription.notes}
                                                />
                                            ))
                                        )}
                                    </div>
                                </div>

                                {/* Mini Appointment List */}
                                <div className="glass-card p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h5 className="fw-bold mb-0">Upcoming Schedule</h5>
                                        <button
                                            className="btn btn-primary btn-sm rounded-pill px-3"
                                            onClick={() => navigate('/patient/appointments/1')}
                                        >
                                            + Book New
                                        </button>
                                    </div>

                                    <div className="appointment-scroll-area">
                                        {upcomingAppointments.length === 0 ? (
                                            <div className="text-center py-4">
                                                <i className="bi bi-calendar-x text-muted h1"></i>
                                                <p className="text-muted small mb-0">No upcoming appointments</p>
                                            </div>
                                        ) : (
                                            upcomingAppointments.slice(0, 2).map((appointment) => (
                                                <AppointmentCard
                                                    key={appointment.appointmentId}
                                                    doctor={appointment.doctorName || 'Doctor'}
                                                    dept={appointment.specialization || 'General'}
                                                    date={formatDate(appointment.appointmentDate)}
                                                    status={appointment.status || 'Scheduled'}
                                                />
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: BMI Analytics & Medications */}
                        <div className="col-lg-7">
                            <div className="row g-4 h-100">
                                <div className="col-md-4">
                                    <BMIAnalytics />
                                </div>
                                <div className="col-md-8">
                                    <div className="glass-card p-4 h-100">
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">
                                                <i className="bi bi-capsule text-primary"></i> Meds Schedule
                                            </h6>
                                            <button 
                                                className="btn btn-link text-primary p-0 text-decoration-none extra-small"
                                                onClick={() => navigate('/patient/medications')}
                                            >
                                                Manage <i className="bi bi-arrow-right"></i>
                                            </button>
                                        </div>

                                        <div className="medication-list-compact" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                            {activeMedications.length === 0 ? (
                                                <div className="text-center py-3 text-muted">
                                                    <p className="extra-small mb-0">No active reminders</p>
                                                </div>
                                            ) : (
                                                <div className="d-flex flex-column gap-2">
                                                    {activeMedications.map((med) => {
                                                        const timings = med.timings.split(',').map(t => t.trim()).sort();
                                                        return (
                                                            <div key={med.id} className="p-2 border rounded-3 bg-light bg-opacity-10 d-flex align-items-center gap-2">
                                                                <div className="p-1 bg-primary bg-opacity-10 rounded-2 text-primary">
                                                                    <i className="bi bi-capsule small"></i>
                                                                </div>
                                                                <div className="flex-grow-1 overflow-hidden">
                                                                    <div className="fw-bold extra-small text-truncate">{med.medicineName}</div>
                                                                    <div className="extra-small text-muted">{med.dosage}</div>
                                                                </div>
                                                                <div className="d-flex flex-wrap gap-1 justify-content-end" style={{ width: '80px' }}>
                                                                    {timings.slice(0, 2).map((time, i) => (
                                                                        <span key={i} className="badge bg-primary bg-opacity-10 text-primary border-primary border fw-normal" style={{ fontSize: '0.6rem' }}>
                                                                            {time}
                                                                        </span>
                                                                    ))}
                                                                    {timings.length > 2 && <span className="extra-small text-muted">+{timings.length - 2}</span>}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* Middle Section: Insights & Tools Row */}
                    <div className="row g-4 mb-4 align-items-stretch">
                        <div className="col-md-6">
                            <div className="h-100">
                                <DoctorRecommender />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="h-100">
                                <HealthScore />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section: Daily Insight */}
                    <div className="row g-4 mb-4">
                        <div className="col-12">
                            <DailyTip />
                        </div>
                    </div>


                </>
            )}
        </div>
    );
}
