import React, { useState } from 'react';
import { Stethoscope, Search, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DoctorRecommender = () => {
    const navigate = useNavigate();
    const [symptom, setSymptom] = useState('');
    const [recommendation, setRecommendation] = useState(null);

    const symptomMap = {
        'headache': 'Neurologist',
        'migraine': 'Neurologist',
        'fever': 'General Physician',
        'cold': 'General Physician',
        'cough': 'General Physician',
        'chest pain': 'Cardiologist',
        'heart': 'Cardiologist',
        'skin': 'Dermatologist',
        'rash': 'Dermatologist',
        'acne': 'Dermatologist',
        'stomach': 'Gastroenterologist',
        'digestion': 'Gastroenterologist',
        'bone': 'Orthopedic',
        'joint': 'Orthopedic',
        'back pain': 'Orthopedic',
        'tooth': 'Dentist',
        'gum': 'Dentist',
        'eye': 'Ophthalmologist',
        'vision': 'Ophthalmologist',
        'mental': 'Psychiatrist',
        'stress': 'Psychiatrist',
        'child': 'Pediatrician',
        'baby': 'Pediatrician'
    };

    const handleRecommend = () => {
        if (!symptom) return;
        
        const lowerSymptom = symptom.toLowerCase();
        let foundSpecialist = 'General Physician'; // Default

        for (const [key, specialist] of Object.entries(symptomMap)) {
            if (lowerSymptom.includes(key)) {
                foundSpecialist = specialist;
                break;
            }
        }

        setRecommendation(foundSpecialist);
    };

    const handleFindDoctor = () => {
        // Navigate to Find Doctors tab with the specialist query
        // Note: Using state to pass the query could be an enhancement for MyAppointment
        navigate('/patient/appointments', { state: { activeTab: 'doctors', searchQuery: recommendation } });
    };

    return (
        <div className="glass-card h-100 p-4">
            <div className="card-body p-0">
                <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-success bg-opacity-10 p-2 me-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Stethoscope size={20} className="text-success" />
                    </div>
                    <div>
                        <h5 className="card-title fw-bold mb-0">Doctor Recommender</h5>
                        <small className="text-muted">Get specialist suggestions</small>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label small text-muted">What are your symptoms?</label>
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                            <Search size={16} className="text-muted" />
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0"
                            placeholder="e.g. headache, skin rash"
                            value={symptom}
                            onChange={(e) => setSymptom(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleRecommend()}
                        />
                    </div>
                </div>

                {!recommendation ? (
                    <button 
                        className="btn btn-outline-success w-100"
                        onClick={handleRecommend}
                        disabled={!symptom}
                    >
                        Get Recommendation
                    </button>
                ) : (
                    <div className="mt-3 fade-in">
                        <div className="p-3 rounded mb-2" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                            <p className="mb-1 small text-muted">We recommend consulting a:</p>
                            <h5 className="fw-bold text-success mb-0">{recommendation}</h5>
                        </div>
                        <button 
                            className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2"
                            onClick={handleFindDoctor}
                        >
                            Find {recommendation}
                            <ArrowRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorRecommender;
