import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../api/axios";

const departments = [
  "All Departments",
  "Cardiology",
  "Orthopedics",
  "Neurology",
];

const statuses = ["All Status", "active", "inactive"];

export default function NurseManagement() {
  const [nurses, setNurses] = useState([]);
  const [allNurses, setAllNurses] = useState([]);

  const [filterDept, setFilterDept] = useState("All Departments");
  const [filterStatus, setFilterStatus] = useState("All Status");

  const [showModal, setShowModal] = useState(false);
  const [editingNurseId, setEditingNurseId] = useState(null);

  const [newNurse, setNewNurse] = useState({
    name: "",
    email: "",
    phone: "",
    departmentId: "",
    active: true,
  });

  /* ---------------- FETCH NURSES ---------------- */
  useEffect(() => {
    const fetchNurses = async () => {
      try {
        const res = await api.get("/admin/nurses");
        // console.log("API Response : ", res.data);
        setNurses(res.data);
        setAllNurses(res.data);
      } catch (err) {
        console.error("Error loading nurses:", err);
      }
    };

    fetchNurses();
  }, []);


  /* ---------------- FILTER LOGIC ---------------- */

  const filteredNurses = nurses.filter((n) => {
    console.log("Nurse Object : ", n);
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

  const handleAddClick = () => {
  setEditingNurseId(null);
  setNewNurse({
    name: "",
    email: "",
    phone: "",
    departmentId: "",
    active: true,
  });
  setShowModal(true);
};


  const handleEditClick = (nurse) => {
  const departmentMap = {
    Cardiology: "1",
    Orthopedics: "2",
    Neurology: "3",
  };

  setEditingNurseId(nurse.id);
  setNewNurse({
    name: nurse.name,
    email: nurse.email,
    phone: nurse.phone,
    departmentId: departmentMap[nurse.department] || "",
    active: nurse.status === "active",
  });

  setShowModal(true);
};


  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this nurse?"
  );

  if (!confirmDelete) return;

  try {
    //call backend delete
    await api.delete(`/nurses/delete/${id}`);

    //refresh from DB
    const res = await api.get("/admin/nurses");
    setNurses(res.data);
    setAllNurses(res.data);
  } catch (err) {
    console.error("Failed to delete nurse:", err);
  }
};


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editingNurseId) {
      // UPDATE nurse
      await api.put(`/nurses/update/${editingNurseId}`, newNurse);
    } else {
      //ADD nurse 
      await api.post("/nurses/add-nurse", newNurse);
    }

    // refresh list from DB
    const res = await api.get("/admin/nurses");
    setNurses(res.data);
    setAllNurses(res.data);

    setShowModal(false);
    setEditingNurseId(null);
  } catch (err) {
    console.error("Failed to save nurse:", err);
  }
};




  /* ---------------- SEARCH ---------------- */

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();

    if (!term) {
      setNurses(allNurses);
      return;
    }

    setNurses(
      allNurses.filter(
        (n) =>
          n.name.toLowerCase().includes(term) ||
          n.department.toLowerCase().includes(term)
      )
    );
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
          onChange={handleSearch}
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
              <p><strong>Department:</strong> {nurse.department}</p>
              <p><strong>Status:</strong> {nurse.status}</p>
              <p><strong>Phone:</strong> {nurse.phone}</p>
              <p><strong>Email:</strong> {nurse.email}</p>
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
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
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
                  name="departmentId"
                  value={newNurse.departmentId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="1">Cardiology</option>
                  <option value="2">Orthopedics</option>
                  <option value="3">Neurology</option>
                </select>


                <select
                  className="form-select mb-3"
                  value={newNurse.active}
                  onChange={(e) =>
                    setNewNurse(prev => ({
                      ...prev,
                      active: e.target.value === "true"
                    }))
                  }
                >
                  <option value="true">active</option>
                  <option value="false">inactive</option>
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
