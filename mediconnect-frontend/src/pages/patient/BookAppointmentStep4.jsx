import React, { useState } from 'react';
import { X, ArrowLeft, Calendar, Clock, Check } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { holdSlot } from '../../services/patientApi';

const BookAppointmentStep4 = () => {
  const [appointmentType, setAppointmentType] = useState('Consultation');
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { selectedDoctor, selectedDate, selectedTime } = location.state || {};

  if (!selectedDoctor || !selectedDate || !selectedTime) {
    navigate("/patient/appointments");
    return null;
  }

  const appointmentTypes = [
    'Consultation',
    'Follow-up',
    'Check-up',
    'Emergency'
  ];

  const handleConfirmBooking = async () => {
    if (!user?.id) {
      alert("Patient ID not found. Please log out and log back in to refresh your session.");
      return;
    }

    setIsProcessing(true);
    try {
      // Convert selectedTime to LocalTime format (HH:mm:ss)
      const startTimeStr = selectedTime.length === 5 ? `${selectedTime}:00` : selectedTime;
      
      // Calculate end time (assuming 30-minute slots)
      const [hours, minutes] = startTimeStr.split(':').map(Number);
      const endMinutes = minutes + 30;
      const endHours = hours + Math.floor(endMinutes / 60);
      const finalEndMinutes = endMinutes % 60;
      const endTimeStr = `${endHours.toString().padStart(2, '0')}:${finalEndMinutes.toString().padStart(2, '0')}:00`;

      const holdSlotData = {
        doctorId: selectedDoctor.doctorId,
        patientId: user.id,
        date: selectedDate.toISOString().split('T')[0], // Convert to YYYY-MM-DD format
        startTime: startTimeStr,
        endTime: endTimeStr,
        appointmentType: appointmentType
      };

      const response = await holdSlot(holdSlotData);
      
      if (response && response.appointmentId) {
        // Success - navigate to payment page with appointment data
        navigate("/patient/payments", { 
          state: { 
            selectedDoctor, 
            selectedDate, 
            selectedTime, 
            appointmentType, 
            notes,
            appointmentId: response.appointmentId,
            status: response.status
          } 
        });
      } else {
        alert("Failed to book appointment. Please try again.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

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
                <p style={styles.doctorName}>{selectedDoctor.name}</p>
                <p style={styles.doctorSpecialty}>{selectedDoctor.specialization}</p>
                <p style={styles.doctorDepartment}>{selectedDoctor.specialization}</p>
              </div>
            </div>

            <div style={styles.detailsSection}>
              <div style={styles.detailItem}>
                <Calendar size={20} color="#6b7280" />
                <div>
                  <p style={styles.detailLabel}>Date</p>
                  <p style={styles.detailValue}>{selectedDate ? selectedDate.toLocaleDateString() : ''}</p>
                </div>
              </div>
              <div style={styles.detailItem}>
                <Clock size={20} color="#6b7280" />
                <div>
                  <p style={styles.detailLabel}>Time</p>
                  <p style={styles.detailValue}>{selectedTime ? selectedTime.substring(0, 5) : ''}</p>
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
            onClick={() => navigate("/patient/appointments/3", { state: { selectedDoctor, selectedDate, selectedTime } })}
          >
            <ArrowLeft size={20} />
            Previous
          </button>
          <div style={styles.footerRight}>
            <button style={styles.cancelButton}
              onClick={() => navigate("/patient/appointments")}
            >Cancel</button>
            <button
              onClick={handleConfirmBooking}
              disabled={isProcessing}
              style={{
                ...styles.confirmButton,
                ...(isProcessing && styles.confirmButtonDisabled)
              }}>
              <Check size={20} />
              {isProcessing ? "Processing..." : "Confirm Booking"}
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
  progressLine: {
    width: '80px',
    height: '2px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    margin: '0'
  },
  content: {
    padding: '0 24px 24px'
  },
  sectionTitle: {
    margin: '0 0 20px 0',
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: '-0.025em'
  },
  summaryCard: {
    padding: '28px',
    background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    marginBottom: '28px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
  },
  doctorSection: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '20px',
    marginBottom: '24px',
    paddingBottom: '24px',
    borderBottom: '1px solid #e2e8f0'
  },
  doctorAvatar: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#667eea',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 4px 8px rgba(102, 126, 234, 0.2)',
    border: '3px solid white'
  },
  doctorName: {
    margin: '0 0 6px 0',
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: '-0.025em'
  },
  doctorSpecialty: {
    margin: '0 0 4px 0',
    fontSize: '16px',
    color: '#64748b',
    fontWeight: '500'
  },
  doctorDepartment: {
    margin: 0,
    fontSize: '14px',
    color: '#94a3b8'
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
    margin: '0 0 6px 0',
    fontSize: '14px',
    color: '#64748b',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  detailValue: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: '-0.025em'
  },
  fieldGroup: {
    marginBottom: '24px'
  },
  fieldLabel: {
    display: 'block',
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#1e293b'
  },
  selectWrapper: {
    position: 'relative'
  },
  select: {
    width: '100%',
    padding: '14px 44px 14px 18px',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '14px',
    color: '#475569',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    cursor: 'pointer',
    outline: 'none',
    appearance: 'none',
    fontFamily: 'inherit',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
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
    padding: '14px 18px',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '14px',
    color: '#475569',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
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
  confirmButton: {
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
  confirmButtonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: '0 2px 4px rgba(102, 126, 234, 0.2)'
  }
};

export default BookAppointmentStep4;