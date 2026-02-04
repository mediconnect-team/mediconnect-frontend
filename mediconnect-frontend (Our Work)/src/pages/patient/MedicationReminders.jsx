import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Modal, Badge, Spinner, Alert } from "react-bootstrap";
import { Plus, Edit2, Trash2, Bell, Clock, Calendar, CheckCircle, XCircle, Info, Pill, List, Activity, AlertCircle } from "lucide-react";
import patientApi from "../../services/patientApi";
import useAuth from "../../hooks/useAuth";
import PageTitle from "../../components/common/PageTitle";
import "./MedicationReminders.css";

export default function MedicationReminders() {
    const { patientId } = useAuth();
    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingMed, setEditingMed] = useState(null);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        medicineName: "",
        dosage: "",
        frequency: "Daily",
        timings: "",
        startDate: new Date().toISOString().split('T')[0],
        endDate: "",
        instructions: "",
        isActive: true
    });

    useEffect(() => {
        fetchMedications();
    }, [patientId]);

    const fetchMedications = async () => {
        try {
            setLoading(true);
            const data = await patientApi.getMedications();
            setMedications(data);
        } catch (err) {
            console.error("Error fetching medications:", err);
            setError("Failed to load medications. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleShowModal = (med = null) => {
        if (med) {
            setEditingMed(med);
            setFormData({
                medicineName: med.medicineName,
                dosage: med.dosage || "",
                frequency: med.frequency || "Daily",
                timings: med.timings || "",
                startDate: med.startDate || "",
                endDate: med.endDate || "",
                instructions: med.instructions || "",
                isActive: med.isActive
            });
        } else {
            setEditingMed(null);
            setFormData({
                medicineName: "",
                dosage: "",
                frequency: "Daily",
                timings: "",
                startDate: new Date().toISOString().split('T')[0],
                endDate: "",
                instructions: "",
                isActive: true
            });
        }
        setShowModal(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            // Validate timings format (HH:mm)
            const timingsList = formData.timings.split(',').map(t => t.trim());
            const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            
            const invalidTimes = timingsList.filter(t => !timeRegex.test(t));
            if (invalidTimes.length > 0) {
                setError(`Invalid time format: ${invalidTimes.join(', ')}. Please use HH:mm format (e.g., 08:00, 20:30)`);
                setSaving(false);
                return;
            }

            // Clean payload: convert empty strings to null for dates
            const payload = {
                ...formData,
                endDate: formData.endDate === "" ? null : formData.endDate,
                // Ensure timings are trimmed
                timings: timingsList.join(',')
            };

            if (editingMed) {
                await patientApi.updateMedication(editingMed.id, payload);
            } else {
                await patientApi.addMedication(payload);
            }
            setShowModal(false);
            fetchMedications();
        } catch (err) {
            console.error("Error saving medication:", err);
            alert("Failed to save medication.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this reminder?")) {
            try {
                await patientApi.deleteMedication(id);
                fetchMedications();
            } catch (err) {
                console.error("Error deleting medication:", err);
                alert("Failed to delete medication.");
            }
        }
    };

    const handleToggle = async (id) => {
        try {
            await patientApi.toggleMedication(id);
            fetchMedications();
        } catch (err) {
            console.error("Error toggling medication:", err);
        }
    };

    // Calculate quick stats
    const stats = {
        total: medications.length,
        active: medications.filter(m => m.isActive).length,
        today: medications.filter(m => m.isActive && m.frequency === 'Daily').length
    };

    if (loading && medications.length === 0) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-muted">Loading your medications...</p>
            </div>
        );
    }

    return (
        <Container fluid className="p-4 medication-page">
            {/* Header Section */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
                <PageTitle 
                    title="Medication Reminders" 
                    subtitle="Maintain your health with timely medication alerts"
                />
                <Button 
                    variant="primary" 
                    className="rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm"
                    onClick={() => handleShowModal()}
                >
                    <Plus size={20} /> <span className="fw-semibold">Add New Medicine</span>
                </Button>
            </div>

            {error && <Alert variant="danger" className="rounded-4 mb-4">{error}</Alert>}

            {/* Stats Row */}
            <Row className="mb-5 g-4">
                <Col md={4}>
                    <div className="med-stats-card p-4 d-flex align-items-center gap-4">
                        <div className="p-3 bg-primary bg-opacity-10 rounded-4 text-primary">
                            <List size={28} />
                        </div>
                        <div>
                            <div className="text-muted small fw-medium uppercase">Total Medicines</div>
                            <div className="h2 fw-bold mb-0">{stats.total}</div>
                        </div>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="med-stats-card p-4 d-flex align-items-center gap-4">
                        <div className="p-3 bg-success bg-opacity-10 rounded-4 text-success">
                            <Activity size={28} />
                        </div>
                        <div>
                            <div className="text-muted small fw-medium">Active Reminders</div>
                            <div className="h2 fw-bold mb-0">{stats.active}</div>
                        </div>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="med-stats-card p-4 d-flex align-items-center gap-4">
                        <div className="p-3 bg-info bg-opacity-10 rounded-4 text-info">
                            <Clock size={28} />
                        </div>
                        <div>
                            <div className="text-muted small fw-medium">Daily Doses</div>
                            <div className="h2 fw-bold mb-0">{stats.today}</div>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* Medication Grid */}
            <h4 className="section-title">Your Medication List</h4>
            
            {medications.length === 0 ? (
                <div className="med-empty-state">
                    <div className="empty-icon-wrapper shadow-inner">
                        <Pill size={60} strokeWidth={1} />
                    </div>
                    <h3 className="fw-bold">No medications yet</h3>
                    <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '400px' }}>
                        Start by adding the medications you take regularly. We'll help you stay on track with timely reminders.
                    </p>
                    <Button variant="primary" className="rounded-pill px-5 py-2" onClick={() => handleShowModal()}>
                        Add Your First Medication
                    </Button>
                </div>
            ) : (
                <Row className="g-4">
                    {medications.map((med) => (
                        <Col key={med.id} xl={4} lg={6}>
                            <div className={`med-grid-card p-4 ${!med.isActive ? 'inactive' : ''}`}>
                                <div className="d-flex justify-content-between align-items-start mb-4">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="med-icon-box shadow-sm">
                                            <Pill size={24} />
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-1">{med.medicineName}</h5>
                                            <Badge bg="primary" className="bg-opacity-10 text-primary border-primary border fw-normal">
                                                {med.dosage}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-1">
                                        <Button variant="link" className="p-2 text-primary" onClick={() => handleShowModal(med)}>
                                            <Edit2 size={18} />
                                        </Button>
                                        <Button variant="link" className="p-2 text-danger" onClick={() => handleDelete(med.id)}>
                                            <Trash2 size={18} />
                                        </Button>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="text-muted small fw-medium mb-2 d-flex align-items-center gap-2">
                                        <Calendar size={14} /> Frequency: {med.frequency}
                                    </div>
                                    <div className="d-flex flex-wrap gap-2">
                                        {med.timings.split(',').map((time, idx) => (
                                            <div key={idx} className="timing-badge">
                                                <Clock size={14} className="text-primary" />
                                                {time.trim()}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {med.instructions && (
                                    <div className="instruction-box mb-4">
                                        <div className="d-flex align-items-center gap-2 mb-1 fw-semibold small">
                                            <Info size={14} /> Instructions
                                        </div>
                                        {med.instructions}
                                    </div>
                                )}

                                <div className="d-flex justify-content-between align-items-center pt-3 border-top border-dashed">
                                    <span className={`small fw-bold ${med.isActive ? 'text-success' : 'text-muted'}`}>
                                        {med.isActive ? 'REMINDER ACTIVE' : 'REMINDER OFF'}
                                    </span>
                                    <Form.Check 
                                        type="switch"
                                        className="custom-switch"
                                        id={`active-switch-${med.id}`}
                                        checked={med.isActive}
                                        onChange={() => handleToggle(med.id)}
                                    />
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            )}

            {/* Premium Add/Edit Modal */}
            <Modal 
                show={showModal} 
                onHide={() => setShowModal(false)} 
                centered 
                size="lg"
                className="premium-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold h3">
                        {editingMed ? "Update Reminder" : "New Medication"}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSave}>
                    <Modal.Body>
                        <Alert variant="info" className="rounded-4 mb-4 small d-flex align-items-center gap-3">
                            <AlertCircle size={20} />
                            Ensure timings are accurate to receive reminders on time.
                        </Alert>
                        
                        <Row className="mb-4">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-bold mb-2">Medicine Name</Form.Label>
                                    <Form.Control 
                                        required 
                                        className="form-control-lg rounded-3"
                                        placeholder="e.g., Paracetamol"
                                        value={formData.medicineName}
                                        onChange={(e) => setFormData({...formData, medicineName: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-bold mb-2">Dosage</Form.Label>
                                    <Form.Control 
                                        className="form-control-lg rounded-3"
                                        placeholder="e.g., 500mg, 1 tablet"
                                        value={formData.dosage}
                                        onChange={(e) => setFormData({...formData, dosage: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-bold mb-2">Frequency</Form.Label>
                                    <Form.Select 
                                        className="form-select-lg rounded-3"
                                        value={formData.frequency}
                                        onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                                    >
                                        <option>Daily</option>
                                        <option>Weekly</option>
                                        <option>Monthly</option>
                                        <option>As Needed (PRN)</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-bold mb-2">Timings (24h format)</Form.Label>
                                    <Form.Control 
                                        required
                                        className="form-control-lg rounded-3"
                                        placeholder="e.g., 08:00, 14:00, 20:00"
                                        value={formData.timings}
                                        onChange={(e) => setFormData({...formData, timings: e.target.value})}
                                    />
                                    <Form.Text className="text-muted">Separate multiple times with a comma</Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-4 text-start">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-bold mb-2">Start Date</Form.Label>
                                    <Form.Control 
                                        type="date"
                                        className="form-control-lg rounded-3"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-bold mb-2">End Date (Optional)</Form.Label>
                                    <Form.Control 
                                        type="date"
                                        className="form-control-lg rounded-3"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group>
                            <Form.Label className="fw-bold mb-2">Special Instructions</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                className="rounded-3"
                                placeholder="e.g., Take after food, avoid dairy"
                                value={formData.instructions}
                                onChange={(e) => setFormData({...formData, instructions: e.target.value})}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" className="rounded-pill px-4 py-2" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" className="rounded-pill px-5 py-2 shadow-sm" disabled={saving}>
                            {saving ? <Spinner size="sm" /> : editingMed ? "Update Record" : "Create Reminder"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
}

