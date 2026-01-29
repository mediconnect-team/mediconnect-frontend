import { useAuthContext } from "../context/AuthContext";

/**
 * Authentication Hook
 * 
 * Provides easy access to authentication state and methods.
 * This is the recommended way to access auth functionality in components.
 * 
 * Returns:
 * - user: Current user object with role-specific IDs
 * - userId: Base user ID
 * - patientId: Patient ID (if role is PATIENT)
 * - doctorId: Doctor ID (if role is DOCTOR)
 * - adminId: Admin ID (if role is ADMIN)
 * - role: User role string
 * - isAuthenticated: Boolean indicating if user is logged in
 * - isLoading: Boolean indicating if auth operation is in progress
 * - isInitialized: Boolean indicating if auth state has been initialized
 * - error: Error message from last failed operation
 * - login: Function to log in user
 * - logout: Function to log out user
 * - registerPatient: Function to register a new patient
 * - clearAuthError: Function to clear error state
 * - getRoleSpecificId: Function to get the appropriate ID for user's role
 * - hasRole: Function to check if user has a specific role
 * 
 * Usage:
 * const { user, login, logout, isAuthenticated, patientId } = useAuth();
 * 
 * @author MediConnect Team
 */
export default function useAuth() {
    return useAuthContext();
}
