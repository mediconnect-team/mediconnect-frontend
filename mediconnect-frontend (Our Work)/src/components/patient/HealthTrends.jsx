import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, RefreshCw, Smartphone, BrainCircuit } from 'lucide-react';

const HealthTrends = () => {
    // 1. STATEFUL DATA: Demonstrates ability to manage dynamic datasets
    const [data, setData] = useState([
        { month: 'Jan', sys: 120, dia: 80 },
        { month: 'Feb', sys: 118, dia: 78 },
        { month: 'Mar', sys: 122, dia: 82 },
        { month: 'Apr', sys: 125, dia: 85 },
        { month: 'May', sys: 119, dia: 79 },
        { month: 'Jun', sys: 120, dia: 80 },
    ]);
    
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());
    const [showPrediction, setShowPrediction] = useState(false);

    // 2. SIMULATED EXTERNAL API SYNC: Great talking point for "Third-party integration"
    const syncWithWearable = async () => {
        setIsSyncing(true);
        // Simulate network latency as if calling Google Fit / Apple Health API
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const newPoint = { 
            month: 'Jul', 
            sys: 115 + Math.floor(Math.random() * 15), 
            dia: 75 + Math.floor(Math.random() * 10) 
        };
        
        // Update state with new "real-time" data
        setData(prev => {
            const exists = prev.find(d => d.month === 'Jul');
            if (exists) return prev.map(d => d.month === 'Jul' ? newPoint : d);
            return [...prev, newPoint];
        });
        
        setIsSyncing(false);
        setLastSync(new Date().toLocaleTimeString());
    };

    // 3. PREDICTIVE ANALYTICS ENGINE (Frontend Logic)
    const getPrediction = () => {
        const lastTwo = data.slice(-2);
        if (lastTwo.length < 2) return null;
        
        // Simple linear forecasting for interview demonstration
        const sysDiff = lastTwo[1].sys - lastTwo[0].sys;
        const diaDiff = lastTwo[1].dia - lastTwo[0].dia;
        
        return {
            month: 'Aug (Est.)',
            sys: lastTwo[1].sys + Math.round(sysDiff * 0.5),
            dia: lastTwo[1].dia + Math.round(diaDiff * 0.5)
        };
    };

    const prediction = showPrediction ? getPrediction() : null;
    const displayData = prediction ? [...data, prediction] : data;

    // SVG Constants
    const width = 100;
    const height = 50;
    const padding = 8;
    const maxVal = 160;
    const minVal = 50;
    const stepX = (width - 2 * padding) / (displayData.length - 1);

    const mapToCoord = (val, max, min) => {
        return height - padding - ((val - min) / (max - min)) * (height - 2 * padding);
    };

    const sysPath = data.map((d, i) => 
        `${i === 0 ? 'M' : 'L'} ${padding + i * stepX} ${mapToCoord(d.sys, maxVal, minVal)}`
    ).join(' ');

    const diaPath = data.map((d, i) => 
        `${i === 0 ? 'M' : 'L'} ${padding + i * stepX} ${mapToCoord(d.dia, maxVal, minVal)}`
    ).join(' ');

    return (
        <div className="glass-card h-100 p-4 d-flex flex-column position-relative overflow-hidden">
            {isSyncing && (
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-white bg-opacity-75 z-3 d-flex flex-column align-items-center justify-content-center">
                    <RefreshCw className="text-primary spin-animation mb-2" size={32} />
                    <span className="fw-bold text-primary">Fetching Wearable Data...</span>
                </div>
            )}

            <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-danger bg-opacity-10 p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        <Activity size={20} className="text-danger" />
                    </div>
                    <div>
                        <h5 className="card-title fw-bold mb-0">Health Insights</h5>
                        <small className="text-muted">Last synced: {lastSync}</small>
                    </div>
                </div>
                <div className="d-flex gap-2">
                    <button 
                        className={`btn btn-sm ${showPrediction ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-3 d-flex align-items-center gap-1`}
                        onClick={() => setShowPrediction(!showPrediction)}
                        style={{ fontSize: '11px' }}
                    >
                        <BrainCircuit size={14} /> AI Prediction
                    </button>
                    <button 
                        className="btn btn-sm btn-outline-dark rounded-pill px-3 d-flex align-items-center gap-1"
                        onClick={syncWithWearable}
                        style={{ fontSize: '11px' }}
                    >
                        <Smartphone size={14} /> Sync Device
                    </button>
                </div>
            </div>

            <div className="flex-grow-1 position-relative mt-2" style={{ minHeight: '180px' }}>
                <svg viewBox={`0 0 ${width} ${height}`} className="w-100 h-100 overflow-visible">
                    {/* Grid Lines */}
                    {[80, 100, 120, 140].map(val => (
                        <line 
                            key={val}
                            x1={padding} 
                            y1={mapToCoord(val, maxVal, minVal)} 
                            x2={width - padding} 
                            y2={mapToCoord(val, maxVal, minVal)} 
                            stroke="#e2e8f0" 
                            strokeWidth="0.1" 
                            strokeDasharray="1,1"
                        />
                    ))}

                    {/* Actual Data Lines */}
                    <path d={sysPath} fill="none" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" className="chart-line" />
                    <path d={diaPath} fill="none" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" className="chart-line" />

                    {/* Prediction Lines (Dotted) */}
                    {showPrediction && prediction && (
                        <>
                            <line 
                                x1={padding + (data.length - 1) * stepX} 
                                y1={mapToCoord(data[data.length-1].sys, maxVal, minVal)}
                                x2={padding + (displayData.length - 1) * stepX}
                                y2={mapToCoord(prediction.sys, maxVal, minVal)}
                                stroke="#ef4444"
                                strokeWidth="1"
                                strokeDasharray="2,2"
                            />
                            <line 
                                x1={padding + (data.length - 1) * stepX} 
                                y1={mapToCoord(data[data.length-1].dia, maxVal, minVal)}
                                x2={padding + (displayData.length - 1) * stepX}
                                y2={mapToCoord(prediction.dia, maxVal, minVal)}
                                stroke="#3b82f6"
                                strokeWidth="1"
                                strokeDasharray="2,2"
                            />
                        </>
                    )}

                    {/* Data Points */}
                    {displayData.map((d, i) => {
                        const isPrediction = i === displayData.length - 1 && showPrediction;
                        return (
                            <g key={i}>
                                <circle 
                                    cx={padding + i * stepX} 
                                    cy={mapToCoord(d.sys, maxVal, minVal)} 
                                    r={isPrediction ? "1.2" : "1.5"} 
                                    fill={isPrediction ? "white" : "#ef4444"} 
                                    stroke="#ef4444"
                                    strokeWidth={isPrediction ? "0.5" : "0"}
                                />
                                <circle 
                                    cx={padding + i * stepX} 
                                    cy={mapToCoord(d.dia, maxVal, minVal)} 
                                    r={isPrediction ? "1.2" : "1.5"} 
                                    fill={isPrediction ? "white" : "#3b82f6"} 
                                    stroke="#3b82f6"
                                    strokeWidth={isPrediction ? "0.5" : "0"}
                                />
                                <text 
                                    x={padding + i * stepX} 
                                    y={height - 2} 
                                    fontSize="2.5" 
                                    fill={isPrediction ? "#3b82f6" : "#64748b"} 
                                    textAnchor="middle"
                                    className={isPrediction ? "fw-bold" : ""}
                                >
                                    {d.month}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                <div className="d-flex gap-4">
                    <div className="d-flex align-items-center gap-2">
                        <span className="d-inline-block rounded-circle" style={{ width: '8px', height: '8px', backgroundColor: '#ef4444' }}></span>
                        <span className="small text-muted" style={{ fontSize: '11px' }}>Systolic (Avg: 121)</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <span className="d-inline-block rounded-circle" style={{ width: '8px', height: '8px', backgroundColor: '#3b82f6' }}></span>
                        <span className="small text-muted" style={{ fontSize: '11px' }}>Diastolic (Avg: 80)</span>
                    </div>
                </div>
                <div className="badge bg-success bg-opacity-10 text-success p-2 d-flex align-items-center gap-1">
                    <TrendingUp size={14} /> Healthy Range
                </div>
            </div>
        </div>
    );
};

export default HealthTrends;
