import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { HeartPulse, Mail, Lock } from "lucide-react";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await login(email, password);
        setLoading(false);

        if (!result.success) {
            const errorMessage = result.error || "Invalid credentials or login failed.";
            setError(errorMessage);
            toast.error(errorMessage);
            return;
        }

        const user = result.user;
        toast.success(`Welcome back, ${user.name || 'User'}!`);

        if (user.role) {
            const roleForUrl = user.role.replace("ROLE_", "").toLowerCase();
            if (roleForUrl === 'admin') {
                navigate(`/admin/staff/directory`);
            } else {
                navigate(`/${roleForUrl}/dashboard`);
            }
        } else {
            setError("Login successful but role not found.");
            toast.warning("Login successful but role not found.");
        }
    };

    return (
        <div style={{ backgroundColor: "var(--bg-color)", minHeight: "100vh", display: "flex", alignItems: "center", padding: "40px 0" }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} lg={5}>
                        <Card className="shadow-lg border-0 rounded-4" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}>
                            <Card.Body className="p-5">
                                <div className="text-center mb-4">
                                    <div className="d-inline-flex p-3 rounded-circle bg-primary bg-opacity-10 mb-3">
                                        <HeartPulse size={32} className="text-primary" />
                                    </div>
                                    <h2 className="fw-bold" style={{ color: "var(--heading-color)" }}>Welcome Back</h2>
                                    <p style={{ color: "var(--text-muted)" }}>Sign in to your account to continue</p>
                                </div>

                                {error && (
                                    <Alert variant="danger" className="border-0 mb-4" style={{ backgroundColor: "rgba(220, 38, 38, 0.1)", color: "#dc2626" }}>
                                        {error}
                                    </Alert>
                                )}

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small fw-semibold">Email Address</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: "var(--border-color)" }}>
                                                <Mail size={18} style={{ color: "var(--text-muted)" }} />
                                            </span>
                                            <Form.Control
                                                type="email"
                                                className="bg-transparent border-start-0 ps-0"
                                                style={{ borderColor: "var(--border-color)", color: "var(--text-color)" }}
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                            <Form.Label className="small fw-semibold mb-0">Password</Form.Label>
                                            <Link to="#" className="small text-primary text-decoration-none fw-bold" onClick={() => toast.info("Forgot password coming soon!")}>
                                                Forgot?
                                            </Link>
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: "var(--border-color)" }}>
                                                <Lock size={18} style={{ color: "var(--text-muted)" }} />
                                            </span>
                                            <Form.Control
                                                type="password"
                                                className="bg-transparent border-start-0 ps-0"
                                                style={{ borderColor: "var(--border-color)", color: "var(--text-color)" }}
                                                placeholder="Enter password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </Form.Group>

                                    <Button 
                                        type="submit" 
                                        variant="primary" 
                                        className="w-100 py-3 fw-bold rounded-pill shadow-sm mb-4"
                                        disabled={loading}
                                    >
                                        {loading ? "Signing in..." : "Sign In"}
                                    </Button>

                                    <div className="text-center">
                                        <span style={{ color: "var(--text-muted)" }}>Don't have an account? </span>
                                        <Link to="/register" className="text-primary fw-bold text-decoration-none">
                                            Create Account
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
