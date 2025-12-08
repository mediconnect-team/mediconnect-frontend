import React, { useState } from "react";
import "./adminStaff.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminStaffRegistration() {
    const [activeTab, setActiveTab] = useState("register");
    const navigate = useNavigate();
    const location = useLocation();


    return (
        <div className="admin-staff-container">

            {/* PAGE TITLE */}
            <h3 className="fw-bold mb-2">Staff Management</h3>
            <p className="text-muted">
                Register new healthcare staff members and manage existing accounts
            </p>

            {/* TAB SWITCHER */}
            <div className="tabs-wrapper d-flex justify-content-between my-4">
                <button
                    className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
                    onClick={() => {
                        setActiveTab("register");
                        navigate("/admin/staff/registration");
                    }}
                >
                    <i className="bi bi-person-plus me-2"></i>
                    Register Staff
                </button>

                <button
                    className={`tab-btn ${activeTab === "directory" ? "active" : ""}`}
                    onClick={() => {
                        setActiveTab("directory");
                        navigate("/admin/staff/directory");
                    }}
                >
                    <i className="bi bi-people me-2"></i>
                    Staff Directory
                </button>
            </div>

            {/* TAB CONTENT */}
            {activeTab === "register" ? (
                <RegisterStaffForm />
            ) : (
                <StaffDirectory />
            )}

        </div>
    );
}

// ============================
// STAFF REGISTRATION FORM
// ============================
function RegisterStaffForm() {
    return (
        <div className="card p-4">

            <h5 className="fw-bold mb-4">
                <i className="bi bi-person-plus me-2"></i>
                Register New Staff Member
            </h5>

            <p className="text-muted mb-4">
                Create accounts for doctors and administrators. Staff members will
                receive login credentials via email.
            </p>

            <form>

                <div className="row">
                    {/* Role */}
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Role *</label>
                        <select className="form-select">
                            <option>Select role</option>
                            <option>Doctor</option>
                            <option>Nurse</option>
                            <option>Administrator</option>
                        </select>
                    </div>

                    {/* Full Name */}
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Full Name *</label>
                        <input type="text" className="form-control" placeholder="Enter full name" />
                    </div>

                    {/* Email */}
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Email Address *</label>
                        <input type="email" className="form-control" placeholder="Enter email address" />
                    </div>

                    {/* Phone */}
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Phone Number *</label>
                        <input type="text" className="form-control" placeholder="Enter phone number" />
                    </div>

                    {/* Temp Password */}
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Temporary Password *</label>
                        <input type="password" className="form-control" placeholder="Create temporary password" />
                    </div>

                    {/* Confirm Password */}
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Confirm Password *</label>
                        <input type="password" className="form-control" placeholder="Confirm password" />
                    </div>

                    {/* DOB */}
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Date of Birth *</label>
                        <input type="date" className="form-control" />
                    </div>

                    {/* Address */}
                    <div className="col-md-12 mb-3">
                        <label className="form-label">Address *</label>
                        <input type="text" className="form-control" placeholder="Enter full address" />
                    </div>

                    {/* Notes */}
                    <div className="col-md-12 mb-3">
                        <label className="form-label">Additional Notes</label>
                        <textarea
                            rows="3"
                            className="form-control"
                            placeholder="Any additional information or notes"
                        />
                    </div>
                </div>

                {/* BUTTONS */}
                <div className="d-flex justify-content-end gap-3 mt-3">
                    <button type="reset" className="btn btn-outline-secondary px-4">
                        Clear Form
                    </button>

                    <button type="submit" className="btn btn-dark px-4">
                        Create Staff Account
                    </button>
                </div>

            </form>
        </div>
    );
}

// ============================
// STAFF DIRECTORY TAB (placeholder)
// ============================
function StaffDirectory() {
    return (
        <div className="card p-4 text-center">
            <h5 className="fw-bold mb-2">Staff Directory</h5>
            <p className="text-muted">Staff listing will appear here.</p>
        </div>
    );
}
