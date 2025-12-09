import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookAppointmentStep1 = () => {
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
            <h2 style={styles.title}>Book Appointment - Step {step} of 4</h2>
          </div>
          <button style={styles.closeButton} onClick={() => navigate("/patient/appointments")}>
            <X size={24} />
          </button>
        </div>

        {/* Progress Indicators */}
        <div style={styles.progressContainer}>
          <div style={step >= 1 ? styles.stepActive : styles.stepInactive}>1</div>
          <div style={step >= 2 ? styles.progressLine : styles.progressLineInactive}></div>
          <div style={step >= 2 ? styles.stepActive : styles.stepInactive}>2</div>
          <div style={step >= 3 ? styles.progressLine : styles.progressLineInactive}></div>
          <div style={step >= 3 ? styles.stepActive : styles.stepInactive}>3</div>
          <div style={step >= 4 ? styles.progressLine : styles.progressLineInactive}></div>
          <div style={step >= 4 ? styles.stepActive : styles.stepInactive}>4</div>
        </div>

        {/* Step 1: Search Doctors */}
        {step === 1 && (
          <div style={styles.content}>
            <h3 style={styles.sectionTitle}>Search Doctors</h3>
            <div style={styles.searchContainer}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" style={styles.searchIcon}>
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search by name or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            <div style={styles.doctorList}>
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  style={{
                    ...styles.doctorCard2,
                    ...(selectedDoctor?.id === doctor.id ? styles.doctorCardSelected : {})
                  }}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <div style={styles.doctorAvatar2}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div style={styles.doctorInfo}>
                    <p style={styles.doctorName2}>{doctor.name}</p>
                    <p style={styles.doctorSpecialty2}>{doctor.specialty}</p>
                    <div style={styles.doctorMeta}>
                      <span style={styles.rating}>
                        <span style={styles.star}>⭐</span> {doctor.rating}
                      </span>
                      <span style={styles.experience}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" style={{ marginRight: '4px' }}>
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        {doctor.experience} years
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Choose Date */}
        {step === 2 && (
          <div style={styles.content}>
            {/* Doctor Info */}
            {selectedDoctor && (
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
                  <p style={styles.doctorSpecialty}>{selectedDoctor.specialty}</p>
                </div>
              </div>
            )}

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
          </div>
        )}

        {/* Footer Buttons */}
        <div style={styles.footer}>
          {step > 1 && (
            <button style={styles.previousButton} onClick={() => setStep(step - 1)}>
              <ArrowLeft size={20} />
              Previous
            </button>
          )}
          {step === 1 && <div></div>}
          <div style={styles.footerRight}>
            <button style={styles.cancelButton}
              onClick={() => navigate("/patient/appointments")}
            >Cancel</button>
            <button
              onClick={() => navigate("/patient/appointments/2")}
              style={styles.nextButton}
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
    marginBottom: '0'
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
  sectionTitle: {
    margin: '0 0 16px 0',
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827'
  },
  searchContainer: {
    position: 'relative',
    marginBottom: '20px'
  },
  searchIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none'
  },
  searchInput: {
    width: '100%',
    padding: '12px 12px 12px 44px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#111827',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  },
  doctorList: {
    maxHeight: '400px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  doctorCard2: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    backgroundColor: 'white'
  },
  doctorCardSelected: {
    border: '2px solid #111827',
    backgroundColor: '#f9fafb'
  },
  doctorAvatar2: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: '#6366f1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  doctorInfo: {
    flex: 1
  },
  doctorName2: {
    margin: '0 0 4px 0',
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827'
  },
  doctorSpecialty2: {
    margin: '0 0 8px 0',
    fontSize: '14px',
    color: '#6b7280'
  },
  doctorMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '13px'
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    color: '#111827',
    fontWeight: '500'
  },
  star: {
    marginRight: '4px'
  },
  experience: {
    display: 'flex',
    alignItems: 'center',
    color: '#6b7280'
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
    padding: '0'
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
    backgroundColor: '#000',
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

export default BookAppointmentStep1;