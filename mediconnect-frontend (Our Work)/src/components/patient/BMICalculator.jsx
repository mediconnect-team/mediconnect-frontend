import React, { useState } from 'react';
import { Activity, Info } from 'lucide-react';

const BMICalculator = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');

    const calculateBMI = () => {
        if (!height || !weight) return;

        const heightInMeters = parseFloat(height) / 100;
        const weightInKg = parseFloat(weight);
        
        if (isNaN(heightInMeters) || isNaN(weightInKg) || heightInMeters === 0) return;

        const bmiValue = weightInKg / (heightInMeters * heightInMeters);
        const bmiRounded = bmiValue.toFixed(1);
        setBmi(bmiRounded);

        if (bmiValue < 18.5) setCategory('Underweight');
        else if (bmiValue < 25) setCategory('Normal');
        else if (bmiValue < 30) setCategory('Overweight');
        else setCategory('Obese');
    };

    const getCategoryColor = () => {
        switch (category) {
            case 'Normal': return '#16a34a'; // Green
            case 'Underweight': return '#ca8a04'; // Yellow
            case 'Overweight': return '#ea580c'; // Orange
            case 'Obese': return '#dc2626'; // Red
            default: return '#374151';
        }
    };

    return (
        <div className="glass-card h-100 p-4">
            <div className="card-body p-0">
                <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-primary bg-opacity-10 p-2 me-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Activity size={20} className="text-primary" />
                    </div>
                    <div>
                        <h5 className="card-title fw-bold mb-0">BMI Calculator</h5>
                        <small className="text-muted">Check your body mass index</small>
                    </div>
                </div>

                <div className="row g-3">
                    <div className="col-6">
                        <label className="form-label small text-muted">Height (cm)</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="e.g. 175"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>
                    <div className="col-6">
                        <label className="form-label small text-muted">Weight (kg)</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="e.g. 70"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                </div>

                <button 
                    className="btn btn-primary w-100 mt-3"
                    onClick={calculateBMI}
                    disabled={!height || !weight}
                >
                    Calculate BMI
                </button>

                {bmi && (
                    <div className="mt-3 p-3 rounded" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                        <div className="d-flex justify-content-between align-items-end mb-1">
                            <span className="text-muted small">Your BMI</span>
                            <span className="fw-bold fs-4" style={{ color: getCategoryColor() }}>{bmi}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="text-muted small">Category</span>
                            <span className="badge" style={{ backgroundColor: getCategoryColor() }}>{category}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BMICalculator;
