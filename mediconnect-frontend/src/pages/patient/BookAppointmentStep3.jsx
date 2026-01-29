import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAvailableSlots } from '../../services/patientApi';
import { getToken } from '../../services/api';

const BookAppointmentStep3 = () => {
  const [selectedTime, setSelectedTime] = useState('11:00');
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDoctor, selectedDate } = location.state || {};

  // if (!selectedDoctor || !selectedDate) {
  //   navigate("/patient/appointments");
  //   return null;
  // }

  useEffect(() => {
    console.log("enter");

    const token = getToken();
    if (!token || !selectedDoctor || !selectedDate) return;
    console.log(token);
    const fetchSlots = async () => {
      setLoadingSlots(true);
      const dateStr = selectedDate.toLocaleDateString('en-CA');
     const params = {
  doctorId: selectedDoctor.doctorId,
  date: dateStr
};
console.log(selectedDoctor);
console.log("Params:", params);
      const response = await getAvailableSlots(params);
      console.log("Fetched slots:", response);
      if (response) {
        setSlots(response);
      }
      setLoadingSlots(false);
    };
    fetchSlots();
  }, [selectedDoctor, selectedDate]);


  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Book Appointment - Step 3 of 4</h2>
            <p style={styles.subtitle}>Pick an available time slot</p>
          </div>
          <button style={styles.closeButton} onClick={() => navigate("/patient/appointments")}>
            <X size={24} />
          </button>
        </div>

        {/* Progress Indicators */}
        <div style={styles.progressContainer}>
          <div style={styles.stepActive}>1</div>
          <div style={styles.progressLine}></div>
          <div style={styles.stepActive}>2</div>
          <div style={styles.progressLine}></div>
          <div style={styles.stepActive}>3</div>
          <div style={styles.progressLineInactive}></div>
          <div style={styles.stepInactive}>4</div>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {/* Appointment Summary */}
          <div style={styles.summaryCard}>
            <div>
              <p style={styles.summaryLabel}>Appointment with</p>
              <p style={styles.summaryValue}>{selectedDoctor.name}</p>
            </div>
            <div style={styles.summaryDate}>
              <p style={styles.summaryLabel}>Date</p>
              <p style={styles.summaryValue}>{selectedDate ? selectedDate.toLocaleDateString() : ''}</p>
            </div>
          </div>

          {/* Time Slot Selection */}
          <h3 style={styles.sectionTitle}>Select Time Slot</h3>
          {loadingSlots ? (
            <p>Loading slots...</p>
          ) : (
            <div style={styles.timeSlotGrid}>
              {slots.map((slot, index) => (
                <button
                  key={index}
                  style={{
                    ...styles.timeSlotButton,
                    ...(slot.available ? {} : styles.timeSlotDisabled),
                    ...(selectedTime === slot.startTime && slot.available ? styles.timeSlotSelected : {})
                  }}
                  onClick={() => slot.available && setSelectedTime(slot.startTime)}
                  disabled={!slot.available}
                >
                  <Clock size={18} />
                  <span style={styles.timeText}>{slot.startTime.substring(0, 5)}</span>
                  {!slot.available && <span style={styles.redDot}></span>}
                </button>
              ))}
            </div>
          )}
          <p style={styles.slotNote}>* Slots with a red dot are unavailable</p>
        </div>

        {/* Footer Buttons */}
        <div style={styles.footer}>
          <button style={styles.previousButton}
            onClick={() => navigate("/patient/appointments/2", { state: { selectedDoctor, selectedDate } })}
          >
            <ArrowLeft size={20} />
            Previous
          </button>
          <div style={styles.footerRight}>
            <button style={styles.cancelButton}
              onClick={() => navigate("/patient/appointments")}
            >Cancel</button>
            <button
              onClick={() => navigate("/patient/appointments/4", { state: { selectedDoctor, selectedDate, selectedTime } })}
              style={{
                ...styles.nextButton,
                ...(!selectedTime ? styles.nextButtonDisabled : {})
              }}
              disabled={!selectedTime}
            >
              Next
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  modal: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '650px',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 32px 64px rgba(0, 0, 0, 0.15), 0 16px 32px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    position: 'relative'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '28px 28px 20px',
    borderBottom: '1px solid #e2e8f0',
    background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'
  },
  title: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: '-0.025em',
    marginBottom: '6px'
  },
  subtitle: {
    margin: 0,
    fontSize: '16px',
    color: '#64748b',
    fontWeight: '500'
  },
  closeButton: {
    background: 'linear-gradient(135deg, #f1f5f9 0%, #ffffff 100%)',
    border: '1px solid #e2e8f0',
    cursor: 'pointer',
    padding: '8px',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 24px',
    gap: '0'
  },
  stepActive: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '16px',
    boxShadow: '0 4px 8px rgba(102, 126, 234, 0.3)'
  },
  stepInactive: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: '#e2e8f0',
    color: '#94a3b8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
    fontSize: '16px'
  },
  progressLine: {
    width: '80px',
    height: '2px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    margin: '0'
  },
  progressLineInactive: {
    width: '80px',
    height: '2px',
    backgroundColor: '#e2e8f0',
    margin: '0'
  },
  content: {
    padding: '0 24px 24px'
  },
  summaryCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '24px',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    borderRadius: '12px',
    border: '1px solid #bae6fd',
    marginBottom: '28px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
  },
  summaryLabel: {
    margin: '0 0 6px 0',
    fontSize: '14px',
    color: '#64748b',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  summaryValue: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: '-0.025em'
  },
  summaryDate: {
    textAlign: 'right'
  },
  sectionTitle: {
    margin: '0 0 20px 0',
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: '-0.025em'
  },
  timeSlotGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '20px'
  },
  timeSlotButton: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '16px 20px',
    border: '1px solid #e2e8f0',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#475569',
    transition: 'all 0.3s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    fontFamily: 'inherit'
  },
  timeText: {
    display: 'flex',
    alignItems: 'center'
  },
  timeSlotSelected: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: '1px solid #667eea',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
    transform: 'scale(1.02)'
  },
  timeSlotDisabled: {
    backgroundColor: '#f8fafc',
    color: '#cbd5e1',
    cursor: 'not-allowed',
    border: '1px solid #e2e8f0',
    boxShadow: 'none'
  },
  redDot: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '8px',
    height: '8px',
    backgroundColor: '#ef4444',
    borderRadius: '50%'
  },
  slotNote: {
    margin: 0,
    fontSize: '13px',
    color: '#6b7280',
    fontStyle: 'italic'
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px 28px',
    borderTop: '1px solid #e2e8f0',
    gap: '16px',
    backgroundColor: '#f8fafc'
  },
  footerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  previousButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    border: '1px solid #cbd5e1',
    backgroundColor: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#475569',
    transition: 'all 0.3s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  cancelButton: {
    padding: '12px 24px',
    border: '1px solid #cbd5e1',
    backgroundColor: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#475569',
    transition: 'all 0.3s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  nextButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    border: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 8px rgba(102, 126, 234, 0.3)'
  },
  nextButtonDisabled: {
    background: 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)',
    cursor: 'not-allowed',
    boxShadow: 'none'
  }
};

export default BookAppointmentStep3;