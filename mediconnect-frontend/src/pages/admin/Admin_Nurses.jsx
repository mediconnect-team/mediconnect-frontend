import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const initialNurses = [
  {
    id: 1,
    name: "Sarah Johnson",
    qualification: "RN, BSN",
    department: "Emergency Department",
    shift: "day",
    experience: 8,
    status: "active",
    specialization: "Emergency Care",
    phone: "+1-555-0201",
    email: "sarah.johnson@hospital.com",
    license: "RN-54321",
  },
  {
    id: 2,
    name: "Michael Brown",
    qualification: "RN, MSN",
    department: "ICU",
    shift: "night",
    experience: 12,
    status: "active",
    specialization: "Critical Care",
    phone: "+1-555-0202",
    email: "michael.brown@hospital.com",
    license: "RN-54322",
  },
  {
    id: 3,
    name: "Emily Davis",
    qualification: "RN, BSN",
    department: "Pediatric Medicine",
    shift: "rotating",
    experience: 5,
    status: "active",
    specialization: "Pediatric Care",
    phone: "+1-555-0203",
    email: "emily.davis@hospital.com",
    license: "RN-54323",
  },
];

const departments = [
  "All Departments",
  "Emergency Department",
  "ICU",
  "Pediatric Medicine",
];

const statuses = ["All Status", "active", "inactive"];

export default function NurseManagement() {
  const [nurses, setNurses] = useState(initialNurses);
  const [filterDept, setFilterDept] = useState("All Departments");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [showAddModal, setShowAddModal] = useState(false);

  // New nurse form state
  const [newNurse, setNewNurse] = useState({
    name: "",
    qualification: "",
    department: "",
    shift: "",
    experience: "",
    status: "",
    specialization: "",
    phone: "",
    email: "",
    license: "",
  });

  const handleDelete = (id) => {
    setNurses((prev) => prev.filter((n) => n.id !== id));
  };

  const handleFilterDeptChange = (e) => setFilterDept(e.target.value);
  const handleFilterStatusChange = (e) => setFilterStatus(e.target.value);

  const filteredNurses = nurses.filter((n) => {
    return (
      (filterDept === "All Departments" || n.department === filterDept) &&
      (filterStatus === "All Status" || n.status === filterStatus)
    );
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNurse((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNurse = (e) => {
    e.preventDefault();
    if (
      !newNurse.name ||
      !newNurse.department ||
      !newNurse.status ||
      !newNurse.license
    ) {
      alert("Please fill in required fields (Name, Department, Status, License)");
      return;
    }

    setNurses((prev) => [
      ...prev,
      { ...newNurse, id: Date.now(), experience: Number(newNurse.experience) || 0 },
    ]);
    setShowAddModal(false);
    setNewNurse({
      name: "",
      qualification: "",
      department: "",
      shift: "",
      experience: "",
      status: "",
      specialization: "",
      phone: "",
      email: "",
      license: "",
    });
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3>Nurse Management</h3>
          <small className="text-muted">Manage nursing staff and their assignments</small>
        </div>
        <button
          className="btn btn-dark"
          onClick={() => setShowAddModal(true)}
        >
          + Add Nurse
        </button>
      </div>

     
      <div className="d-flex gap-3 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search nurses by name, department, or specialization..."
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            setFilterDept("All Departments");
            setFilterStatus("All Status");
            setNurses(
              initialNurses.filter(
                (n) =>
                  n.name.toLowerCase().includes(searchTerm) ||
                  n.department.toLowerCase().includes(searchTerm) ||
                  (n.specialization && n.specialization.toLowerCase().includes(searchTerm))
              )
            );
            if (!searchTerm) setNurses(initialNurses);
          }}
        />

        <select
          className="form-select"
          value={filterDept}
          onChange={handleFilterDeptChange}
        >
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          className="form-select"
          value={filterStatus}
          onChange={handleFilterStatusChange}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

    
      <div className="row">
        {filteredNurses.length === 0 && (
          <p className="text-muted">No nurses found.</p>
        )}

        {filteredNurses.map((nurse) => (
          <div className="col-md-4 mb-4" key={nurse.id}>
            <div className="card p-3 h-100">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div
                  className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
                  style={{ width: 40, height: 40, fontWeight: "bold" }}
                >
                  {nurse.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>

                <div>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    // onClick={() => alert("Edit functionality not implemented")}
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(nurse.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <h5>{nurse.name}</h5>
              <small className="text-muted">{nurse.qualification}</small>

              <p className="mt-2 mb-1">
                <strong>Department:</strong> {nurse.department}
              </p>
              <p className="mb-1">
                <strong>Shift:</strong>{" "}
                <span
                  className={`badge bg-${
                    nurse.shift === "day"
                      ? "warning"
                      : nurse.shift === "night"
                      ? "info"
                      : nurse.shift === "rotating"
                      ? "purple"
                      : "secondary"
                  } text-dark`}
                  style={{
                    backgroundColor:
                      nurse.shift === "rotating" ? "#d6bcfa" : undefined,
                  }}
                >
                  {nurse.shift}
                </span>
              </p>
              <p className="mb-1">
                <strong>Experience:</strong> {nurse.experience} years
              </p>
              <p className="mb-1">
                <strong>Status:</strong>{" "}
                <span className="badge bg-dark">{nurse.status}</span>
              </p>

              <span className="badge bg-light text-dark">{nurse.specialization}</span>

              <hr />

              <p className="mb-1">
                <i className="bi bi-telephone"></i> {nurse.phone}
              </p>
              <p>
                <i className="bi bi-envelope"></i> {nurse.email}
              </p>

              <p className="text-end mb-0">
                <small>
                  <strong>License</strong> {nurse.license}
                </small>
              </p>
            </div>
          </div>
        ))}
      </div>


      {showAddModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content p-4">
              <h5 className="modal-title mb-3">Add New Nurse</h5>
              <form onSubmit={handleAddNurse}>
                <div className="mb-2">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={newNurse.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={newNurse.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={newNurse.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">License Number *</label>
                  <input
                    type="text"
                    name="license"
                    className="form-control"
                    value={newNurse.license}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Department *</label>
                  <select
                    name="department"
                    className="form-select"
                    value={newNurse.department}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select department</option>
                    {departments
                      .filter((d) => d !== "All Departments")
                      .map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="mb-2">
                  <label className="form-label">Shift</label>
                  <select
                    name="shift"
                    className="form-select"
                    value={newNurse.shift}
                    onChange={handleInputChange}
                  >
                    <option value="">Select shift</option>
                    <option value="day">day</option>
                    <option value="night">night</option>
                    <option value="rotating">rotating</option>
                  </select>
                </div>

                <div className="mb-2">
                  <label className="form-label">Years of Experience</label>
                  <input
                    type="number"
                    name="experience"
                    className="form-control"
                    value={newNurse.experience}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    className="form-control"
                    value={newNurse.qualification}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Specialization</label>
                  <select
                    name="specialization"
                    className="form-select"
                    value={newNurse.specialization}
                    onChange={handleInputChange}
                  >
                    <option value="">Select specialization</option>
                    <option value="Emergency Care">Emergency Care</option>
                    <option value="Critical Care">Critical Care</option>
                    <option value="Pediatric Care">Pediatric Care</option>
                  </select>
                </div>

                <div className="mb-2">
                  <label className="form-label">Status *</label>
                  <select
                    name="status"
                    className="form-select"
                    value={newNurse.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select status</option>
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                  </select>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-dark">
                    Add Nurse
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
