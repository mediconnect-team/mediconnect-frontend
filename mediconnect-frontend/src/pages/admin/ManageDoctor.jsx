import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DoctorManagement() {
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

        <button className="btn btn-dark px-4 py-2 rounded-3 fw-semibold shadow-sm">
          + Add Doctor
        </button>
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
              placeholder="Search doctor by name, specialization or department..."
            />
          </div>
        </div>

        <div className="col-lg-3">
          <select className="form-select shadow-sm rounded-3">
            <option>All Specializations</option>
            <option>Cardiology</option>
            <option>Pediatrics</option>
            <option>Orthopedics</option>
          </select>
        </div>

        <div className="col-lg-3">
          <select className="form-select shadow-sm rounded-3">
            <option>All Status</option>
            <option>Active</option>
            <option>On Leave</option>
          </select>
        </div>

      </div>


      {/* ---- CARDS ---- */}
      <div className="row g-4">

        {/* CARD 1 */}
        <div className="col-lg-4">
          <div
            className="card border-0 shadow-sm rounded-4 p-4"
            style={{ transition: "0.2s", cursor: "pointer" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0px)"}
          >

            <div className="d-flex align-items-center">
              <div
                className="rounded-circle bg-light d-flex justify-content-center align-items-center shadow-sm me-3"
                style={{ width: "65px", height: "65px", fontWeight: "600", fontSize: "1.1rem" }}
              >
                DJS
              </div>

              <div>
                <h5 className="mb-1 fw-semibold">Dr. John Smith</h5>
                <span className="badge bg-dark rounded-pill">active</span>
              </div>
            </div>

            <div className="mt-3 text-muted small">
              Cardiology <br />
              Cardiovascular Medicine <br />
              15+ years ★ 4.8 <br />
              <span className="mt-2 d-block">📞 +1-555-0101</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between">
              <span>Consultation Fee</span>
              <strong>$200</strong>
            </div>
            <div className="d-flex justify-content-between">
              <span>Total Patients</span>
              <strong>1250</strong>
            </div>
          </div>
        </div>


        {/* CARD 2 */}
        <div className="col-lg-4">
          <div
            className="card border-0 shadow-sm rounded-4 p-4"
            style={{ transition: "0.2s", cursor: "pointer" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0px)"}
          >

            <div className="d-flex align-items-center">
              <div
                className="rounded-circle bg-light d-flex justify-content-center align-items-center shadow-sm me-3"
                style={{ width: "65px", height: "65px", fontWeight: "600", fontSize: "1.1rem" }}
              >
                DSJ
              </div>

              <div>
                <h5 className="mb-1 fw-semibold">Dr. Sarah Johns..</h5>
                <span className="badge bg-dark rounded-pill">active</span>
              </div>
            </div>

            <div className="mt-3 text-muted small">
              Pediatrics <br />
              Pediatric Medicine <br />
              12+ years ★ 4.9 <br />
              <span className="mt-2 d-block">📞 +1-555-0102</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between">
              <span>Consultation Fee</span>
              <strong>$180</strong>
            </div>
            <div className="d-flex justify-content-between">
              <span>Total Patients</span>
              <strong>890</strong>
            </div>
          </div>
        </div>


        {/* RIGHT EMPTY CARD */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-5 text-center h-100">
            <div className="display-6">👥</div>
            <h5 className="fw-semibold mt-3">Select a Doctor</h5>
            <p className="text-muted mt-2">
              Click on a doctor card to view detailed information & schedule.
            </p>
          </div>
        </div>


        {/* CARD 3 */}
        <div className="col-lg-4">
          <div
            className="card border-0 shadow-sm rounded-4 p-4"
            style={{ transition: "0.2s", cursor: "pointer" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0px)"}
          >

            <div className="d-flex align-items-center">
              <div
                className="rounded-circle bg-light d-flex justify-content-center align-items-center shadow-sm me-3"
                style={{ width: "65px", height: "65px", fontWeight: "600", fontSize: "1.1rem" }}
              >
                DMD
              </div>

              <div>
                <h5 className="mb-1 fw-semibold">Dr. Michael Da..</h5>
                <span className="badge bg-dark rounded-pill">active</span>
              </div>
            </div>

            <div className="mt-3 text-muted small">
              Orthopedic Surgery <br />
              Orthopedics <br />
              20+ years ★ 4.7 <br />
              <span className="mt-2 d-block">📞 +1-555-0103</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between">
              <span>Consultation Fee</span>
              <strong>$250</strong>
            </div>
            <div className="d-flex justify-content-between">
              <span>Total Patients</span>
              <strong>650</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
