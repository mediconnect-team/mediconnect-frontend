import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';

const HealthScore = () => {
    // Dummy Health Score Logic
    const score = 85;
    const circumference = 2 * Math.PI * 18;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="glass-card h-100 p-4">
            <div className="card-body p-0">
                <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-warning bg-opacity-10 p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        <Heart size={20} className="text-warning" />
                    </div>
                    <div>
                        <h5 className="card-title fw-bold mb-0">Wellness Index</h5>
                        <small className="text-muted">Personal Health Score</small>
                    </div>
                </div>

                <div className="d-flex align-items-center justify-content-around mt-2">
                    <div className="position-relative" style={{ width: '100px', height: '100px' }}>
                        <svg className="w-100 h-100" viewBox="0 0 40 40">
                            <circle
                                className="text-light"
                                strokeWidth="3"
                                stroke="currentColor"
                                fill="transparent"
                                r="18"
                                cx="20"
                                cy="20"
                            />
                            <circle
                                className="text-warning transition-all duration-1000"
                                strokeWidth="3"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                                r="18"
                                cx="20"
                                cy="20"
                                style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                            />
                        </svg>
                        <div className="position-absolute top-50 start-50 translate-middle text-center">
                            <span className="fs-4 fw-bold" style={{ color: 'var(--text-color)' }}>{score}</span>
                            <div className="small text-muted" style={{ fontSize: '10px' }}>Excellent</div>
                        </div>
                    </div>

                    <div className="d-flex flex-column gap-2">
                        <div className="d-flex align-items-center gap-2">
                            <ShieldCheck size={16} className="text-success" />
                            <span className="small text-muted">Profile Complete</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <ShieldCheck size={16} className="text-success" />
                            <span className="small text-muted">Daily Goal Met</span>
                        </div>
                        <button className="btn btn-sm btn-outline-warning mt-1" style={{ fontSize: '11px' }}>Boost Score</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthScore;
