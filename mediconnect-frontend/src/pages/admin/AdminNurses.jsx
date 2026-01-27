import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const initialNurses = [
  {
    id: 1,
    name: "Sarah Johnson",
    department: "Emergency Department",
    status: "active",
    phone: "+1-555-0201",
    email: "sarah.johnson@hospital.com",
  },
  {
    id: 2,
    name: "Michael Brown",
    department: "ICU",
    status: "active",
    phone: "+1-555-0202",
    email: "michael.brown@hospital.com",
  },
  {
    id: 3,
    name: "Emily Davis",
    department: "Pediatric Medicine",
    status: "active",
    phone: "+1-555-0203",
    email: "emily.davis@hospital.com",
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

  const [showModal, setShowModal] = useState(false);
  const [editingNurseId, setEditingNurseId] = useState(null);

  const [newNurse, setNewNurse] = useState({
    name: "",
    department: "",
    status: "",
    phone: "",
    email: "",
  });

  /* ---------------- FILTERS ---------------- */

  const filteredNurses = nurses.filter((n) => {
    return (
      (filterDept === "All Departments" || n.department === filterDept) &&
      (filterStatus === "All Status" || n.status === filterStatus)
    );
  });

  /* ---------------- HANDLERS ---------------- */

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNurse((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id) => {
    setNurses((prev) => prev.filter((n) => n.id !== id));
  };

  const handleEditClick = (nurse) => {
    setEditingNurseId(nurse.id);
    setNewNurse({
      name: nurse.name,
      department: nurse.department,
      status: nurse.status,
      phone: nurse.phone,
      email: nurse.email,
    });
    setShowModal(true);
  };

  const handleAddClick = () => {
    setEditingNurseId(null);
    setNewNurse({
      name: "",
      department: "",
      status: "",
      phone: "",
      email: "",
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newNurse.name || !newNurse.department || !newNurse.status) {
      alert("Please fill required fields");
      return;
    }

    if (editingNurseId === null) {
      // ADD
      setNurses((prev) => [
        ...prev,
        { ...newNurse, id: Date.now() },
      ]);
    } else {
      // UPDATE
      setNurses((prev) =>
        prev.map((n) =>
          n.id === editingNurseId ? { ...n, ...newNurse } : n
        )
      );
    }

    setShowModal(false);
    setEditingNurseId(null);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3>Nurse Management</h3>
          <small className="text-muted">
            Manage nursing staff and their assignments
          </small>
        </div>
        <button className="btn btn-dark" onClick={handleAddClick}>
          + Add Nurse
        </button>
      </div>

      {/* Filters */}
      <div className="d-flex gap-3 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search nurses by name or department"
          onChange={(e) => {
            const term = e.target.value.toLowerCase();
            if (!term) {
              setNurses(initialNurses);
              return;
            }
            setNurses(
              initialNurses.filter(
                (n) =>
                  n.name.toLowerCase().includes(term) ||
                  n.department.toLowerCase().includes(term)
              )
            );
          }}
        />

        <select
          className="form-select"
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
        >
          {departments.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <select
          className="form-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Cards */}
      <div className="row">
        {filteredNurses.map((nurse) => (
          <div className="col-md-4 mb-4" key={nurse.id}>
            <div className="card p-3 h-100">
              <div className="d-flex justify-content-between mb-2">
                <div className="fw-bold">
                  {nurse.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleEditClick(nurse)}
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
              <p>
                <strong>Department:</strong> {nurse.department}
              </p>
              <p>
                <strong>Status:</strong> {nurse.status}
              </p>
              <p>{nurse.phone}</p>
              <p>{nurse.email}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content p-4">
              <h5 className="mb-3">
                {editingNurseId ? "Update Nurse" : "Add New Nurse"}
              </h5>

              <form onSubmit={handleSubmit}>
                <input
                  className="form-control mb-2"
                  placeholder="Full Name"
                  name="name"
                  value={newNurse.name}
                  onChange={handleInputChange}
                  required
                />

                <input
                  className="form-control mb-2"
                  placeholder="Email"
                  name="email"
                  value={newNurse.email}
                  onChange={handleInputChange}
                />

                <input
                  className="form-control mb-2"
                  placeholder="Phone"
                  name="phone"
                  value={newNurse.phone}
                  onChange={handleInputChange}
                />

                <select
                  className="form-select mb-2"
                  name="department"
                  value={newNurse.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Department</option>
                  {departments
                    .filter((d) => d !== "All Departments")
                    .map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                </select>

                <select
                  className="form-select mb-3"
                  name="status"
                  value={newNurse.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </select>

                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-dark">
                    {editingNurseId ? "Update" : "Add"}
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
