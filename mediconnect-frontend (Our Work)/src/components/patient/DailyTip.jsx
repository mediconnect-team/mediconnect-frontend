import React, { useState } from 'react';
import { Lightbulb, RefreshCw, ChevronRight } from 'lucide-react';

const DailyTip = () => {
    const tips = [
        { category: 'Nutrition', text: 'Drink at least 8 glasses of water today to stay hydrated and boost energy.', color: 'text-info', bg: 'bg-info' },
        { category: 'Mental Health', text: 'Take a 5-minute break to practice deep breathing and reduce stress levels.', color: 'text-purple', bg: 'bg-purple' },
        { category: 'Fitness', text: 'Aim for a 30-minute brisk walk today to improve cardiovascular health.', color: 'text-success', bg: 'bg-success' },
        { category: 'Sleep', text: 'Avoid screens for 1 hour before bed to improve sleep quality.', color: 'text-indigo', bg: 'bg-indigo' },
        { category: 'Eye Care', text: 'Follow the 20-20-20 rule: Every 20 mins, look at something 20 feet away for 20 secs.', color: 'text-warning', bg: 'bg-warning' }
    ];

    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const nextTip = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentTipIndex((prev) => (prev + 1) % tips.length);
            setIsAnimating(false);
        }, 300);
    };

    const tip = tips[currentTipIndex];

    return (
        <div className="glass-card h-100 position-relative overflow-hidden">
            <div className={`position-absolute top-0 end-0 opacity-10 p-5 rounded-circle ${tip.bg}`} style={{ transform: 'translate(30%, -30%)', width: '150px', height: '150px' }}></div>
            
            <div className="p-4 d-flex flex-column h-100">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center">
                        <div className={`rounded-circle ${tip.bg} bg-opacity-10 p-2 me-3 d-flex align-items-center justify-content-center`} style={{ width: '40px', height: '40px' }}>
                            <Lightbulb size={20} className={tip.color} />
                        </div>
                        <h5 className="card-title fw-bold mb-0">Daily Health Tip</h5>
                    </div>
                    <button onClick={nextTip} className="btn btn-sm btn-light rounded-circle shadow-sm" style={{ width: '32px', height: '32px', padding: 0 }}>
                        <RefreshCw size={14} className="text-muted" />
                    </button>
                </div>

                <div className="flex-grow-1 d-flex flex-column justify-content-center">
                    <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                        <span className={`badge ${tip.bg} bg-opacity-20 ${tip.color} mb-2`}>{tip.category}</span>
                        <p className="fs-5 fw-medium mb-0 lh-base" style={{ color: 'var(--text-color)' }}>
                            "{tip.text}"
                        </p>
                    </div>
                </div>

                <div className="mt-3">
                    <button onClick={nextTip} className="btn btn-link text-decoration-none p-0 d-flex align-items-center small text-muted hover-primary">
                        Next Tip <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DailyTip;
