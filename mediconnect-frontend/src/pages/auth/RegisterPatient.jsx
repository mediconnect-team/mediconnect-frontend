import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

/**
 * Patient Registration Component
 * 
 * Allows new patients to self-register for the healthcare system.
 * Integrates with the backend API to create both User and Patient records.
 * 
 * Features:
 * - Form validation
 * - Password confirmation
 * - Error handling with user-friendly messages
 * - Loading state during registration
 * - Automatic redirect to login after successful registration
 * 
 * @author MediConnect Team
 */
export default function Register() {
    const navigate = useNavigate();
    const { registerPatient, isLoading } = useAuth();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        dob: "",
        gender: "",
        bloodGroup: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        if (error) setError("");
    };

    const validateForm = () => {
        if (!form.name.trim()) {
            setError("Please enter your full name");
            return false;
        }

        if (!form.email.trim()) {
            setError("Please enter your email address");
            return false;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setError("Please enter a valid email address");
            return false;
        }

        if (!form.phone.trim()) {
            setError("Please enter your phone number");
            return false;
        }

        // Basic phone validation (10+ digits)
        const phoneRegex = /^\d{10,14}$/;
        if (!phoneRegex.test(form.phone.replace(/\D/g, ''))) {
            setError("Please enter a valid phone number (10-14 digits)");
            return false;
        }

        if (!form.dob) {
            setError("Please enter your date of birth");
            return false;
        }

        if (!form.password) {
            setError("Please enter a password");
            return false;
        }

        if (form.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) {
            return;
        }

        // Prepare registration data
        const registrationData = {
            name: form.name.trim(),
            email: form.email.trim().toLowerCase(),
            phone: form.phone.trim(),
            address: form.address.trim(),
            dob: form.dob,
            gender: form.gender || null,
            bloodGroup: form.bloodGroup || null,
            password: form.password,
        };

        const result = await registerPatient(registrationData);

        if (result.success) {
            toast.success("Registration successful! Please login to continue.");
            navigate("/login");
        } else {
            setError(result.error || "Registration failed. Please try again.");
            toast.error(result.error || "Registration failed");
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh", background: "#f5f8ff", padding: "20px 0" }}
        >
            <div
                className="card p-4 shadow-lg"
                style={{ width: "650px", borderRadius: "14px" }}
            >
                {/* ICON */}
                <div className="text-center mb-2">
                    <i
                        className="bi bi-stethoscope"
                        style={{ fontSize: "3rem", color: "#121212" }}
                    ></i>
                </div>

                {/* TITLE */}
                <h2 className="text-center fw-bold">Patient Registration</h2>
                <p className="text-center text-muted mb-4">
                    Create your patient account to access our services
                </p>

                {/* Role Banner */}
                <div
                    className="p-3 mb-4"
                    style={{
                        background: "#eef4ff",
                        borderRadius: "10px",
                        border: "1px solid #d6e4ff",
                    }}
                >
                    <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-person"></i>
                        <strong>Registering as Patient</strong>
                    </div>
                    <p className="text-muted small mb-0 ms-4">
                        Healthcare staff accounts are created by hospital administrators
                    </p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        <div>{error}</div>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Row 1: Name and Email */}
                    <div className="row">
                        <div className="col-md-6">
                            <label className="fw-semibold">Full Name <span className="text-danger">*</span></label>
                            <input
                                name="name"
                                type="text"
                                className="form-control mb-3"
                                placeholder="Enter your full name"
                                value={form.name}
                                onChange={handleChange}
                                disabled={isLoading}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="fw-semibold">Email Address <span className="text-danger">*</span></label>
                            <input
                                name="email"
                                type="email"
                                className="form-control mb-3"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange}
                                disabled={isLoading}
                                required
                            />
                        </div>
                    </div>

                    {/* Row 2: Phone and DOB */}
                    <div className="row">
                        <div className="col-md-6">
                            <label className="fw-semibold">Phone Number <span className="text-danger">*</span></label>
                            <input
                                name="phone"
                                type="tel"
                                className="form-control mb-3"
                                placeholder="Enter your phone number"
                                value={form.phone}
                                onChange={handleChange}
                                disabled={isLoading}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="fw-semibold">Date of Birth <span className="text-danger">*</span></label>
                            <input
                                name="dob"
                                type="date"
                                className="form-control mb-3"
                                value={form.dob}
                                onChange={handleChange}
                                disabled={isLoading}
                                required
                            />
                        </div>
                    </div>

                    {/* Row 3: Gender and Blood Group */}
                    <div className="row">
                        <div className="col-md-6">
                            <label className="fw-semibold">Gender</label>
                            <select
                                name="gender"
                                className="form-select mb-3"
                                value={form.gender}
                                onChange={handleChange}
                                disabled={isLoading}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="fw-semibold">Blood Group</label>
                            <select
                                name="bloodGroup"
                                className="form-select mb-3"
                                value={form.bloodGroup}
                                onChange={handleChange}
                                disabled={isLoading}
                            >
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                    </div>

                    {/* Address */}
                    <label className="fw-semibold">Address</label>
                    <textarea
                        name="address"
                        className="form-control mb-3"
                        placeholder="Enter your full address"
                        value={form.address}
                        onChange={handleChange}
                        disabled={isLoading}
                        rows="2"
                    />

                    {/* Row 4: Passwords */}
                    <div className="row">
                        <div className="col-md-6">
                            <label className="fw-semibold">Password <span className="text-danger">*</span></label>
                            <input
                                name="password"
                                type="password"
                                className="form-control mb-3"
                                placeholder="Create a password (min 6 chars)"
                                value={form.password}
                                onChange={handleChange}
                                disabled={isLoading}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="fw-semibold">Confirm Password <span className="text-danger">*</span></label>
                            <input
                                name="confirmPassword"
                                type="password"
                                className="form-control mb-3"
                                placeholder="Confirm your password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                disabled={isLoading}
                                required
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        className="btn btn-dark w-100 py-2 mb-3"
                        style={{ borderRadius: "10px" }}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Creating Account...
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                {/* Link to Login */}
                <div className="text-center">
                    <span className="text-muted">Already have an account?</span>{" "}
                    <a
                        className="fw-bold text-primary"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/login")}
                    >
                        Sign in
                    </a>
                </div>
            </div>
        </div>
    );
}
