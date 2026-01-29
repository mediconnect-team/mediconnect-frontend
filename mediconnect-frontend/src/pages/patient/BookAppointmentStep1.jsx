import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllDoctors } from "../../services/patientApi";

const BookAppointmentStep1 = () => {
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1));
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true); // add a loading state

  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  async function fetchAllDoctors() {
    const response = await getAllDoctors();

    console.log("Doctors fetched:", response);
    if (response) {
      setDoctors(response);
    } else {
      setDoctors([]);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchAllDoctors();
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [doctors, searchQuery]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

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
        isNextMonth: false,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        isNextMonth: false,
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
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
          <button
            style={styles.closeButton}
            onClick={() => navigate("/patient/appointments")}
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress Indicators */}
        <div style={styles.progressContainer}>
          <div style={step >= 1 ? styles.stepActive : styles.stepInactive}>
            1
          </div>
          <div
            style={
              step >= 2 ? styles.progressLine : styles.progressLineInactive
            }
          ></div>
          <div style={step >= 2 ? styles.stepActive : styles.stepInactive}>
            2
          </div>
          <div
            style={
              step >= 3 ? styles.progressLine : styles.progressLineInactive
            }
          ></div>
          <div style={step >= 3 ? styles.stepActive : styles.stepInactive}>
            3
          </div>
          <div
            style={
              step >= 4 ? styles.progressLine : styles.progressLineInactive
            }
          ></div>
          <div style={step >= 4 ? styles.stepActive : styles.stepInactive}>
            4
          </div>
        </div>

        {/* Step 1: Search Doctors */}
        {step === 1 && (
          <div style={styles.content}>
            <h3 style={styles.sectionTitle}>Search Doctors</h3>
            <div style={styles.searchContainer}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="2"
                style={styles.searchIcon}
              >
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
              {loading && (
                <p style={{ textAlign: "center", color: "#6b7280" }}>
                  Loading doctors...
                </p>
              )}

              {!loading && filteredDoctors.length === 0 && (
                <p style={styles.infoText}>No doctors found</p>
              )}

              {!loading &&
                filteredDoctors.map((doctor) => (
                  <div
                    key={doctor.doctorId}
                    style={{
                      ...styles.doctorCard2,
                      ...(selectedDoctor?.doctorId === doctor.doctorId
                        ? styles.doctorCardSelected
                        : {}),
                    }}
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <div style={styles.doctorAvatar2}>👨‍⚕️</div>

                    <div style={styles.doctorInfo}>
                      <p style={styles.doctorName2}>{doctor.name}</p>
                      <p style={styles.doctorSpecialty2}>
                        {doctor.specialization}
                      </p>

                      <div style={styles.doctorMeta}>
                        ⭐ {doctor.rating ?? "N/A"} • {doctor.yearsOfExperience}{" "}
                        yrs
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
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <p style={styles.bookingWith}>Booking with</p>
                  <p style={styles.doctorName}>{selectedDoctor.name}</p>
                  <p style={styles.doctorSpecialty}>
                    {selectedDoctor.specialty}
                  </p>
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
                  {monthNames[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}
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
                      ...(day.isCurrentMonth
                        ? styles.dayCellCurrent
                        : styles.dayCellOther),
                      ...(selectedDate === day.day && day.isCurrentMonth
                        ? styles.dayCellSelected
                        : {}),
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
          <button
            style={styles.previousButton}
            onClick={() => navigate("/patient/appointments")}
          >
            <ArrowLeft size={20} />
            Previous
          </button>
          <div style={styles.footerRight}>
            <button
              style={styles.cancelButton}
              onClick={() => navigate("/patient/appointments")}
            >
              Cancel
            </button>
            <button
              onClick={() => navigate("/patient/appointments/2",{ state: { selectedDoctor, selectedDate } })}
              style={{
                ...styles.nextButton,
                ...(!selectedDoctor ? styles.nextButtonDisabled : {})
              }}
              disabled={!selectedDoctor}
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
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    backdropFilter: "blur(4px)",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "650px",
    maxHeight: "90vh",
    overflow: "auto",
    boxShadow:
      "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "28px 28px 20px",
    borderBottom: "1px solid #e5e7eb",
    background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
    borderRadius: "16px 16px 0 0",
  },
  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "700",
    color: "#1a202c",
    marginBottom: "4px",
  },
  subtitle: {
    margin: 0,
    fontSize: "16px",
    color: "#718096",
  },
  closeButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px",
    color: "#a0aec0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    transition: "all 0.2s",
  },
  progressContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "36px 28px",
    gap: "0",
    background: "#f8fafc",
  },
  stepActive: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "#667eea",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "18px",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
  },
  stepInactive: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "#e2e8f0",
    color: "#cbd5e0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "18px",
  },
  progressLine: {
    width: "100px",
    height: "3px",
    backgroundColor: "#667eea",
    margin: "0 16px",
    borderRadius: "2px",
  },
  progressLineInactive: {
    width: "100px",
    height: "3px",
    backgroundColor: "#e2e8f0",
    margin: "0 16px",
    borderRadius: "2px",
  },
  content: {
    padding: "0 28px 28px",
  },
  sectionTitle: {
    margin: "0 0 20px 0",
    fontSize: "20px",
    fontWeight: "700",
    color: "#1a202c",
  },
  searchContainer: {
    position: "relative",
    marginBottom: "24px",
  },
  searchIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    color: "#a0aec0",
  },
  searchInput: {
    width: "100%",
    padding: "14px 16px 14px 48px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "16px",
    color: "#2d3748",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "all 0.2s",
  },
  doctorList: {
    maxHeight: "450px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "8px",
  },
  doctorCard2: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    padding: "20px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  doctorCardSelected: {
    border: "2px solid #667eea",
    backgroundColor: "#f0f4ff",
    boxShadow: "0 4px 16px rgba(102, 126, 234, 0.15)",
    transform: "translateY(-1px)",
  },
  doctorAvatar2: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#667eea",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: "24px",
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName2: {
    margin: "0 0 6px 0",
    fontSize: "18px",
    fontWeight: "700",
    color: "#1a202c",
  },
  doctorSpecialty2: {
    margin: "0 0 10px 0",
    fontSize: "16px",
    color: "#718096",
    fontWeight: "500",
  },
  doctorMeta: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    fontSize: "14px",
    color: "#4a5568",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    color: "#111827",
    fontWeight: "500",
  },
  star: {
    marginRight: "4px",
  },
  experience: {
    display: "flex",
    alignItems: "center",
    color: "#6b7280",
  },
  doctorCard: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    margin: "0 24px 24px",
    padding: "16px",
    backgroundColor: "#eff6ff",
    borderRadius: "8px",
    border: "1px solid #dbeafe",
  },
  doctorAvatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "#6366f1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  bookingWith: {
    margin: 0,
    fontSize: "12px",
    color: "#6b7280",
    fontWeight: "500",
  },
  doctorName: {
    margin: "2px 0",
    fontSize: "16px",
    fontWeight: "600",
    color: "#111827",
  },
  doctorSpecialty: {
    margin: 0,
    fontSize: "14px",
    color: "#6b7280",
  },
  calendarContainer: {
    padding: "0",
  },
  calendarHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  monthYear: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "600",
    color: "#111827",
  },
  navButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px",
    color: "#6b7280",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
  },
  calendar: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "4px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "16px",
    backgroundColor: "#fff",
  },
  dayHeader: {
    textAlign: "center",
    fontSize: "12px",
    fontWeight: "600",
    color: "#6b7280",
    padding: "8px 0",
    textTransform: "uppercase",
  },
  dayCell: {
    aspectRatio: "1",
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  },
  dayCellCurrent: {
    color: "#111827",
  },
  dayCellOther: {
    color: "#d1d5db",
  },
  dayCellSelected: {
    backgroundColor: "#000",
    color: "white",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 24px",
    borderTop: "1px solid #e5e7eb",
    gap: "12px",
  },
  footerRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  previousButton: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 24px",
    border: "2px solid #e2e8f0",
    backgroundColor: "white",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    color: "#4a5568",
    transition: "all 0.2s",
  },
  cancelButton: {
    padding: "12px 24px",
    border: "2px solid #e2e8f0",
    backgroundColor: "white",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    color: "#4a5568",
    transition: "all 0.2s",
  },
  nextButton: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 28px",
    border: "none",
    backgroundColor: "#667eea",
    color: "white",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.2s",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
  },
  nextButtonDisabled: {
    backgroundColor: "#cbd5e0",
    cursor: "not-allowed",
    boxShadow: "none",
  },
};

export default BookAppointmentStep1;
