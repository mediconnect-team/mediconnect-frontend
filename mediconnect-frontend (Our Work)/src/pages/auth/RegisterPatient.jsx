import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { UserPlus, User, Mail, Phone, Calendar, Droplet, Users, Lock, MapPin } from "lucide-react";

export default function Register() {
    const navigate = useNavigate();
    const { registerPatient } = useAuth();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        dob: "",
        bloodGroup: "",
        gender: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        
        // Remove confirmPassword and prepare payload for backend
        const { confirmPassword, ...registrationData } = form;
        
        // Convert empty DOB to null to prevent validation errors
        const payload = {
            ...registrationData,
            dob: registrationData.dob || null,
            userRole: "ROLE_PATIENT"
        };
        
        const result = await registerPatient(payload);
        setLoading(false);

        if (result.success) {
            toast.success("Registration successful! Please login.");
            navigate("/login");
        } else {
            const errorMessage = result.error || "Registration failed. Try again.";
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    return (
        <div style={{ backgroundColor: "var(--bg-color)", minHeight: "100vh", display: "flex", alignItems: "center", padding: "40px 0" }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="shadow-lg border-0 rounded-4" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}>
                            <Card.Body className="p-5">
                                <div className="text-center mb-4">
                                    <div className="d-inline-flex p-3 rounded-circle bg-primary bg-opacity-10 mb-3">
                                        <UserPlus size={32} className="text-primary" />
                                    </div>
                                    <h2 className="fw-bold" style={{ color: "var(--heading-color)" }}>Patient Registration</h2>
                                    <p style={{ color: "var(--text-muted)" }}>Create your secure patient account</p>
                                </div>

                                {error && (
                                    <Alert variant="danger" className="border-0 mb-4" style={{ backgroundColor: "rgba(220, 38, 38, 0.1)", color: "#dc2626" }}>
                                        {error}
                                    </Alert>
                                )}

                                <Form onSubmit={handleSubmit}>
                                    <h6 className="fw-bold mb-3 border-bottom pb-2" style={{ color: "var(--heading-color)" }}>Basic Information</h6>
                                    
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small fw-semibold">Full Name</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: "var(--border-color)" }}>
                                                <User size={18} style={{ color: "var(--text-muted)" }} />
                                            </span>
                                            <Form.Control
                                                name="name"
                                                type="text"
                                                className="bg-transparent border-start-0 ps-0"
                                                style={{ borderColor: "var(--border-color)", color: "var(--text-color)" }}
                                                placeholder="Enter your full name"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </Form.Group>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="small fw-semibold">Email</Form.Label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: "var(--border-color)" }}>
                                                        <Mail size={18} style={{ color: "var(--text-muted)" }} />
                                                    </span>
                                                    <Form.Control
                                                        name="email"
                                                        type="email"
                                                        className="bg-transparent border-start-0 ps-0"
                                                        style={{ borderColor: "var(--border-color)", color: "var(--text-color)" }}
                                                        placeholder="Email"
                                                        value={form.email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="small fw-semibold">Phone</Form.Label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: "var(--border-color)" }}>
                                                        <Phone size={18} style={{ color: "var(--text-muted)" }} />
                                                    </span>
                                                    <Form.Control
                                                        name="phone"
                                                        type="text"
                                                        className="bg-transparent border-start-0 ps-0"
                                                        style={{ borderColor: "var(--border-color)", color: "var(--text-color)" }}
                                                        placeholder="Phone"
                                                        value={form.phone}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <h6 className="fw-bold mb-3 mt-4 border-bottom pb-2" style={{ color: "var(--heading-color)" }}>Personal Details</h6>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="small fw-semibold">Gender</Form.Label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: "var(--border-color)" }}>
                                                        <Users size={18} style={{ color: "var(--text-muted)" }} />
                                                    </span>
                                                    <Form.Select
                                                        name="gender"
                                                        className="bg-transparent border-start-0 ps-0"
                                                        style={{ borderColor: "var(--border-color)", color: "var(--text-color)" }}
                                                        value={form.gender}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Other">Other</option>
                                                    </Form.Select>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="small fw-semibold">Blood Group</Form.Label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: "var(--border-color)" }}>
                                                        <Droplet size={18} style={{ color: "var(--text-muted)" }} />
                                                    </span>
                                                    <Form.Select
                                                        name="bloodGroup"
                                                        className="bg-transparent border-start-0 ps-0"
                                                        style={{ borderColor: "var(--border-color)", color: "var(--text-color)" }}
                                                        value={form.bloodGroup}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="A+">A+</option>
                                                        <option value="A-">A-</option>
                                                        <option value="B+">B+</option>
                                                        <option value="B-">B-</option>
                                                        <option value="AB+">AB+</option>
                                                        <option value="AB-">AB-</option>
                                                        <option value="O+">O+</option>
                                                        <option value="O-">O-</option>
                                                    </Form.Select>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="small fw-semibold">Date of Birth</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: "var(--border-color)" }}>
                                                <Calendar size={18} style={{ color: "var(--text-muted)" }} />
                                            </span>
                                            <Form.Control
                                                name="dob"
                                                type="date"
                                                className="bg-transparent border-start-0 ps-0"
                                                style={{ borderColor: "var(--border-color)", color: "var(--text-color)" }}
                                                value={form.dob}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="small fw-semibold">Address</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: "var(--border-color)" }}>
                                                <MapPin size={18} style={{ color: "var(--text-muted)" }} />
                                            </span>
                                            <Form.Control
                                                name="address"
                                                type="text"
                                                className="bg-transparent border-start-0 ps-0"
                                                style={{ borderColor: "var(--border-color)", color: "var(--text-color)" }}
                                                placeholder="Street address"
                                                value={form.address}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </Form.Group>

                                    <h6 className="fw-bold mb-3 mt-4 border-bottom pb-2" style={{ color: "var(--heading-color)" }}>Security</h6>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-4">
                                                <Form.Label className="small fw-semibold">Password</Form.Label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: "var(--border-color)" }}>
                                                        <Lock size={18} style={{ color: "var(--text-muted)" }} />
                                                    </span>
                                                    <Form.Control
                                                        name="password"
                                                        type="password"
                                                        className="bg-transparent border-start-0 ps-0"
                                                        style={{ borderColor: "var(--border-color)", color: "var(--text-color)" }}
                                                        placeholder="Password"
                                                        value={form.password}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-4">
                                                <Form.Label className="small fw-semibold">Confirm Password</Form.Label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: "var(--border-color)" }}>
                                                        <Lock size={18} style={{ color: "var(--text-muted)" }} />
                                                    </span>
                                                    <Form.Control
                                                        name="confirmPassword"
                                                        type="password"
                                                        className="bg-transparent border-start-0 ps-0"
                                                        style={{ borderColor: "var(--border-color)", color: "var(--text-color)" }}
                                                        placeholder="Confirm"
                                                        value={form.confirmPassword}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Button 
                                        type="submit" 
                                        variant="primary" 
                                        className="w-100 py-3 fw-bold rounded-pill shadow-sm mb-4"
                                        disabled={loading}
                                    >
                                        {loading ? "Creating Account..." : "Create Account"}
                                    </Button>

                                    <div className="text-center">
                                        <span style={{ color: "var(--text-muted)" }}>Already have an account? </span>
                                        <Link to="/login" className="text-primary fw-bold text-decoration-none">
                                            Sign In
                                        </Link>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
