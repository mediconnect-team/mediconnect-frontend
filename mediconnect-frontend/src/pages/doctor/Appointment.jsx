import React from "react";
import { FaTrash, FaPhone, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const PatientPrescription = () => {
  return (
    <div className="container mt-4">

      {/* Current Prescriptions */}
      <div className="border rounded p-3 mb-4 shadow-sm bg-white">
        <div className="fw-semibold mb-3">
          <i className="bi bi-prescription"></i> Current Prescriptions
        </div>

        <div
          className="p-3 rounded d-flex justify-content-between align-items-start"
          style={{ backgroundColor: "#f7f4ff" }}
        >
          <div>
            <h5 className="fw-bold mb-2">Lisinopril</h5>
            <p className="mb-0">10mg – Once daily for 30 days</p>

            <p className="mt-2 mb-1">
              <span className="fw-semibold">Instructions:</span> Take with food
            </p>

            <small>Issued: 15/01/2024 • Refills: 2</small>
          </div>

          <FaTrash size={22} color="red" role="button" />
        </div>
      </div>


      {/* Patient Section */}
      <div className="border rounded p-4 shadow-sm bg-white">

        <div className="d-flex justify-content-between">
          <div>
            <h5 className="fw-bold mb-1">Sarah Wilson</h5>
            <div className="text-muted">ID: P002</div>

            <div className="mt-2">
              <span className="badge bg-secondary me-2">scheduled</span>
              <span className="badge bg-success">follow-up</span>
            </div>
          </div>

          <button className="btn btn-dark px-4">
            Add Prescription
          </button>
        </div>


        <div className="d-flex flex-wrap gap-4 mt-3">
          <div><FaClock className="me-2" /> 10:30 (45 min)</div>
          <div><FaMapMarkerAlt className="me-2" /> Room 101</div>
          <div><FaPhone className="me-2" /> (555) 987-6543</div>
        </div>


        <div
          className="p-3 rounded mt-3"
          style={{ backgroundColor: "#efeff5" }}
        >
          <strong>Notes: </strong> Follow-up on blood pressure medication
        </div>

      </div>

    </div>
  );
};

export default PatientPrescription;
