import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

/**
 * Login Component
 * 
 * Handles user authentication for all roles (Patient, Doctor, Admin).
 * Integrates with the backend authentication API and redirects users
 * to their role-specific dashboards upon successful login.
 * 
 * Features:
 * - Role selection (Patient, Doctor, Admin)
 * - Form validation
 * - Error handling with user-friendly messages
 * - Loading state during authentication
 * - Automatic redirect for authenticated users
 * 
 * @author MediConnect Team
 */
export default function Login() {
    const { login, isAuthenticated, isLoading, error, clearAuthError, user } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [localError, setLocalError] = useState("");

    // Redirect authenticated users to their dashboard
    useEffect(() => {
        if (isAuthenticated && user) {
            const rolePath = getRolePath(user.role);
            navigate(`/${rolePath}/dashboard`, { replace: true });
        }
    }, [isAuthenticated, user, navigate]);

    // Clear errors when component mounts
    useEffect(() => {
        clearAuthError();
        setLocalError("");
    }, [clearAuthError]);

    /**
     * Get route path based on user role
     */
    const getRolePath = (role) => {
        switch (role) {
            case 'ROLE_PATIENT':
                return 'patient';
            case 'ROLE_DOCTOR':
                return 'doctor';
            case 'ROLE_ADMIN':
                return 'admin';
            default:
                return 'patient';
        }
    };

    /**
     * Handle form submission
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError("");

        // Basic validation
        if (!email.trim()) {
            setLocalError("Please enter your email address");
            return;
        }

        if (!password.trim()) {
            setLocalError("Please enter your password");
            return;
        }

        // Attempt login
        const result = await login(email, password);

        if (result.success) {
            toast.success(`Welcome back, ${result.user.name}!`);
            const rolePath = getRolePath(result.user.role);
            navigate(`/${rolePath}/dashboard`, { replace: true });
        } else {
            setLocalError(result.error || "Login failed. Please try again.");
            toast.error(result.error || "Login failed");
        }
    };

    // Display error message (local or from Redux)
    const displayError = localError || error;

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh", background: "#f5f8ff" }}
        >
            <div
                className="card p-4 shadow-lg"
                style={{ width: "420px", borderRadius: "14px" }}
            >
                {/* Icon */}
                <div className="text-center mb-3">
                    <i
                        className="bi bi-heart-pulse"
                        style={{ fontSize: "3rem", color: "#121212" }}
                    ></i>
                </div>

                {/* Title */}
                <h3 className="text-center fw-bold mb-4">MedCare HMS Login</h3>

                {/* Error Alert */}
                {displayError && (
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        <div>{displayError}</div>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <label className="fw-semibold mb-1">Email Address</label>
                    <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        required
                        style={{ padding: "10px", borderRadius: "10px" }}
                    />

                    {/* Password */}
                    <label className="fw-semibold mb-1">Password</label>
                    <input
                        type="password"
                        className="form-control mb-4"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        required
                        style={{ padding: "10px", borderRadius: "10px" }}
                    />

                    {/* Sign In Button */}
                    <button 
                        className="btn btn-dark w-100 py-2" 
                        style={{ borderRadius: "10px" }}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Signing In...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                {/* Info text */}
                <div className="text-center mt-3 text-muted small">
                    <i className="bi bi-info-circle me-1"></i>
                    Your dashboard will be shown based on your account role
                </div>

                {/* Register Link */}
                <div className="text-center mt-3">
                    <small>Don't have an account?</small>
                    <br />

                    <button
                        className="btn btn-outline-primary mt-2"
                        style={{ borderRadius: "10px", width: "120px" }}
                        onClick={() => navigate("/register")}
                        disabled={isLoading}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}
