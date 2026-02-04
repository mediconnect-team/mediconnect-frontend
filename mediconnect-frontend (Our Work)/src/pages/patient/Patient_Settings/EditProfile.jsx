import React, { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import { User, Mail, Phone, MapPin, Calendar, Heart, Save } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import patientApi from "../../../services/patientApi";

export default function EditProfile() {
    const { user, patientId } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dob: "",
        address: "",
        gender: "",
        bloodGroup: ""
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await patientApi.getPatientProfile();
                setFormData(data);
            } catch (error) {
                console.error("Error fetching profile:", error);
                setMessage({ type: "danger", text: "Failed to load profile data." });
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: "", text: "" });
        
        try {
            await patientApi.updatePatientProfile(formData);
            setMessage({ type: "success", text: "Profile updated successfully!" });
        } catch (error) {
            console.error("Error updating profile:", error);
            setMessage({ type: "danger", text: "Failed to update profile." });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-muted">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="settings-container">
            {message.text && (
                <Alert variant={message.type} dismissible onClose={() => setMessage({ type: "", text: "" })} className="mb-4">
                    {message.text}
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col lg={8}>
                        <Card className="settings-card p-4 mb-4 border-0">
                            <h5 className="mb-4 d-flex align-items-center gap-2 fw-bold">
                                <User size={20} className="text-primary" /> Personal Information
                            </h5>

                            <Row className="mb-3">
                                <Col md={6} className="mb-3">
                                    <Form.Label className="form-label">Full Name</Form.Label>
                                    <div className="position-relative">
                                        <Form.Control
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Form.Label className="form-label">Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        readOnly
                                        style={{ backgroundColor: 'var(--card-inner-bg)', opacity: 0.7 }}
                                    />
                                    <small className="text-muted">Email cannot be changed</small>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={6} className="mb-3">
                                    <Form.Label className="form-label">Phone Number</Form.Label>
                                    <Form.Control
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 1234567890"
                                    />
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Form.Label className="form-label">Date of Birth</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>

                            <div className="mb-3">
                                <Form.Label className="form-label">Residential Address</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter your full address"
                                />
                            </div>
                        </Card>
                    </Col>

                    <Col lg={4}>
                        <Card className="settings-card p-4 mb-4 border-0">
                            <h5 className="mb-4 d-flex align-items-center gap-2 fw-bold">
                                <Heart size={20} className="text-danger" /> Health Vitals
                            </h5>
                            
                            <div className="mb-3">
                                <Form.Label className="form-label">Gender</Form.Label>
                                <Form.Select name="gender" value={formData.gender} onChange={handleChange}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Form.Select>
                            </div>

                            <div className="mb-3">
                                <Form.Label className="form-label">Blood Group</Form.Label>
                                <Form.Select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                                    <option value="">Select Blood Group</option>
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
                        </Card>

                        <div className="d-grid gap-2">
                            <Button variant="dark" type="submit" className="save-btn d-flex align-items-center justify-content-center gap-2" disabled={saving}>
                                {saving ? <Spinner size="sm" /> : <Save size={18} />}
                                {saving ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
