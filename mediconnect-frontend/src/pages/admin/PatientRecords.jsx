import React, { useState, useMemo, useEffect } from "react";
import { Modal, Button, Form, Badge, Row, Col } from "react-bootstrap";
import "./PatientRecords.css";
import api from "../../api/axios";

export default function PatientRecords1() {
  const [records, setRecords] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [filterPatient, setFilterPatient] = useState("All");
  const [filterType, setFilterType] = useState("All");

  const [formData, setFormData] = useState({
    recordType: ""
  });

  /* ================= FETCH RECORDS ================= */

  const fetchMedicalRecords = async () => {
    try {
      const res = await api.get("/admin/medical-records");

      const mapped = res.data.map(r => ({
        id: r.medicalRecordId,
        appointmentId: r.appointmentId,
        type: r.recordType.toLowerCase(), // normalize
        title: r.fileName,
        patient: r.patientName,
        doctor: r.doctorName,
        date: r.appointmentDate,
        time: r.startTime,
        description: r.reason,
        status: r.appointmentStatus.toLowerCase(),
        medications: []
      }));

      setRecords(mapped);
      setSelected(mapped[0] || null);
      setSelectedAppointmentId(mapped[0]?.appointmentId || null);
    } catch (err) {
      console.error("Error fetching records", err);
    }
  };

  


  useEffect(() => {
  const loadAppointments = async () => {
    try {
      const res = await api.get("/admin/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.error("Error loading appointments", err);
    }
  };

  loadAppointments();
}, []);




  /* ================= FILTERING ================= */

  const patients = ["All", ...new Set(records.map(r => r.patient))];

  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      const matchSearch =
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.patient.toLowerCase().includes(search.toLowerCase()) ||
        r.doctor.toLowerCase().includes(search.toLowerCase());

      const matchPatient =
        filterPatient === "All" || r.patient === filterPatient;

      const matchType =
        filterType === "All" || r.type === filterType;

      return matchSearch && matchPatient && matchType;
    });
  }, [records, search, filterPatient, filterType]);

  useEffect(() => {
    setSelected(filteredRecords[0] || null);
    setSelectedAppointmentId(filteredRecords[0]?.appointmentId || null);
  }, [filteredRecords]);


