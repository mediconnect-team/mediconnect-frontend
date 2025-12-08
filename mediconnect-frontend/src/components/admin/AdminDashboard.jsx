import React from "react";
// import "./adminDashboard.css"; // Optional custom styling

export default function AdminDashboard() {
    return (
        <div className="admin-dashboard-container">

            {/* Page Header */}
            <div className="mb-4">
                <h2 className="fw-bold">Admin Dashboard</h2>
                <p className="text-muted">
                    Manage hospital staff, departments, and system overview
                </p>
            </div>

            {/* TOP CARDS */}
            <div className="row g-3 mb-4">

                {/* Patients */}
                <div className="col-md-3">
                    <div className="card admin-stat-card p-3">
                        <p className="text-muted mb-1">No. Of Patients</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <h3>1,247</h3>
                            <i className="bi bi-people fs-2 text-primary"></i>
                        </div>
                        <p className="text-success small">↑ +12%</p>
                    </div>
                </div>

                {/* Doctors */}
                <div className="col-md-3">
                    <div className="card admin-stat-card p-3">
                        <p className="text-muted mb-1">No. of Current Docs</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <h3>45</h3>
                            <i className="bi bi-person-check fs-2 text-success"></i>
                        </div>
                        <p className="text-success small">↑ +2</p>
                    </div>
                </div>

                {/* Nurses */}
                <div className="col-md-3">
                    <div className="card admin-stat-card p-3">
                        <p className="text-muted mb-1">No. of Current Nurses</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <h3>89</h3>
                            <i className="bi bi-heart fs-2 text-danger"></i>
                        </div>
                        <p className="text-success small">↑ +5</p>
                    </div>
                </div>

                {/* Revenue */}
                <div className="col-md-3">
                    <div className="card admin-stat-card p-3">
                        <p className="text-muted mb-1">Revenue</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <h3>$248,500</h3>
                            <i className="bi bi-currency-dollar fs-2 text-purple"></i>
                        </div>
                        <p className="text-success small">↑ +18%</p>
                    </div>
                </div>
            </div>

            {/* STAFF MANAGEMENT SECTION */}
            <div className="card p-4 mb-4">
                <div className="d-flex justify-content-between mb-3">
                    <h5 className="fw-bold">
                        <i className="bi bi-gear me-2"></i>Staff Management
                    </h5>
                </div>

                <div className="row g-3">
                    <div className="col-md-6">
                        <button className="btn btn-light w-100 py-3">
                            ➕ Add Doctor
                        </button>
                    </div>
                    <div className="col-md-6">
                        <button className="btn btn-light w-100 py-3">
                            ➖ Remove Doctor
                        </button>
                    </div>

                    <div className="col-md-6">
                        <button className="btn btn-light w-100 py-3">
                            ➕ Add Nurse
                        </button>
                    </div>
                    <div className="col-md-6">
                        <button className="btn btn-light w-100 py-3">
                            ➖ Remove Nurse
                        </button>
                    </div>
                </div>
            </div>

            {/* RECENT STAFF CHANGES */}
            <div className="card p-4 mb-4">
                <h5 className="fw-bold mb-3">Recent Staff Changes</h5>

                <div className="list-group">
                    <div className="list-group-item d-flex justify-content-between">
                        <div>
                            <span className="badge bg-success me-2">added</span>
                            Dr. Emily Johnson
                        </div>
                        <span className="text-muted">2024-01-22</span>
                    </div>

                    <div className="list-group-item d-flex justify-content-between">
                        <div>
                            <span className="badge bg-success me-2">added</span>
                            Sarah Miller
                        </div>
                        <span className="text-muted">2024-01-21</span>
                    </div>

                    <div className="list-group-item d-flex justify-content-between">
                        <div>
                            <span className="badge bg-danger me-2">removed</span>
                            Mike Wilson
                        </div>
                        <span className="text-muted">2024-01-20</span>
                    </div>

                    <div className="list-group-item d-flex justify-content-between">
                        <div>
                            <span className="badge bg-success me-2">added</span>
                            Dr. Robert Chen
                        </div>
                        <span className="text-muted">2024-01-19</span>
                    </div>
                </div>
            </div>

            {/* DEPARTMENT OVERVIEW */}
            <div className="card p-4 mb-4">
                <div className="d-flex justify-content-between mb-3">
                    <h5 className="fw-bold">Department Overview</h5>
                    <button className="btn btn-light">Manage Departments</button>
                </div>

                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th>Department</th>
                            <th>Doctors</th>
                            <th>Nurses</th>
                            <th>Active Patients</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Emergency Department</td>
                            <td>8</td>
                            <td>15</td>
                            <td>45</td>
                            <td><button className="btn btn-link">Manage</button></td>
                        </tr>
                        <tr>
                            <td>ICU</td>
                            <td>6</td>
                            <td>12</td>
                            <td>23</td>
                            <td><button className="btn btn-link">Manage</button></td>
                        </tr>
                        <tr>
                            <td>Cardiology</td>
                            <td>5</td>
                            <td>8</td>
                            <td>67</td>
                            <td><button className="btn btn-link">Manage</button></td>
                        </tr>
                        <tr>
                            <td>Pediatrics</td>
                            <td>4</td>
                            <td>10</td>
                            <td>89</td>
                            <td><button className="btn btn-link">Manage</button></td>
                        </tr>
                        <tr>
                            <td>Surgery</td>
                            <td>7</td>
                            <td>14</td>
                            <td>34</td>
                            <td><button className="btn btn-link">Manage</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* LOWER 3-CARD SECTION */}
            <div className="row g-4">

                {/* System Management */}
                <div className="col-md-4">
                    <div className="card p-4">
                        <h5 className="fw-bold mb-3">System Management</h5>

                        <button className="btn btn-light w-100 mb-2">Check Dashboard</button>
                        <button className="btn btn-light w-100 mb-2">System Settings</button>
                        <button className="btn btn-light w-100 mb-2">Backup Data</button>
                    </div>
                </div>

                {/* Reports */}
                <div className="col-md-4">
                    <div className="card p-4">
                        <h5 className="fw-bold mb-3">Reports</h5>

                        <button className="btn btn-light w-100 mb-2">Staff Performance</button>
                        <button className="btn btn-light w-100 mb-2">Financial Reports</button>
                        <button className="btn btn-light w-100 mb-2">Patient Statistics</button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="col-md-4">
                    <div className="card p-4">
                        <h5 className="fw-bold mb-3">Quick Stats</h5>

                        <p className="d-flex justify-content-between">
                            <span>Total Staff</span> <strong>134</strong>
                        </p>
                        <p className="d-flex justify-content-between">
                            <span>Departments</span> <strong>12</strong>
                        </p>
                        <p className="d-flex justify-content-between">
                            <span>Daily Revenue</span> <strong>$8,283</strong>
                        </p>
                        <p className="d-flex justify-content-between">
                            <span>Occupancy</span> <strong>87%</strong>
                        </p>
                    </div>
                </div>

            </div>

        </div>
    );
}
