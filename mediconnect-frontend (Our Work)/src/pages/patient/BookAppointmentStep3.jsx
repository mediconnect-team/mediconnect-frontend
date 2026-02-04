import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, X, Calendar, Clock, User, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { holdSlot } from '../../services/patientApi';
import useAuth from '../../hooks/useAuth';

// Helper to safely format time from various inputs (string or array)
const getFormattedTime = (time) => {
  if (!time) return "00:00:00";
  // Handle array format [hour, minute] or [hour, minute, second]
  if (Array.isArray(time)) {
    const h = String(time[0]).padStart(2, '0');
    const m = String(time[1] || 0).padStart(2, '0');
    const s = String(time[2] || 0).padStart(2, '0');
    return `${h}:${m}:${s}`;
  }
  // Handle string format
  const str = String(time);
  if (str.length === 5) return `${str}:00`;
  return str;
};

const BookAppointmentStep3 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { doctor, date, slot } = location.state || {};
  const { patientId } = useAuth();

  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Redirect if missing data
  useEffect(() => {
    if (!doctor || !date || !slot) {
      navigate('/patient/appointments/1');
    }
  }, [doctor, date, slot, navigate]);

  const handleConfirm = async () => {
    if (!patientId) {
      setError("Patient ID not found. Please log in again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Robustly format the start time
      const formattedStartTime = getFormattedTime(slot.startTime);
      
      // Calculate end time (duration: 30 mins)
      const [hours, minutes] = formattedStartTime.split(':').map(Number);
      const endDate = new Date();
      endDate.setHours(hours, minutes + 30);
      const endTime = `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}:00`;

      const payload = {
        doctorId: doctor.doctorId,
        patientId: patientId,
        date: date,
        startTime: formattedStartTime,
        endTime: endTime,
        appointmentType: "CONSULTATION"
      };

      console.log("Holding slot with payload:", payload);
      const response = await holdSlot(payload);
      console.log("Hold slot response:", response);

      if (response && response.appointmentId) {
        navigate('/patient/payments', {
          state: {
            appointmentId: response.appointmentId,
            amount: 500, // Hardcoded for now
            doctor,
            date,
            slot
          }
        });
      } else {
        throw new Error("Invalid response from server");
      }

    } catch (err) {
      console.error("Error holding slot:", err);
      setError(err.response?.data?.message || "Failed to hold slot. It might have been taken. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!doctor || !date || !slot) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Book Appointment - Step 3 of 4</h2>
            <p style={styles.subtitle}>Review & Confirm</p>
          </div>
          <button style={styles.closeButton} onClick={() => navigate("/patient/appointments")}>
            <X size={24} />
          </button>
        </div>

        {/* Progress Indicators */}
        <div style={styles.progressContainer}>
          <div style={styles.stepInactive}>1</div>
          <div style={styles.progressLine}></div>
          <div style={styles.stepInactive}>2</div>
          <div style={styles.progressLine}></div>
          <div style={styles.stepActive}>3</div>
          <div style={styles.progressLineInactive}></div>
          <div style={styles.stepInactive}>4</div>
        </div>

        <div style={styles.content}>
          <div style={styles.reviewCard}>
            <h3 style={styles.cardTitle}>Appointment Summary</h3>

            <div style={styles.summaryItem}>
              <div style={styles.iconBox}><User size={20} color="#4f46e5" /></div>
              <div>
                <p style={styles.label}>Doctor</p>
                <p style={styles.value}>{doctor.name || `Dr. ${doctor.username}`}</p>
                <p style={styles.subValue}>{doctor.specialty || doctor.specialization}</p>
              </div>
            </div>

            <div style={styles.summaryItem}>
              <div style={styles.iconBox}><Calendar size={20} color="#4f46e5" /></div>
              <div>
                <p style={styles.label}>Date</p>
                <p style={styles.value}>{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>

            <div style={styles.summaryItem}>
              <div style={styles.iconBox}><Clock size={20} color="#4f46e5" /></div>
              <div>
                <p style={styles.label}>Time</p>
                <p style={styles.value}>{getFormattedTime(slot.startTime).substring(0, 5)}</p>
              </div>
            </div>

            <div style={styles.summaryItem}>
              <div style={styles.iconBox}><FileText size={20} color="#4f46e5" /></div>
              <div style={{ width: '100%' }}>
                <p style={styles.label}>Reason for Visit (Optional)</p>
                <textarea
                  style={styles.textArea}
                  placeholder="Briefly describe your symptoms or reason for visit..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </div>
          </div>

          {error && (
            <div style={styles.errorBox}>
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div style={styles.footer}>
          <button style={styles.previousButton} onClick={() => navigate("/patient/appointments/2", { state: { doctor } })}>
            <ArrowLeft size={16} /> Previous
          </button>

          <button
            onClick={handleConfirm}
            disabled={loading}
            style={{
              ...styles.nextButton,
              ...(loading ? styles.nextButtonDisabled : {})
            }}
          >
            {loading ? 'Processing...' : 'Confirm & Proceed to Pay'}
            {!loading && <ArrowRight size={16} />}
          </button>
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
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    zIndex: 1000,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  modal: {
    background: 'var(--card-bg)',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'var(--card-shadow)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '24px 24px 16px',
    borderBottom: '1px solid var(--border-color)'
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '700',
    color: 'var(--text-color)',
  },
  subtitle: {
    margin: '4px 0 0',
    fontSize: '14px',
    color: 'var(--text-muted)'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    color: '#9ca3af',
    borderRadius: '50%',
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    gap: '0'
  },
  stepActive: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'var(--nav-active-bg)',
    color: 'var(--nav-active-text)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '14px',
    zIndex: 1
  },
  stepInactive: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'var(--card-inner-bg)',
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '14px',
    zIndex: 1
  },
  progressLine: {
    width: '60px',
    height: '2px',
    background: 'var(--nav-active-bg)',
    margin: '0 -4px'
  },
  progressLineInactive: {
    width: '60px',
    height: '2px',
    background: 'var(--border-color)',
    margin: '0 -4px'
  },
  content: {
    flex: 1,
    padding: '0 24px 24px',
    overflowY: 'auto',
  },
  reviewCard: {
    background: 'var(--card-inner-bg)',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid var(--border-color)'
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: '20px',
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--text-color)'
  },
  summaryItem: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px'
  },
  iconBox: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'var(--alert-info-bg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  label: {
    margin: '0 0 4px 0',
    fontSize: '13px',
    color: 'var(--text-muted)',
    fontWeight: '500'
  },
  value: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--text-color)'
  },
  subValue: {
    margin: '2px 0 0 0',
    fontSize: '14px',
    color: 'var(--text-muted)'
  },
  textArea: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--card-bg)',
    color: 'var(--text-color)',
    marginTop: '8px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical',
    minHeight: '80px'
  },
  errorBox: {
    marginTop: '20px',
    padding: '12px',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    color: '#b91c1c',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px',
    borderTop: '1px solid var(--border-color)',
    background: 'var(--card-bg)',
    borderBottomLeftRadius: '16px',
    borderBottomRightRadius: '16px'
  },
  previousButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    border: '1px solid var(--border-color)',
    background: 'var(--card-bg)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: 'var(--text-color)'
  },
  nextButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 24px',
    border: 'none',
    background: 'var(--nav-active-bg)',
    color: 'var(--nav-active-text)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'opacity 0.2s'
  },
  nextButtonDisabled: {
    background: 'var(--card-inner-bg)',
    color: 'var(--text-muted)',
    cursor: 'not-allowed'
  }
};

export default BookAppointmentStep3;