useEffect(() => {
    fetchMedicalRecords();
  }, []);

  /* ================= ADD RECORD ================= */

  const handleAddRecord = async () => {
    if (!selectedAppointmentId || !formData.recordType || !selectedFile) {
      alert("Please select record, record type and file");
      return;
    }

    const form = new FormData();
    form.append("appointmentId", selectedAppointmentId);
    form.append("recordType", formData.recordType);
    form.append("file", selectedFile);

    try {
      await api.post("/admin/add-medical-record", form, {
        headers: { "Content-Type": "multipart/form-data" }
      });


      await fetchMedicalRecords();

      // reset modal
      setShow(false);
      setSelectedFile(null);
      setFormData({ recordType: "" });

    } catch (err) {
      console.error("Upload failed", err);
      alert("File upload failed");
    }
  };



  const handleExport = async () => {
  if (!selected) {
    alert("Please select a record first");
    return;
  }

  /* 
      DOWNLOAD (ADMIN)
 */
  try {
    const res = await api.get(
      `/admin/medical-records/${selected.id}/download`,
      { responseType: "blob" }
    );

    const blob = new Blob([res.data]);
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = selected.title;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Download failed", err);
    alert("File download failed");
    return; 
  }

  /* 
     EMAIL (PATIENT + DOCTOR)
   */
  try {
    await api.post(
      `/admin/medical-records/${selected.id}/send`
    );

    alert("File downloaded and emailed successfully");
  } catch (err) {
    console.error("Email failed", err);

    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
    }

    alert("Email failed (check backend logs)");
  }
};




  /* ================= UI HELPERS ================= */

  const badgeColor = type =>
    type === "prescription" ? "warning" :
    type === "report" ? "success" : "secondary";

  const statusColor = status =>
    status === "completed" || status === "scheduled"
      ? "secondary"
      : "dark";

  /* ================= RENDER ================= */

  return (
    <div className="container-lg py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3 className="fw-bold">Medical Records</h3>
          <p className="text-muted">View and manage patient medical records</p>
        </div>
        <Button className="btn-dark" onClick={() => setShow(true)}>
          + Add Record
        </Button>
      </div>

      {/* Filters */}
      <div className="card p-3 mb-4 border-0 shadow-sm rounded-4">
        <Row className="g-2">
          <Col md={6}>
            <Form.Control
              placeholder="Search records by patient, title, or doctor..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Select
              value={filterPatient}
              onChange={e => setFilterPatient(e.target.value)}
            >
              {patients.map((p, i) => (
                <option key={i}>{p}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="x-ray">X-Ray</option>
              <option value="report">Report</option>
              <option value="prescription">Prescription</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      {/* Records List */}
      <Row className="g-4">
        <Col md={7}>
          {filteredRecords.map(record => (
            <div
              key={record.id}
              className={`record-card-modern mb-3 ${
                selected?.id === record.id ? "active-card" : ""
              }`}
              onClick={() => {
                setSelected(record);
                setSelectedAppointmentId(record.appointmentId);
              }}
            >
              <h6>{record.title}</h6>
              <small>{record.patient}</small>
              <div className="mt-2">
                <Badge bg={badgeColor(record.type)}>{record.type}</Badge>{" "}
                <Badge bg={statusColor(record.status)}>{record.status}</Badge>
              </div>
              <div className="text-muted small mt-2">
                {record.date} • {record.doctor}
              </div>
              <div className="small mt-2">{record.description}</div>
            </div>
          ))}
        </Col>

        {/* Details */}
        <Col md={5}>
          {selected && (
            <div className="details-card-modern">
              {/* Header + Export */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-semibold mb-0">Record Details</h6>

                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={handleExport}
                >
                  Export
                </Button>
              </div>

              {/* Title */}
              <div className="mb-2">
                <div className="text-muted small">Title</div>
                <div className="fw-medium">{selected.title}</div>
              </div>

              {/* Patient + Doctor */}
              <Row>
                <Col>
                  <div className="text-muted small">Patient</div>
                  <div>{selected.patient}</div>
                </Col>
                <Col>
                  <div className="text-muted small">Doctor</div>
                  <div>{selected.doctor}</div>
                </Col>
              </Row>

              {/* Date + Time */}
              <Row className="mt-2">
                <Col>
                  <div className="text-muted small">Date</div>
                  <div>{selected.date}</div>
                </Col>
                <Col>
                  <div className="text-muted small">Time</div>
                  <div>{selected.time}</div>
                </Col>
              </Row>

              {/* Description */}
              <div className="mt-3">
                <div className="text-muted small">Description</div>
                <div>{selected.description}</div>
              </div>
            </div>
          )}
        </Col>

      </Row>

      {/* Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Medical Record</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {/* Appointment Selector */}
            <Form.Select
              className="mb-3"
              value={selectedAppointmentId || ""}
              onChange={(e) => setSelectedAppointmentId(Number(e.target.value))}
            >
              <option value="">Select Patient & Doctor</option>
              {appointments.map(a => (
                <option key={a.appointmentId} value={a.appointmentId}>
                  {a.patientName} → {a.doctorName} ({a.appointmentDate})
                </option>
              ))}
            </Form.Select>


            <Form.Select
              value={formData.recordType}
              onChange={e =>
                setFormData({ recordType: e.target.value })
              }
            >
              <option value="">Select Record Type</option>
              <option value="X-RAY">X-Ray</option>
              <option value="REPORT">Report</option>
              <option value="PRESCRIPTION">Prescription</option>
            </Form.Select>

            <Form.Control
              type="file"
              className="mt-3"
              onChange={e => setSelectedFile(e.target.files[0])}
            />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddRecord}>Save Record</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
