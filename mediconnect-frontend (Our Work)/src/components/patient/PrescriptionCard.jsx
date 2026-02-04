import React from 'react';

/**
 * PrescriptionCard component
 * Displays doctor-suggested prescription details.
 */
export default function PrescriptionCard({ doctor, date, notes }) {
    return (
        <div className="card p-3 mb-3 border-0 bg-light rounded-4">
            <h6 className="fw-bold mb-1">{doctor}</h6>
            <p className="text-muted small mb-2">{notes || "No additional notes provided"}</p>

            <div className="d-flex justify-content-between align-items-center">
                <p className="small mb-0 text-primary fw-medium">
                    <i className="bi bi-calendar-event me-2"></i> {date}
                </p>
                <div className="bg-primary bg-opacity-10 px-2 py-1 rounded-pill">
                    <span className="small text-primary fw-bold" style={{ fontSize: '0.7rem' }}>Prescription</span>
                </div>
            </div>
        </div>
    );
}
