import React, { useState } from 'react';
import { X, ArrowLeft, Calendar, Clock, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookAppointmentStep4 = () => {
  const [appointmentType, setAppointmentType] = useState('Consultation');
  const [notes, setNotes] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const appointmentTypes = [
    'Consultation',
    'Follow-up',
    'Check-up',
    'Emergency'
  ];

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Book Appointment - Step 4 of 4</h2>
            <p style={styles.subtitle}>Review and confirm your appointment</p>
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
          <div style={styles.progressLine}></div>
          <div style={styles.stepActive}>4</div>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {/* Appointment Summary */}
          <h3 style={styles.sectionTitle}>Appointment Summary</h3>
          <div style={styles.summaryCard}>
            <div style={styles.doctorSection}>
              <div style={styles.doctorAvatar}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <p style={styles.doctorName}>Dr. Michael Brown</p>
                <p style={styles.doctorSpecialty}>Dermatologist</p>
                <p style={styles.doctorDepartment}>Dermatology</p>
              </div>
            </div>

            <div style={styles.detailsSection}>
              <div style={styles.detailItem}>
                <Calendar size={20} color="#6b7280" />
                <div>
                  <p style={styles.detailLabel}>Date</p>
                  <p style={styles.detailValue}>12/11/2025</p>
                </div>
              </div>
              <div style={styles.detailItem}>
                <Clock size={20} color="#6b7280" />
                <div>
                  <p style={styles.detailLabel}>Time</p>
                  <p style={styles.detailValue}>11:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Type */}
          <div style={styles.fieldGroup}>
            <label style={styles.fieldLabel}>Appointment Type</label>
            <div style={styles.selectWrapper}>
              <select
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                style={styles.select}
              >
                {appointmentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <svg style={styles.selectIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          {/* Notes */}
          <div style={styles.fieldGroup}>
            <label style={styles.fieldLabel}>Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe your symptoms or reason for visit..."
              style={styles.textarea}
              rows={5}
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div style={styles.footer}>
          <button style={styles.previousButton}
            onClick={() => navigate("/patient/appointments/3")}
          >
            <ArrowLeft size={20} />
            Previous
          </button>
          <div style={styles.footerRight}>
            <button style={styles.cancelButton}
              onClick={() => navigate("/patient/appointments")}
            >Cancel</button>
            <button
              onClick={() => navigate("/patient/payments")}
              style={styles.confirmButton}>
              <Check size={20} />
              Confirm Booking
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
  progressLine: {
    width: '80px',
    height: '2px',
    backgroundColor: '#111827',
    margin: '0'
  },
  content: {
    padding: '0 24px 24px'
  },
  sectionTitle: {
    margin: '0 0 16px 0',
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827'
  },
  summaryCard: {
    padding: '24px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    marginBottom: '24px'
  },
  doctorSection: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    marginBottom: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid #e5e7eb'
  },
  doctorAvatar: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: '#6366f1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  doctorName: {
    margin: '0 0 4px 0',
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827'
  },
  doctorSpecialty: {
    margin: '0 0 2px 0',
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500'
  },
  doctorDepartment: {
    margin: 0,
    fontSize: '14px',
    color: '#9ca3af'
  },
  detailsSection: {
    display: 'flex',
    gap: '32px'
  },
  detailItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px'
  },
  detailLabel: {
    margin: '0 0 4px 0',
    fontSize: '13px',
    color: '#6b7280',
    fontWeight: '500'
  },
  detailValue: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827'
  },
  fieldGroup: {
    marginBottom: '20px'
  },
  fieldLabel: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#111827'
  },
  selectWrapper: {
    position: 'relative'
  },
  select: {
    width: '100%',
    padding: '12px 40px 12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#111827',
    backgroundColor: '#f9fafb',
    cursor: 'pointer',
    outline: 'none',
    appearance: 'none',
    fontFamily: 'inherit',
    fontWeight: '500'
  },
  selectIcon: {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none'
  },
  textarea: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#111827',
    backgroundColor: '#f9fafb',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
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
  confirmButton: {
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
  }
};

export default BookAppointmentStep4;