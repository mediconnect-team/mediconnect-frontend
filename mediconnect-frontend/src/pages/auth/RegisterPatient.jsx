import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Register() {
    const navigate = useNavigate();
    const { registerUser } = useAuth(); // This will work once backend arrives

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        dob: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // Mock success (until backend)
        alert("Registration successful!");
        navigate("/login");
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh", background: "#f5f8ff" }}
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

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <label className="fw-semibold">Full Name</label>
                    <input
                        name="name"
                        type="text"
                        className="form-control mb-3"
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    {/* Email */}
                    <label className="fw-semibold">Email Address</label>
                    <input
                        name="email"
                        type="email"
                        className="form-control mb-3"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    {/* Phone */}
                    <label className="fw-semibold">Phone Number</label>
                    <input
                        name="phone"
                        type="text"
                        className="form-control mb-3"
                        placeholder="Enter your phone number"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />

                    {/* Address */}
                    <label className="fw-semibold">Address</label>
                    <input
                        name="address"
                        type="text"
                        className="form-control mb-3"
                        placeholder="Enter your full address"
                        value={form.address}
                        onChange={handleChange}
                        required
                    />

                    {/* DOB */}
                    <label className="fw-semibold">Date of Birth</label>
                    <input
                        name="dob"
                        type="date"
                        className="form-control mb-3"
                        value={form.dob}
                        onChange={handleChange}
                        required
                    />

                    {/* Password */}
                    <label className="fw-semibold">Password</label>
                    <input
                        name="password"
                        type="password"
                        className="form-control mb-3"
                        placeholder="Create a password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    {/* Confirm Password */}
                    <label className="fw-semibold">Confirm Password</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        className="form-control mb-4"
                        placeholder="Confirm your password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    {/* Submit */}
                    <button
                        className="btn btn-dark w-100 py-2 mb-3"
                        style={{ borderRadius: "10px" }}
                    >
                        Create Account
                    </button>
                </form>

                {/* Link to Login */}
                <div className="text-center">
                    <span className="text-muted">Already have an account?</span>{" "}
                    <a
                        className="fw-bold"
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
