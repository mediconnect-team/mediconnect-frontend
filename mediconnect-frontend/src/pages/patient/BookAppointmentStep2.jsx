import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookAppointmentStep2 = () => {
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1));
  const [selectedDate, setSelectedDate] = useState(null);

  const navigate = useNavigate();

  const doctors = [
    { id: 1, name: 'Dr. Sarah Smith', specialty: 'Cardiologist', rating: 4.8, experience: 15 },
    { id: 2, name: 'Dr. John Johnson', specialty: 'Orthopedic Surgeon', rating: 4.9, experience: 20 },
    { id: 3, name: 'Dr. Emily Davis', specialty: 'Pediatrician', rating: 4.7, experience: 12 },
    { id: 4, name: 'Dr. Michael Brown', specialty: 'Dermatologist', rating: 4.6, experience: 18 }
  ];

  const filteredDoctors = doctors.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    if (day.isCurrentMonth) {
      setSelectedDate(day.day);
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
            <p style={styles.doctorName}>Dr. Michael Brown</p>
            <p style={styles.doctorSpecialty}>Dermatologist</p>
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
                  ...(selectedDate === day.day && day.isCurrentMonth ? styles.dayCellSelected : {})
                }}
                onClick={() => handleDateClick(day)}
              >
                {day.day}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Buttons */}
        <div style={styles.footer}>
          <button style={styles.previousButton}
            onClick={() => navigate("/patient/appointments/1")}
          >
            <ArrowLeft size={20} />
            Previous
          </button>
          <button style={styles.cancelButton}
            onClick={() => navigate("/patient/appointments")}
          >Cancel</button>
          <button style={styles.nextButton}
            onClick={() => navigate("/patient/appointments/3")}
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
    color: '#111827'
  },
  subtitle: {
    margin: '4px 0 0',
    fontSize: '14px',
    color: '#6b7280'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    color: '#6b7280',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
    backgroundColor: '#000',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '16px'
  },
  stepInactive: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#e5e7eb',
    color: '#9ca3af',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '16px'
  },
  progressLine: {
    width: '60px',
    height: '2px',
    backgroundColor: '#000',
    margin: '0'
  },
  progressLineInactive: {
    width: '60px',
    height: '2px',
    backgroundColor: '#e5e7eb',
    margin: '0'
  },
  doctorCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    margin: '0 24px 24px',
    padding: '16px',
    backgroundColor: '#eff6ff',
    borderRadius: '8px',
    border: '1px solid #dbeafe'
  },
  doctorAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#6366f1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  bookingWith: {
    margin: 0,
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: '500'
  },
  doctorName: {
    margin: '2px 0',
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827'
  },
  doctorSpecialty: {
    margin: 0,
    fontSize: '14px',
    color: '#6b7280'
  },
  calendarContainer: {
    padding: '0 24px 24px'
  },
  calendarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  monthYear: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827'
  },
  navButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    color: '#6b7280',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px'
  },
  calendar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '4px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: '#fff'
  },
  dayHeader: {
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: '600',
    color: '#6b7280',
    padding: '8px 0',
    textTransform: 'uppercase'
  },
  dayCell: {
    aspectRatio: '1',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s'
  },
  dayCellCurrent: {
    color: '#111827'
  },
  dayCellOther: {
    color: '#d1d5db'
  },
  dayCellSelected: {
    backgroundColor: '#000',
    color: 'white'
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px',
    borderTop: '1px solid #e5e7eb',
    gap: '12px'
  },
  previousButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    border: '1px solid #e5e7eb',
    backgroundColor: 'white',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151'
  },
  cancelButton: {
    padding: '10px 20px',
    border: 'none',
    backgroundColor: 'transparent',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#6b7280'
  },
  nextButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    border: 'none',
    backgroundColor: '#000',
    color: 'white',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  }
};

export default BookAppointmentStep2;