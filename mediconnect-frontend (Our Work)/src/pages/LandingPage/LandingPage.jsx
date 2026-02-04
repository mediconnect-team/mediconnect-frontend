import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-color)", minHeight: "100vh" }}>

      <nav className="navbar navbar-expand-lg border-bottom sticky-top" style={{ backgroundColor: "var(--sidebar-bg)", borderColor: "var(--border-color) !important" }}>
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center fw-bold fs-4" to="/" style={{ color: "var(--text-color)" }}>
            <span className="text-primary me-2">❤️</span> MedCare HMS
          </Link>

          <div className="ms-auto d-flex gap-3">
            <a href="#about" className="fw-bold me-4 text-decoration-none align-self-center" style={{ color: "var(--text-color)" }}>About</a>
            <Link to='/login' className="btn btn-dark px-4">Login</Link>
            <Link to='/register' className="btn btn-primary px-4">Get Started</Link>
          </div>
        </div>
      </nav>


      <section
        className="text-center py-5 d-flex align-items-center"
        style={{ 
          background: "linear-gradient(180deg, var(--alert-info-bg) 0%, var(--bg-color) 100%)", 
          minHeight: "80vh" 
        }}
      >
        <Container>
          <div className="d-inline-block px-4 py-2 rounded-pill shadow-sm mb-3" style={{ backgroundColor: "var(--card-bg)" }}>
            <span className="text-primary fw-semibold">
              ⚕️ Advanced Healthcare Management
            </span>
          </div>

          <h1 className="fw-bold display-4 mt-3" style={{ color: "var(--heading-color)" }}>
            Complete Hospital Management{" "}
            <span className="text-primary">Made Simple</span>
          </h1>

          <p className="fs-5 mt-3 mx-auto" style={{ maxWidth: "650px", color: "var(--text-muted)" }}>
            Streamline your healthcare operations with our comprehensive hospital
            management system. Patients can register online, while healthcare staff
            accounts are managed by administrators.
          </p>

          <div className="mt-4 d-flex justify-content-center gap-3">
            <Link to="/register" className="btn btn-primary btn-lg px-4 py-2">
              Register as Patient
            </Link>
            <Button variant="outline-dark" size="lg" className="px-4 py-2" style={{ color: "var(--text-color)", borderColor: "var(--border-color)" }}>
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <Row className="text-center mt-5 pt-4">
            <Col>
              <h2 className="text-primary fw-bold">10,000+</h2>
              <p style={{ color: "var(--text-muted)" }}>Patients Served</p>
            </Col>

            <Col>
              <h2 className="text-primary fw-bold">500+</h2>
              <p style={{ color: "var(--text-muted)" }}>Healthcare Providers</p>
            </Col>

            <Col>
              <h2 className="text-primary fw-bold">99.9%</h2>
              <p style={{ color: "var(--text-muted)" }}>System Uptime</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Everything You Need Section */}
      <section className="py-5" id="about" style={{ backgroundColor: "var(--bg-color)" }}>
        <Container>
          <h2 className="text-center fw-bold display-6 mb-3" style={{ color: "var(--heading-color)" }}>Everything You Need in One Platform</h2>
          <p className="text-center fs-5 mx-auto mb-5" style={{ maxWidth: "800px", color: "var(--text-muted)" }}>
            Our integrated solution covers all aspects of hospital management, from
            patient care to administrative operations.
          </p>

          {/* Feature Cards - Row 1 */}
          <Row className="g-4">
            <Col md={4}>
              <Card className="p-4 shadow-sm border-0 rounded-4 h-100" style={{ backgroundColor: "var(--card-bg)" }}>
                <div className="bg-light text-primary p-3 rounded-3 d-inline-block fs-4 mb-3" style={{ width: 'fit-content' }}>👥</div>
                <h5 className="fw-bold" style={{ color: "var(--heading-color)" }}>Patient Portal</h5>
                <p style={{ color: "var(--text-muted)" }}>
                  Complete patient management with scheduling, history, and payments.
                </p>
                <ul style={{ color: "var(--text-muted)" }}>
                  <li>Online appointment booking</li>
                  <li>Medical history access</li>
                  <li>Secure payment processing</li>
                  <li>Prescription tracking</li>
                </ul>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="p-4 shadow-sm border-0 rounded-4 h-100" style={{ backgroundColor: "var(--card-bg)" }}>
                <div className="bg-light text-success p-3 rounded-3 d-inline-block fs-4 mb-3" style={{ width: 'fit-content' }}>📈</div>
                <h5 className="fw-bold" style={{ color: "var(--heading-color)" }}>Doctor Dashboard</h5>
                <p style={{ color: "var(--text-muted)" }}>
                  Tools for healthcare providers to manage patients and workflows.
                </p>
                <ul style={{ color: "var(--text-muted)" }}>
                  <li>Patient report management</li>
                  <li>Prescription writing</li>
                  <li>Appointment oversight</li>
                  <li>Clinical documentation</li>
                </ul>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="p-4 shadow-sm border-0 rounded-4 h-100" style={{ backgroundColor: "var(--card-bg)" }}>
                <div className="bg-light text-info p-3 rounded-3 d-inline-block fs-4 mb-3" style={{ width: 'fit-content', color: '#8b5cf6 !important' }}>🛡️</div>
                <h5 className="fw-bold" style={{ color: "var(--heading-color)" }}>Admin Control</h5>
                <p style={{ color: "var(--text-muted)" }}>
                  Full administrative oversight with staff and system monitoring.
                </p>
                <ul style={{ color: "var(--text-muted)" }}>
                  <li>Staff management</li>
                  <li>System analytics</li>
                  <li>Revenue tracking</li>
                  <li>Department oversight</li>
                </ul>
              </Card>
            </Col>
          </Row>

          {/* Feature Cards - Row 2 */}
          <Row className="mt-2 g-4">
            <Col md={4}>
              <Card className="p-4 shadow-sm border-0 rounded-4 h-100" style={{ backgroundColor: "var(--card-bg)" }}>
                <div className="bg-light text-warning p-3 rounded-3 d-inline-block fs-4 mb-3" style={{ width: 'fit-content' }}>📅</div>
                <h5 className="fw-bold" style={{ color: "var(--heading-color)" }}>Smart Scheduling</h5>
                <p style={{ color: "var(--text-muted)" }}>
                  Advanced scheduling with reminders and conflict resolution.
                </p>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="p-4 shadow-sm border-0 rounded-4 h-100" style={{ backgroundColor: "var(--card-bg)" }}>
                <div className="bg-light text-danger p-3 rounded-3 d-inline-block fs-4 mb-3" style={{ width: 'fit-content' }}>📄</div>
                <h5 className="fw-bold" style={{ color: "var(--heading-color)" }}>Medical Records</h5>
                <p style={{ color: "var(--text-muted)" }}>
                  Secure electronic health records with easy access and compliance.
                </p>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="p-4 shadow-sm border-0 rounded-4 h-100" style={{ backgroundColor: "var(--card-bg)" }}>
                <div className="bg-light text-primary p-3 rounded-3 d-inline-block fs-4 mb-3" style={{ width: 'fit-content' }}>⏰</div>
                <h5 className="fw-bold" style={{ color: "var(--heading-color)" }}>24/7 Support</h5>
                <p style={{ color: "var(--text-muted)" }}>
                  Round-the-clock technical support and system monitoring.
                </p>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Blue CTA Section */}
      <section className="text-center py-5" style={{ backgroundColor: "#0d6efd", color: "white" }}>
        <Container>
          <h2 className="fw-bold display-5 mb-4">Ready to Transform Your Healthcare Operations?</h2>
          <p className="fs-5 mb-5" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
            Join thousands of healthcare providers who trust MedCare HMS.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/register" className="btn btn-light btn-lg px-5 py-3 fw-bold text-primary rounded-pill shadow">
              Register as Patient
            </Link>
            <Link to="/learn-more" className="btn btn-outline-light btn-lg px-5 py-3 fw-bold rounded-pill shadow">
              Learn More
            </Link>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-5 text-center" style={{ background: "var(--sidebar-bg)", borderTop: "1px solid var(--border-color)" }}>
        <Container>
          <h4 className="fw-bold mb-3" style={{ color: "var(--heading-color)" }}>
            ❤️ MedCare HMS
          </h4>
          <p className="mb-4" style={{ color: "var(--text-muted)" }}>
            Comprehensive hospital management for the modern healthcare environment.
          </p>

          <div className="d-flex justify-content-center gap-4">
            <a href="#" className="text-decoration-none" style={{ color: "var(--text-muted)" }}>About Us</a>
            <a href="#" className="text-decoration-none" style={{ color: "var(--text-muted)" }}>Privacy Policy</a>
            <a href="#" className="text-decoration-none" style={{ color: "var(--text-muted)" }}>Terms of Service</a>
            <a href="#" className="text-decoration-none" style={{ color: "var(--text-muted)" }}>Contact</a>
          </div>
          <p className="mt-4 small mb-0" style={{ color: "var(--text-muted)" }}>
            © 2026 MedCare HMS. All rights reserved.
          </p>
        </Container>
      </footer>
    </div>
  );
}
