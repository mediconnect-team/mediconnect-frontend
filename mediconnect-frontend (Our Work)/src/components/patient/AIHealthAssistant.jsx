import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, AlertCircle, TrendingUp, ShieldCheck, Zap, ChevronRight } from 'lucide-react';

const AIHealthAssistant = ({ patientData, className }) => {
    const [analyzing, setAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState(null);

    // Initialize with a random insight on mount
    useEffect(() => {
        generateAnalysis();
    }, []);

    const generateAnalysis = () => {
        // In a real app, this would call an LLM or ML model with patientData
        const insights = [
            {
                type: 'optimal',
                title: 'Medication Adherence',
                text: 'Your consistent medication schedule is reducing cardiovascular risk by an estimated 14%.',
                icon: <ShieldCheck className="text-success" />,
                score: 92
            },
            {
                type: 'warning',
                title: 'Sleep & Recovery',
                text: 'Based on your recent activity trends, increasing sleep by 45 mins could boost your Health Score to 85+.',
                icon: <Zap className="text-warning" />,
                score: 72
            },
            {
                type: 'info',
                title: 'Predictive Insight',
                text: 'Your BMI trend suggests you are on track to reach your target weight in approximately 3.4 weeks.',
                icon: <TrendingUp className="text-info" />,
                score: 88
            }
        ];
        
        setAnalysis(insights[Math.floor(Math.random() * insights.length)]);
    };

    return (
        <div className={`glass-card overflow-hidden position-relative border-0 shadow-lg ${className}`} style={{ minHeight: '220px' }}>
            {/* Background Animation Element */}
            <div className="position-absolute top-0 end-0 p-5 opacity-10 bg-primary rounded-circle" 
                 style={{ transform: 'translate(40%, -40%)', width: '200px', height: '200px', filter: 'blur(30px)' }}></div>
            
            <div className="p-4 d-flex flex-column h-100">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center gap-2">
                        <div className="p-2 bg-primary bg-opacity-10 rounded-3 text-primary">
                            <Bot size={24} />
                        </div>
                        <div>
                            <h5 className="fw-bold mb-0">MediConnect AI Assistant</h5>
                            <span className="text-muted" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>PERSONALIZED ENGINE v2.4</span>
                        </div>
                    </div>
                    {analyzing && (
                        <Badge bg="primary" className="bg-opacity-10 text-primary border border-primary fw-normal">
                             <Sparkles size={12} className="me-1 spin" /> Analyzing Vitals...
                        </Badge>
                    )}
                </div>

                {analyzing || !analysis ? (
                    <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center py-4">
                        <div className="ai-scanning-line mb-3"></div>
                        <p className="text-muted small mb-0 animate-pulse">Initializing MediConnect AI...</p>
                    </div>
                ) : (
                    <div className="flex-grow-1 d-flex flex-column justify-content-between">
                        <div className="d-flex align-items-start gap-3 mb-3">
                            <div className="mt-1">{analysis.icon}</div>
                            <div>
                                <h6 className="fw-bold mb-1 text-uppercase small" style={{ letterSpacing: '0.5px' }}>{analysis.title}</h6>
                                <p className="mb-0 fs-5 fw-medium" style={{ color: 'var(--text-color)', lineHeight: '1.4' }}>
                                    "{analysis.text}"
                                </p>
                            </div>
                        </div>
                        
                        <div className="mt-auto">
                            <div className="d-flex align-items-center gap-3 pt-3 border-top border-dashed">
                                <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span className="text-muted small">Confidence Score</span>
                                        <span className="fw-bold small">{analysis.score}%</span>
                                    </div>
                                    <div className="progress rounded-pill" style={{ height: '6px' }}>
                                        <div className="progress-bar bg-primary" style={{ width: `${analysis.score}%` }}></div>
                                    </div>
                                </div>
                                <button className="btn btn-primary btn-sm rounded-circle p-2 shadow-sm" onClick={() => {setAnalyzing(true); setTimeout(generateAnalysis, 1500)}}>
                                    <RefreshCw size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .spin { animation: spin 2s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .ai-scanning-line {
                    width: 100%;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
                    animation: scanning 2s ease-in-out infinite;
                }
                @keyframes scanning {
                    0% { transform: translateY(-10px); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(10px); opacity: 0; }
                }
                .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
            `}</style>
        </div>
    );
};

// Internal components to avoid import issues
const Badge = ({ children, bg, className }) => (
    <span className={`badge bg-${bg} ${className}`}>{children}</span>
);

const RefreshCw = ({ size }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
);

export default AIHealthAssistant;
