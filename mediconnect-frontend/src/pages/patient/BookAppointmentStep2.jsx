import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const BookAppointmentStep2 = () => {
  const [selectedDateObj, setSelectedDateObj] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  

  const navigate = useNavigate();

 const location = useLocation();
 const { selectedDoctor } = location.state || {};

 if (!selectedDoctor) {
    
    navigate("/patient/appointments");
    return null;
  }
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        isNextMonth: false
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        isNextMonth: false
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        isNextMonth: true
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const now = new Date();
    if (prevMonth.getFullYear() > now.getFullYear() || (prevMonth.getFullYear() === now.getFullYear() && prevMonth.getMonth() >= now.getMonth())) {
      setCurrentDate(prevMonth);
    }
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    if (day.isCurrentMonth) {
      const selectedFullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day.day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedFullDate >= today) {
        setSelectedDateObj(selectedFullDate);
      }
    }
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Book Appointment - Step 2 of 4</h2>
            <p style={styles.subtitle}>Choose a date for your appointment</p>
          </div>
          <button style={styles.closeButton} onClick={() => navigate("/patient/appointments")}>
            <X size={24} />
          </button>
        </div>

        {/* Progress Indicators */}
        <div style={styles.progressContainer}>
          <div style={styles.stepCompleted}>1</div>
          <div style={styles.progressLine}></div>
          <div style={styles.stepActive}>2</div>
          <div style={styles.progressLineInactive}></div>
          <div style={styles.stepInactive}>3</div>
          <div style={styles.progressLineInactive}></div>
          <div style={styles.stepInactive}>4</div>
        </div>

        {/* Doctor Info */}
        <div style={styles.doctorCard}>
          <div style={styles.doctorAvatar}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <p style={styles.bookingWith}>Booking with</p>
            <p style={styles.doctorName}>{selectedDoctor.name}</p>
            <p style={styles.doctorSpecialty}>{selectedDoctor.department}</p>
          </div>
        </div>

        {/* Calendar */}
        <div style={styles.calendarContainer}>
          <div style={styles.calendarHeader}>
            <button style={styles.navButton} onClick={handlePrevMonth}>
              <ChevronLeft size={20} />
            </button>
            <h3 style={styles.monthYear}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button style={styles.navButton} onClick={handleNextMonth}>
              <ChevronRight size={20} />
            </button>
          </div>

          <div style={styles.calendar}>
            {daysOfWeek.map((day) => (
              <div key={day} style={styles.dayHeader}>
                {day}
              </div>
            ))}
            {days.map((day, index) => (
              <button
                key={index}
                style={{
                  ...styles.dayCell,
                  ...(day.isCurrentMonth ? styles.dayCellCurrent : styles.dayCellOther),
                  ...(selectedDateObj && selectedDateObj.getDate() === day.day && day.isCurrentMonth ? styles.dayCellSelected : {}),
                  ...(day.isCurrentMonth && new Date(currentDate.getFullYear(), currentDate.getMonth(), day.day) < new Date() ? styles.dayCellDisabled : {})
                }}
                onClick={() => handleDateClick(day)}
                disabled={day.isCurrentMonth && new Date(currentDate.getFullYear(), currentDate.getMonth(), day.day) < new Date()}
              >
                {day.day}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Buttons */}
        <div style={styles.footer}>
          <button style={styles.previousButton}
            onClick={() => navigate("/patient/appointments/1", { state: { selectedDoctor } })}
          >
            <ArrowLeft size={20} />
            Previous
          </button>
          <button style={styles.cancelButton}
            onClick={() => navigate("/patient/appointments")}
          >Cancel</button>
          <button
            onClick={() => navigate("/patient/appointments/3", { state: { selectedDoctor, selectedDate: selectedDateObj } })}
            style={{
              ...styles.nextButton,
              ...(!selectedDateObj ? styles.nextButtonDisabled : {})
            }}
            disabled={!selectedDateObj}
          >
            Next
            <ArrowRight size={20} />
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    backdropFilter: 'blur(4px)',
  },
  modal: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '700px',
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
    letterSpacing: '-0.025em'
  },
  subtitle: {
    margin: '6px 0 0',
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
    padding: '24px',
    gap: '0'
  },
  stepCompleted: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#000',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '16px'
  },
  stepActive: {
    width: '40px',
    height: '40px',
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
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#e2e8f0',
    color: '#94a3b8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '16px'
  },
  progressLine: {
    width: '60px',
    height: '2px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    margin: '0'
  },
  progressLineInactive: {
    width: '60px',
    height: '2px',
    backgroundColor: '#e2e8f0',
    margin: '0'
  },
  doctorCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    margin: '0 28px 28px',
    padding: '24px',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
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
  bookingWith: {
    margin: 0,
    fontSize: '14px',
    color: '#64748b',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  doctorName: {
    margin: '6px 0',
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: '-0.025em'
  },
  doctorSpecialty: {
    margin: 0,
    fontSize: '16px',
    color: '#64748b',
    fontWeight: '500'
  },
  calendarContainer: {
    padding: '0 24px 24px'
  },
  calendarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
    padding: '16px 0'
  },
  monthYear: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: '-0.025em'
  },
  navButton: {
    background: 'linear-gradient(135deg, #f1f5f9 0%, #ffffff 100%)',
    border: '1px solid #e2e8f0',
    cursor: 'pointer',
    padding: '10px',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  calendar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '8px',
    border: '1px solid #e1e5e9',
    borderRadius: '12px',
    padding: '20px',
    background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    marginBottom: '24px'
  },
  dayHeader: {
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: '600',
    color: '#64748b',
    padding: '12px 0',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  dayCell: {
    aspectRatio: '1',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  },
  dayCellCurrent: {
    color: '#1e293b',
    fontWeight: '600'
  },
  dayCellOther: {
    color: '#94a3b8'
  },
  dayCellSelected: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    boxShadow: '0 4px 8px rgba(102, 126, 234, 0.3)',
    transform: 'scale(1.05)'
  },
  dayCellDisabled: {
    color: '#cbd5e1',
    cursor: 'not-allowed',
    backgroundColor: '#f8fafc'
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
    border: 'none',
    backgroundColor: 'transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#64748b',
    transition: 'all 0.3s ease'
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

export default BookAppointmentStep2;