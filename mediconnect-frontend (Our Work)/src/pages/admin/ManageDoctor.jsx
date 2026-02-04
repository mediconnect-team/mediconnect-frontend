import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [specFilter, setSpecFilter] = useState("All Specializations");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:9090/api/doctor/all", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setDoctors(response.data);
      
      // Extract unique specializations
      const specs = [...new Set(response.data.map(d => d.specialization))];
      setSpecializations(specs);
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.phone?.includes(searchTerm);
    
    const matchesSpec = specFilter === "All Specializations" || d.specialization === specFilter;
    const matchesStatus = statusFilter === "All Status" || 
                          (statusFilter === "Active" && d.active) || 
                          (statusFilter === "Inactive" && !d.active); // Adjust if 'active' field differs

    return matchesSearch && matchesSpec && matchesStatus;
  });

  return (
    <div className="container py-4">

      {/* ---- HEADER ---- */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h2 className="fw-bold">Doctor Management</h2>
          <p className="text-muted m-0">
            Manage doctor profiles, schedules, and information
          </p>
        </div>

        {/* <button className="btn btn-dark px-4 py-2 rounded-3 fw-semibold shadow-sm">
          + Add Doctor
        </button> */}
      </div>


      {/* ---- SEARCH + FILTER ---- */}
      <div className="row g-3 mb-4 align-items-center">

        <div className="col-lg-6">
          <div className="input-group shadow-sm rounded-3">
            <span className="input-group-text bg-white border-end-0">
              🔍
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search doctor by name, specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="col-lg-3">
          <select 
            className="form-select shadow-sm rounded-3"
            value={specFilter}
            onChange={(e) => setSpecFilter(e.target.value)}
          >
            <option>All Specializations</option>
            {specializations.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="col-lg-3">
          <select 
            className="form-select shadow-sm rounded-3"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

      </div>


      {/* ---- CARDS ---- */}
      <div className="row g-4">
        
        {loading ? (
             <div className="col-12 text-center p-5">Loading...</div>
        ) : filteredDoctors.length === 0 ? (
             <div className="col-12 text-center p-5">No doctors found.</div>
        ) : (
            filteredDoctors.map(doctor => (
                <div className="col-lg-4" key={doctor.id}>
                  <div
                    className="card border-0 shadow-sm rounded-4 p-4 h-100"
                    style={{ transition: "0.2s", cursor: "pointer" }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0px)"}
                  >
        
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle bg-light d-flex justify-content-center align-items-center shadow-sm me-3"
                        style={{ width: "65px", height: "65px", fontWeight: "600", fontSize: "1.1rem" }}
                      >
                        {doctor.name.split(' ').map(n=>n[0]).join('').substring(0,3).toUpperCase()}
                      </div>
        
                      <div>
                        <h5 className="mb-1 fw-semibold">{doctor.name}</h5>
                        <span className={`badge rounded-pill ${doctor.active ? 'bg-dark' : 'bg-secondary'}`}>
                            {doctor.active ? 'active' : 'inactive'}
                        </span>
                      </div>
                    </div>
        
                    <div className="mt-3 text-muted small">
                      {doctor.specialization} <br />
                      {doctor.departmentName} <br />
                      {doctor.experience} years ★ {doctor.rating || 'N/A'} <br />
                      <span className="mt-2 d-block">📞 {doctor.phone}</span>
                    </div>
        
                    {/* <hr />
        
                    <div className="d-flex justify-content-between">
                      <span>Consultation Fee</span>
                      <strong>$200</strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Total Patients</span>
                      <strong>--</strong>
                    </div> */}
                  </div>
                </div>
            ))
        )}

      </div>
    </div>
  );
}
