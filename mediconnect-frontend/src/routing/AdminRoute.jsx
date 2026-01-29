import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AdminLayout from './../components/layout/AdminLayout';

/**
 * Admin Protected Route
 * 
 * Ensures only authenticated admins can access admin routes.
 * Redirects to login if not authenticated or unauthorized.
 * 
 * @author MediConnect Team
 */
export default function AdminRoute() {
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

    // Check if user has admin role (handles both 'ADMIN' and 'ROLE_ADMIN')
    if (!hasRole('ADMIN')) {
        return <Navigate to="/login" replace />;
    }

    return (
        <AdminLayout>
            <Outlet />
        </AdminLayout>
    );
}
