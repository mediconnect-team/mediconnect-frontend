import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './../hooks/useAuth';
import DoctorLayout from './../components/layout/DoctorLayout';

/**
 * Doctor Protected Route
 * 
 * Ensures only authenticated doctors can access doctor routes.
 * Redirects to login if not authenticated or unauthorized.
 * 
 * @author MediConnect Team
 */
function DoctorRoute() {
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

    // Check if user has doctor role (handles both 'DOCTOR' and 'ROLE_DOCTOR')
    if (!hasRole('DOCTOR')) {
        return <Navigate to="/login" replace />;
    }

    return (
        <DoctorLayout>
            <Outlet />
        </DoctorLayout>
    );
}

export default DoctorRoute;
