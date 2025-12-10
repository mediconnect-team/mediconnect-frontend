import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

export default function DoctorDashboard() {
    const appointmentsToday = [
        { time: "09:00 AM", name: "John Doe", type: "Follow-up", status: "completed" },
        { time: "10:30 AM", name: "Sarah Wilson", type: "Consultation", status: "current" },
        { time: "11:15 AM", name: "Mike Brown", type: "Check-up", status: "pending" },
        { time: "02:00 PM", name: "Emma Taylor", type: "Follow-up", status: "pending" },
    ];

    const reports = [
        { name: "John Doe", type: "Lab Results", badge: "normal", date: "2024-01-22" },
        { name: "Sarah Wilson", type: "X-Ray Report", badge: "urgent", date: "2024-01-22" },
        { name: "Mike Brown", type: "Blood Test", badge: "normal", date: "2024-01-21" },
    ];

    return (
        <div className="p-4">

            {/* Page Title */}
            <h3 className="fw-bold">Doctor Dashboard</h3>
            <p className="text-muted">Manage your patients, appointments, and medical reports</p>

            {/* Top Stats */}
            <Row className="gy-2 mb-3">

                <Col md={3}>
                    <Card className="p-2 shadow-sm">
                        <p>My Patients</p>
                        <h2 className="fw-bold">127</h2>
                        <small className="text-muted">+5 this week</small>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card className="p-2 shadow-sm">
                        <p>Today's Appointments</p>
                        <h2 className="fw-bold">12</h2>
                        <small className="text-muted">3 remaining</small>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card className="p-2 shadow-sm">
                        <p>Pending Reports</p>
                        <h2 className="fw-bold">8</h2>
                        <small className="text-muted">2 urgent</small>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card className="p-2 shadow-sm">
                        <p>Next Appointment</p>
                        <h2 className="fw-bold">10:30 AM</h2>
                        <small className="text-muted">John Doe</small>
                    </Card>
                </Col>

            </Row>

            <Row className="gy-2 mb-3">

                {/* Today's Appointments */}
                <Col md={6}>
                    <Card className="p-2 shadow-sm">
                        <div className="d-flex justify-content-between mb-2">
                            <h5 className="fw-bold">Today's Appointments</h5>
                            <Button variant="outline-dark" size="sm">View All</Button>
                        </div>

                        {appointmentsToday.map((item, i) => (
                            <Card key={i} className="p-2 mb-2 bg-light">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <div className="fw-bold">{item.time}</div>
                                        <div>{item.name}</div>
                                        <small className="text-muted">{item.type}</small>
                                    </div>

                                    <span
                                        className={`badge rounded-3 ${item.status === "current"
                                            ? "bg-dark"
                                            : item.status === "completed"
                                                ? "bg-success"
                                                : "bg-warning text-dark"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </Card>
                </Col>

                {/* Patient Reports */}
                <Col md={6}>
                    <Card className="p-2 shadow-sm">
                        <div className="d-flex justify-content-between mb-2">
                            <h5 className="fw-bold">Patient Reports & Past History</h5>
                            <Button variant="outline-dark" size="sm">View All</Button>
                        </div>

                        {reports.map((item, i) => (
                            <Card key={i} className="p-2 mb-2 bg-light">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <div className="fw-bold">{item.name}</div>
                                        <div>{item.type}</div>
                                        <small className="text-muted">{item.date}</small>
                                    </div>

                                    <span
                                        className={`badge rounded-3 ${item.badge === "urgent"
                                            ? "bg-danger"
                                            : "bg-success"
                                            }`}
                                    >
                                        {item.badge}
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </Card>
                </Col>

            </Row>

            {/* Quick Actions */}
            <Card className="p-2 shadow-sm mt-3">
                <h5 className="fw-bold mb-3">Quick Actions</h5>

                <Row className="gy-3">
                    <Col md={3}><Button className="w-100" variant="light" size="lg">Add Patient Prescription</Button></Col>
                    <Col md={3}><Button className="w-100" variant="light" size="lg">Check Appointments</Button></Col>
                    <Col md={3}><Button className="w-100" variant="light" size="lg">View Patient History</Button></Col>
                    <Col md={3}><Button className="w-100" variant="light" size="lg">Emergency Patients</Button></Col>
                </Row>
            </Card>

        </div>
    );
}
