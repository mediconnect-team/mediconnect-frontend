import React, { useState } from "react";
import "./adminStaff.css";

export default function StaffDirectory() {
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("ALL");

    // Mock test data (replace with API later)
    const staff = [
        { id: 1, name: "Dr. Emily Johnson", role: "Doctor", email: "emily@hospital.com" },
        { id: 2, name: "Sarah Miller", role: "Nurse", email: "sarah@hospital.com" },
        { id: 3, name: "Mike Wilson", role: "Administrator", email: "mike@hospital.com" },
        { id: 4, name: "Dr. Robert Chen", role: "Doctor", email: "robert@hospital.com" },
    ];

    // FILTERED RESULTS
    const filteredStaff = staff.filter((member) => {
        const matchesSearch =
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole = roleFilter === "ALL" || member.role === roleFilter;

        return matchesSearch && matchesRole;
    });

    return (
        <div className="staff-directory card p-4">

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">
                    <i className="bi bi-people me-2"></i> Staff Directory
                </h5>
            </div>

            {/* SEARCH + FILTER */}
            <div className="row mb-4">
                <div className="col-md-6 mb-2">
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        className="form-control"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="col-md-6 mb-2">
                    <select
                        className="form-select"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="ALL">All Roles</option>
                        <option value="Doctor">Doctors</option>
                        <option value="Nurse">Nurses</option>
                        <option value="Administrator">Administrators</option>
                    </select>
                </div>
            </div>

            {/* STAFF TABLE */}
            <table className="table align-middle">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th className="text-end">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredStaff.map((member) => (
                        <tr key={member.id}>
                            <td className="fw-semibold">{member.name}</td>

                            {/* ROLE BADGE */}
                            <td>
                                <span className={`role-badge ${member.role.toLowerCase()}`}>
                                    {member.role}
                                </span>
                            </td>

                            <td className="text-muted">{member.email}</td>

                            <td className="text-end">
                                <button className="btn btn-sm btn-outline-primary me-2">
                                    <i className="bi bi-pencil-square"></i> Edit
                                </button>

                                <button className="btn btn-sm btn-outline-danger">
                                    <i className="bi bi-trash"></i> Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                    {filteredStaff.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center py-4 text-muted">
                                No staff found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
}
