import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookAppointmentStep3 = () => {
  const [selectedTime, setSelectedTime] = useState('11:00');

  const navigate = useNavigate();

  const timeSlots = [
    { time: '09:00', available: true },
    { time: '09:30', available: true },
    { time: '10:00', available: false },
    { time: '10:30', available: true },
    { time: '11:00', available: true },
    { time: '11:30', available: false },
    { time: '14:00', available: true },
    { time: '14:30', available: true },
    { time: '15:00', available: true },
    { time: '15:30', available: false },
    { time: '16:00', available: true },
    { time: '16:30', available: true }
  ];

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
              <p style={styles.summaryValue}>Dr. Michael Brown</p>
            </div>
            <div style={styles.summaryDate}>
              <p style={styles.summaryLabel}>Date</p>
              <p style={styles.summaryValue}>12/11/2025</p>
            </div>
          </div>

          {/* Time Slot Selection */}
          <h3 style={styles.sectionTitle}>Select Time Slot</h3>
          <div style={styles.timeSlotGrid}>
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                style={{
                  ...styles.timeSlotButton,
                  ...(slot.available ? {} : styles.timeSlotDisabled),
                  ...(selectedTime === slot.time && slot.available ? styles.timeSlotSelected : {})
                }}
                onClick={() => slot.available && setSelectedTime(slot.time)}
                disabled={!slot.available}
              >
                <Clock size={18} />
                <span style={styles.timeText}>{slot.time}</span>
                {!slot.available && <span style={styles.redDot}></span>}
              </button>
            ))}
          </div>
          <p style={styles.slotNote}>* Slots with a red dot are unavailable</p>
        </div>

        {/* Footer Buttons */}
        <div style={styles.footer}>
          <button style={styles.previousButton}
            onClick={() => navigate("/patient/appointments/2")}
          >
            <ArrowLeft size={20} />
            Previous
          </button>
          <div style={styles.footerRight}>
            <button style={styles.cancelButton}
              onClick={() => navigate("/patient/appointments")}
            >Cancel</button>
            <button
              onClick={() => navigate("/patient/appointments/4")}
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
    backgroundColor: 'white',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '24px 24px 16px',
    borderBottom: '1px solid #e5e7eb'
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '4px'
  },
  subtitle: {
    margin: 0,
    fontSize: '14px',
    color: '#6b7280'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    color: '#9ca3af',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
    backgroundColor: '#111827',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '16px'
  },
  stepInactive: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: '#e5e7eb',
    color: '#9ca3af',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
    fontSize: '16px'
  },
  progressLine: {
    width: '80px',
    height: '2px',
    backgroundColor: '#111827',
    margin: '0'
  },
  progressLineInactive: {
    width: '80px',
    height: '2px',
    backgroundColor: '#e5e7eb',
    margin: '0'
  },
  content: {
    padding: '0 24px 24px'
  },
  summaryCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '20px',
    backgroundColor: '#eff6ff',
    borderRadius: '8px',
    border: '1px solid #dbeafe',
    marginBottom: '24px'
  },
  summaryLabel: {
    margin: '0 0 4px 0',
    fontSize: '13px',
    color: '#6b7280',
    fontWeight: '500'
  },
  summaryValue: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827'
  },
  summaryDate: {
    textAlign: 'right'
  },
  sectionTitle: {
    margin: '0 0 16px 0',
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827'
  },
  timeSlotGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '16px'
  },
  timeSlotButton: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '14px 16px',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#111827',
    transition: 'all 0.2s',
    fontFamily: 'inherit'
  },
  timeText: {
    display: 'flex',
    alignItems: 'center'
  },
  timeSlotSelected: {
    backgroundColor: '#111827',
    color: 'white',
    border: '1px solid #111827'
  },
  timeSlotDisabled: {
    backgroundColor: '#f9fafb',
    color: '#d1d5db',
    cursor: 'not-allowed',
    border: '1px solid #e5e7eb'
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
    padding: '20px 24px',
    borderTop: '1px solid #e5e7eb',
    gap: '12px'
  },
  footerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  previousButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151'
  },
  cancelButton: {
    padding: '10px 20px',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151'
  },
  nextButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    border: 'none',
    backgroundColor: '#111827',
    color: 'white',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  },
  nextButtonDisabled: {
    backgroundColor: '#d1d5db',
    cursor: 'not-allowed'
  }
};

export default BookAppointmentStep3;