import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PatientLayout from "../components/layout/PatientLayout";

/**
 * Patient Protected Route
 * 
 * Ensures only authenticated patients can access patient routes.
 * Redirects to login if not authenticated or unauthorized.
 * 
 * @author MediConnect Team
 */
export default function PatientRoute() {
    const { user, isAuthenticated, isInitialized, isLoading, hasRole } = useAuth();

    // Show loading while checking authentication
    if (!isInitialized || isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    // Check if user has patient role (handles both 'PATIENT' and 'ROLE_PATIENT')
    if (!hasRole('PATIENT')) {
        return <Navigate to="/login" replace />;
    }

    return (
        <PatientLayout>
            <Outlet />
        </PatientLayout>
    );
}
