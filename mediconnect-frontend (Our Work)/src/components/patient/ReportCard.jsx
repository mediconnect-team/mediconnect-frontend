export default function ReportCard({ title, doctor, status, date }) {
    return (
        <div className="card p-3 mb-3 border-0 rounded-4" style={{ backgroundColor: 'var(--card-inner-bg)' }}>
            <h6 className="fw-bold mb-1">{title}</h6>
            <p className="small text-muted mb-1">{doctor}</p>

            <div className="d-flex justify-content-between">
                <span className={`badge ${status === "Normal"
                        ? "bg-success"
                        : status === "Under Review"
                            ? "bg-warning"
                            : "bg-secondary"
                    }`}>
                    {status}
                </span>

                <span className="small text-muted">{date}</span>
            </div>
        </div>
    );
}
