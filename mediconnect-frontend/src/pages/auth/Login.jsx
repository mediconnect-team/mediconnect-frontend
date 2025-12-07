import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [role, setRole] = useState("Patient");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = login(role.toLowerCase(), email, password);

        if (!success) {
            setError("Invalid credentials");
            return;
        }

        navigate(`/${role.toLowerCase()}/dashboard`);
    };

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

                {/* Form */}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    {/* Role Select */}
                    <label className="fw-semibold mb-1">Login as</label>
                    <select
                        className="form-select mb-3"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={{ padding: "10px", borderRadius: "10px" }}
                    >
                        <option>Patient</option>
                        <option>Doctor</option>
                        <option>Admin</option>
                    </select>

                    {/* Email */}
                    <label className="fw-semibold mb-1">Email Address</label>
                    <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        required
                        style={{ padding: "10px", borderRadius: "10px" }}
                    />

                    {/* Sign In Button */}
                    <button className="btn btn-dark w-100 py-2" style={{ borderRadius: "10px" }}>
                        Sign In
                    </button>
                </form>

                {/* Register Link */}
                <div className="text-center mt-3">
                    <small>Don't have an account?</small>
                    <br />

                    <button
                        className="btn btn-outline-primary mt-2"
                        style={{ borderRadius: "10px", width: "120px" }}
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}
