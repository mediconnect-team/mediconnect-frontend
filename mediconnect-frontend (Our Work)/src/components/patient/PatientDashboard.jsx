import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button, Modal, Form, Alert, Spinner, Badge } from "react-bootstrap";
import { useAuthContext } from "../../context/AuthContext";
import {
    getMedicalRecords,
    getUpcomingAppointments,
    uploadMedicalRecord,
    fetchLastVisitDate,
    getDoctorsConsultedCount,
    getCompletedAppointmentsCount,
    getPatientProfile
} from "../../services/patientApi";
import { downloadMedicalRecord } from "../../services/doctorApi";
import { motion } from "motion/react"; 
import { 
    Activity, 
    Calendar, 
    FileText, 
    User, 
    Upload, 
    Download, 
    Clock, 
    HeartPulse, 
    Thermometer,
    Stethoscope
} from "lucide-react";

export default function PatientDashboard() {
    const { user, patientId } = useAuthContext();
    const [stats, setStats] = useState({
        lastVisit: "N/A",
        doctorsCount: 0,
        completedAppointments: 0
    });
    const [reports, setReports] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [profile, setProfile] = useState(null);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadData, setUploadData] = useState({
        appointmentId: "",
        recordType: "Lab Report",
        file: null
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (user && patientId) {
            loadDashboardData();
        }
    }, [user, patientId]);

    const loadDashboardData = async () => {
        setLoading(true);
        try {
            const [lastVisit, docCount, completedAppts, myReports, upcomingAppts, myProfile] = await Promise.all([
                fetchLastVisitDate().catch(() => null),
                getDoctorsConsultedCount(patientId).catch(() => 0),
                getCompletedAppointmentsCount(patientId).catch(() => 0),
                getMedicalRecords().catch(() => []),
                getUpcomingAppointments(patientId).catch(() => []),
                getPatientProfile(patientId).catch(() => null)
            ]);

            setStats({
                lastVisit: lastVisit || "N/A",
                doctorsCount: docCount,
                completedAppointments: completedAppts
            });
            setReports(myReports || []);
            setAppointments(upcomingAppts || []);
            setProfile(myProfile);

        } catch (error) {
            console.error("Failed to load dashboard data", error);
            setMessage({ type: "danger", text: "Some data failed to load. Please refresh." });
        } finally {
            setLoading(false);
        }
    };

    const handleUploadChange = (e) => {
        if (e.target.name === "file") {
            setUploadData({ ...uploadData, file: e.target.files[0] });
        } else {
            setUploadData({ ...uploadData, [e.target.name]: e.target.value });
        }
    };

    const handleUploadSubmit = async () => {
        if (!uploadData.appointmentId || !uploadData.file) {
            setMessage({ type: "warning", text: "Please select an appointment and a file." });
            return;
        }

        try {
            await uploadMedicalRecord(uploadData.appointmentId, uploadData.recordType, uploadData.file);
            setMessage({ type: "success", text: "Report uploaded successfully!" });
            setShowUploadModal(false);
            loadDashboardData(); 
        } catch (error) {
            setMessage({ type: "danger", text: "Upload failed. Please try again." });
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
            <Spinner animation="border" variant="primary" />
        </div>
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <Container className="py-5" as={motion.div} initial="hidden" animate="visible" variants={containerVariants}>
            {/* Header Section */}
            <motion.div variants={itemVariants} className="mb-5 d-flex justify-content-between align-items-center">
                <div>
                    <h1 className="fw-bold text-dark display-6">
                        Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, 
                        <span className="text-primary"> {user?.name}</span>
                    </h1>
                     <p className="text-muted">
                        {profile?.address ? `📍 ${profile.address}` : "Here's your health overview for today."}
                    </p>
                </div>
               <div className="d-none d-md-block">
                     <span className="badge bg-light text-dark p-3 rounded-pill border">
                        <Calendar size={18} className="me-2 text-primary" />
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                     </span>
                </div>
            </motion.div>

            {message && (
             <motion.div variants={itemVariants}>
                    <Alert variant={message.type} onClose={() => setMessage(null)} dismissible className="shadow-sm border-0">
                        {message.text}
                    </Alert>
                </motion.div>
            )}

            {/* Stats Row */}
            <Row className="mb-5 g-4">
                <Col md={4}>
                    <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "16px", background: "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)" }}>
                            <Card.Body className="p-4 d-flex align-items-center justify-content-between">
                                <div>
                                    <p className="text-muted mb-1 fw-medium">Last Visit</p>
                                    <h3 className="fw-bold mb-0 text-primary">{stats.lastVisit}</h3>
                                </div>
                                <div className="p-3 bg-white rounded-circle shadow-sm">
                                    <Clock size={24} className="text-primary" />
                                </div>
                            </Card.Body>
                        </Card>
                    </motion.div>
                </Col>
                <Col md={4}>
                     <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "16px", background: "linear-gradient(135deg, #e8f5e9 0%, #ffffff 100%)" }}>
                            <Card.Body className="p-4 d-flex align-items-center justify-content-between">
                                <div>
                                    <p className="text-muted mb-1 fw-medium">Doctors Consulted</p>
                                    <h3 className="fw-bold mb-0 text-success">{stats.doctorsCount}</h3>
                                </div>
                                <div className="p-3 bg-white rounded-circle shadow-sm">
                                    <Stethoscope size={24} className="text-success" />
                                </div>
                            </Card.Body>
                        </Card>
                    </motion.div>
                </Col>
                <Col md={4}>
                    <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "16px", background: "linear-gradient(135deg, #fff3e0 0%, #ffffff 100%)" }}>
                            <Card.Body className="p-4 d-flex align-items-center justify-content-between">
                                <div>
                                    <p className="text-muted mb-1 fw-medium">Completed Checks</p>
                                    <h3 className="fw-bold mb-0 text-warning">{stats.completedAppointments}</h3>
                                </div>
                                <div className="p-3 bg-white rounded-circle shadow-sm">
                                    <Activity size={24} className="text-warning" />
                                </div>
                            </Card.Body>
                        </Card>
                    </motion.div>
                </Col>
            </Row>

            <Row className="g-4">
                {/* Main Content Area - Reports */}
                <Col lg={8}>
                    <motion.div variants={itemVariants}>
                        <Card className="border-0 shadow-sm" style={{ borderRadius: "16px", overflow: "hidden" }}>
                            <Card.Header className="bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center">
                                <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
                                    <FileText size={20} className="text-primary" /> 
                                    Medical Records
                                </h5>
                                <Button 
                                    variant="primary" 
                                    size="sm" 
                                    className="d-flex align-items-center gap-2 px-3 rounded-pill"
                                    onClick={() => setShowUploadModal(true)}
                                >
                                    <Upload size={16} /> Upload New
                                </Button>
                            </Card.Header>
                            <Card.Body className="p-0">
                                {reports.length === 0 ? (
                                    <div className="text-center py-5">
                                        <div className="mb-3 bg-light rounded-circle d-inline-flex p-3">
                                            <FileText size={32} className="text-muted" />
                                        </div>
                                        <h6 className="text-muted">No records found</h6>
                                        <p className="small text-muted">Upload your medical reports to keep a digital history.</p>
                                    </div>
                                ) : (
                                    <Table hover responsive className="mb-0 align-middle">
                                        <thead className="bg-light">
                                            <tr>
                                                <th className="px-4 py-3 border-0">Date</th>
                                                <th className="py-3 border-0">Type</th>
                                                <th className="py-3 border-0">File Name</th>
                                                <th className="px-4 py-3 border-0 text-end">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reports.map((report) => (
                                                <tr key={report.id}>
                                                    <td className="px-4 py-3 fw-medium text-secondary">{report.appointmentDate || "N/A"}</td>
                                                    <td className="py-3">
                                                        <Badge bg="light" text="dark" className="border px-2 py-1 fw-normal">
                                                            {report.recordType}
                                                        </Badge>
                                                    </td>
                                                    <td className="py-3 text-dark">{report.fileName}</td>
                                                    <td className="px-4 py-3 text-end">
                                                        <Button
                                                            variant="outline-primary"
                                                            size="sm"
                                                            className="rounded-pill px-3"
                                                            onClick={() => downloadMedicalRecord(report.id, report.fileName)}
                                                        >
                                                            <Download size={14} className="me-1" /> Download
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </Card.Body>
                        </Card>
                    </motion.div>
                </Col>

                {/* Sidebar - Quick Info */}
                <Col lg={4}>
                    <motion.div variants={itemVariants} className="mb-4">
                        <Card className="border-0 shadow-sm text-white" style={{ borderRadius: "16px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                            <Card.Body className="p-4">
                                <div className="d-flex align-items-center mb-4">
                                    <div className="bg-white bg-opacity-25 p-2 rounded-circle me-3">
                                        <User size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <h5 className="mb-0">My Health Card</h5>
                                        <small className="text-white-50">MediConnect ID: {patientId}</small>
                                    </div>
                                </div>
                                {profile ? (
                                    <div className="d-flex justify-content-between text-center">
                                        <div className="bg-white bg-opacity-10 rounded p-2 flex-fill me-2">
                                            <small className="d-block text-white-50 mb-1">Blood</small>
                                            <span className="fw-bold">{profile.bloodGroup || "-"}</span>
                                        </div>
                                        <div className="bg-white bg-opacity-10 rounded p-2 flex-fill me-2">
                                            <small className="d-block text-white-50 mb-1">Gender</small>
                                            <span className="fw-bold">{profile.gender || "-"}</span>
                                        </div>
                                        <div className="bg-white bg-opacity-10 rounded p-2 flex-fill">
                                            <small className="d-block text-white-50 mb-1">Born</small>
                                            <span className="fw-bold">{profile.dob ? new Date(profile.dob).getFullYear() : "-"}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center text-white-50">
                                        <small>Profile data unavailable</small>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Card className="border-0 shadow-sm" style={{ borderRadius: "16px" }}>
                            <Card.Header className="bg-white border-bottom py-3 px-4">
                                <h6 className="mb-0 fw-bold d-flex align-items-center gap-2">
                                    <Calendar size={18} className="text-warning" />
                                    Next Appointment
                                </h6>
                            </Card.Header>
                            <Card.Body className="p-4">
                                {appointments.length > 0 ? (
                                    <div>
                                        <h5 className="fw-bold mb-1">Dr. {appointments[0].doctorName}</h5>
                                        <p className="text-muted small mb-3">{appointments[0].specialization}</p>
                                        <div className="d-flex align-items-center text-primary bg-light p-3 rounded mb-3">
                                            <Clock size={18} className="me-2" />
                                            <span className="fw-medium">{appointments[0].appointmentDate}</span>
                                        </div>
                                        <Button variant="outline-primary" className="w-100 rounded-pill">
                                            Reschedule
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="text-center py-3">
                                        <p className="text-muted small">No upcoming appointments.</p>
                                        <Button variant="primary" size="sm" className="rounded-pill w-100">
                                            Book Now
                                        </Button>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </motion.div>
                </Col>
            </Row>

            <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)} centered>
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold">Upload Medical Record</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-4">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Select Related Appointment</Form.Label>
                            <Form.Select
                                name="appointmentId"
                                value={uploadData.appointmentId}
                                onChange={handleUploadChange}
                                className="py-2"
                            >
                                <option value="">-- Connect to a consultation --</option>
                                {appointments.map(appt => (
                                    <option key={appt.appointmentId} value={appt.appointmentId}>
                                        {appt.doctorName} ({appt.specialization}) - {appt.appointmentDate}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Text className="text-muted">
                                We categorize records by appointment for better organization.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Record Type</Form.Label>
                            <Form.Select
                                name="recordType"
                                value={uploadData.recordType}
                                onChange={handleUploadChange}
                                className="py-2"
                            >
                                <option>Lab Report</option>
                                <option>X-Ray / Imaging</option>
                                <option>Prescription (External)</option>
                                <option>Vaccination Record</option>
                                <option>Other</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Select File</Form.Label>
                            <div className="border rounded p-1">
                                <Form.Control
                                    type="file"
                                    name="file"
                                    onChange={handleUploadChange}
                                    className="border-0"
                                />
                            </div>
                            <Form.Text className="text-muted">
                                Supported formats: PDF, JPG, PNG (Max 5MB)
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-0 pt-0">
                    <Button variant="light" onClick={() => setShowUploadModal(false)} className="rounded-pill px-4">Cancel</Button>
                    <Button variant="primary" onClick={handleUploadSubmit} className="rounded-pill px-4">Upload Record</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
