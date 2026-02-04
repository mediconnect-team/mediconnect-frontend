import React, { useState, useEffect } from 'react';
import { Scale, Info, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * BMIAnalytics Component
 * 
 * A comprehensive BMI visualization and analysis tool for patients.
 * Features:
 * - Color-coded gauge meter
 * - Category and risk indicators
 * - Healthy weight range calculation
 * - Historical trend visualization
 */
export default function BMIAnalytics() {
    const [height, setHeight] = useState('175');
    const [weight, setWeight] = useState('72');
    const [bmi, setBmi] = useState(23.5);
    const [category, setCategory] = useState('Normal');
    const [risk, setRisk] = useState('Low');
    const [color, setColor] = useState('#10b981'); // Emerald 500

    // Calculate BMI and sets state
    useEffect(() => {
        const h = parseFloat(height) / 100;
        const w = parseFloat(weight);
        
        if (h > 0 && w > 0) {
            const bmiValue = w / (h * h);
            const roundedBmi = parseFloat(bmiValue.toFixed(1));
            setBmi(roundedBmi);

            if (bmiValue < 18.5) {
                setCategory('Underweight');
                setRisk('Moderate');
                setColor('#f59e0b'); // Amber 500
            } else if (bmiValue < 25) {
                setCategory('Normal');
                setRisk('Low');
                setColor('#10b981'); // Emerald 500
            } else if (bmiValue < 30) {
                setCategory('Overweight');
                setRisk('Moderate');
                setColor('#f97316'); // Orange 500
            } else {
                setCategory('Obese');
                setRisk('High');
                setColor('#ef4444'); // Red 500
            }
        }
    }, [height, weight]);

    // Calculate healthy weight range for current height
    const calculateHealthyRange = () => {
        const h = parseFloat(height) / 100;
        if (h > 0) {
            const min = (18.5 * h * h).toFixed(1);
            const max = (24.9 * h * h).toFixed(1);
            return `${min}kg - ${max}kg`;
        }
        return 'N/A';
    };

    // Gauge calculation
    const gaugeRotation = Math.min(Math.max((bmi - 15) * (180 / 25), 0), 180) - 90;

    return (
        <div className="glass-card p-3 h-100 position-relative overflow-hidden">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                    <div className="p-2 bg-primary bg-opacity-10 rounded-3 text-primary">
                        <Scale size={16} />
                    </div>
                    <div>
                        <h6 className="fw-bold mb-0" style={{ fontSize: '0.9rem' }}>BMI Analytics</h6>
                    </div>
                </div>
                <div className={`badge rounded-pill px-2 py-1 bg-opacity-10`} style={{ backgroundColor: `${color}20`, color: color, fontSize: '0.7rem' }}>
                    {category}
                </div>
            </div>

            <div className="row g-2 align-items-center">
                {/* Inputs and Stats */}
                <div className="col-12">
                    <div className="d-flex gap-2 mb-3">
                        <div className="input-group input-group-sm">
                            <input 
                                type="number" 
                                className="form-control" 
                                value={height} 
                                onChange={(e) => setHeight(e.target.value)}
                                placeholder="H (cm)"
                                style={{ fontSize: '0.75rem' }}
                            />
                            <span className="input-group-text bg-light text-muted" style={{ fontSize: '0.7rem' }}>cm</span>
                        </div>
                        <div className="input-group input-group-sm">
                            <input 
                                type="number" 
                                className="form-control" 
                                value={weight} 
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder="W (kg)"
                                style={{ fontSize: '0.75rem' }}
                            />
                            <span className="input-group-text bg-light text-muted" style={{ fontSize: '0.7rem' }}>kg</span>
                        </div>
                    </div>
                </div>

                {/* Gauge Meter */}
                <div className="col-12 d-flex flex-column align-items-center justify-content-center">
                    <div className="position-relative" style={{ width: '140px', height: '80px' }}>
                        {/* Semi-circle track */}
                        <svg viewBox="0 0 100 50" className="w-100">
                            <path 
                                d="M 10 50 A 40 40 0 0 1 90 50" 
                                fill="none" 
                                stroke="#e5e7eb" 
                                strokeWidth="10" 
                                strokeLinecap="round"
                            />
                            <path 
                                d="M 10 50 A 40 40 0 0 1 90 50" 
                                fill="none" 
                                stroke={color} 
                                strokeWidth="10" 
                                strokeLinecap="round"
                                strokeDasharray="125.66"
                                strokeDashoffset={125.66 * (1 - Math.min(Math.max((bmi - 15) / 25, 0), 1))}
                                style={{ transition: 'stroke-dashoffset 0.8s ease-out, stroke 0.5s ease' }}
                            />
                        </svg>
                        
                        {/* Needle */}
                        <motion.div 
                            className="position-absolute"
                            style={{ 
                                bottom: '0', 
                                left: '50%', 
                                width: '2px', 
                                height: '30px', 
                                backgroundColor: '#1f2937',
                                originX: '50%',
                                originY: '100%',
                                marginLeft: '-1px'
                            }}
                            animate={{ rotate: gaugeRotation }}
                            transition={{ type: 'spring', stiffness: 60 }}
                        />

                        {/* BMI Display */}
                        <div className="position-absolute bottom-0 start-50 translate-middle-x text-center" style={{ width: '100%' }}>
                            <h3 className="fw-bold mb-0" style={{ fontSize: '1.5rem' }}>{bmi}</h3>
                            <p className="text-muted small text-uppercase fw-bold mb-0" style={{ letterSpacing: '0.5px', fontSize: '8px' }}>BMI Score</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3 pt-2 border-top">
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="extra-small text-muted">Healthy:</span>
                    <span className="extra-small fw-bold text-dark">{calculateHealthyRange()}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <span className="extra-small text-muted">Risk:</span>
                    <span className={`extra-small fw-bold text-${risk === 'Low' ? 'success' : risk === 'Moderate' ? 'warning' : 'danger'}`}>
                        {risk}
                    </span>
                </div>
            </div>
        </div>
    );
}
