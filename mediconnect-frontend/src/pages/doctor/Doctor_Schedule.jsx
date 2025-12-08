import React, { useState } from "react";
import "./doctorSchedule.css";

export default function DoctorSchedule() {
  const [activeTab, setActiveTab] = useState("today");
  const [showModal, setShowModal] = useState(false);

  const [appointments, setAppointments] = useState([
  {
    id: 1,
    name: "John Doe",
    time: "09:00",
    duration: "30 min",
    room: "Room 101",
    phone: "(555) 123-4567",
    status: "scheduled",
    type: "consultation",  
    notes: "Regular checkup",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    time: "10:30",
    duration: "45 min",
    room: "Room 101",
    phone: "(555) 987-6543",
    status: "scheduled",
    type: "follow-up",   
    notes: "Follow-up on blood pressure",
  },
]);


    const confirmAppointment = (id) => {
    setAppointments((prev) =>
        prev.map((a) =>
        a.id === id ? { ...a, status: "confirmed" } : a
        )
    );
    };

    const cancelAppointment = (id) => {
    setAppointments((prev) =>
        prev.map((a) =>
        a.id === id ? { ...a, status: "cancelled" } : a
        )
    );
    };


  const completedCount = appointments.filter(
    (a) => a.status === "confirmed"
  ).length;

  return (
    <div className="doctor-container">


      <div className="header-row">
        <div>
          <h2>Doctor Schedule</h2>
          <p>Manage your appointments and availability</p>
        </div>

        <button className="btn-dark" onClick={() => setShowModal(true)}>
          + Set Availability
        </button>
      </div>


      <div className="summary-cards">
        <div className="summary-card">
          <div>📅Today's Appointments</div> 
          <h3>{appointments.length}</h3> 
        </div>

        <div className="summary-card">
          <div><span>🧑‍🦽</span> Total Patients</div>
          <h3>{appointments.length}</h3>
        </div>

        <div className="summary-card">
          <div><span>⏰</span>Next Appointment</div>
          <h3>09:00</h3>
        </div>

        <div className="summary-card">
          <div><span>✔️</span>Completed Today</div>
          <h3>{completedCount}</h3>
        </div>
      </div>


      <div className="tabs">
        <button
          className={activeTab === "today" ? "active" : ""}
          onClick={() => setActiveTab("today")}
        >
          Today's Schedule
        </button>
        <button
          className={activeTab === "upcoming" ? "active" : ""}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={activeTab === "availability" ? "active" : ""}
          onClick={() => setActiveTab("availability")}
        >
          Availability
        </button>
      </div>


      {activeTab === "today" && (
        <div className="card-full">
          <h4>Today's Appointments</h4>

          {appointments.map((item) => (
            <div className="appointment-card" key={item.id}>
                <div className="info">
                    <h6>{item.name}</h6>

            <div className="badges-row">
                <span className={`badge ${item.status}`}>
                {item.status}
                </span>

                <span className={`type-badge ${item.type}`}>
                {item.type}
                </span>
            </div>


            <div className="patient-id">ID: P00{item.id}</div>

                <div className="meta-row">
                    <span>🕒 {item.time} ({item.duration})</span>
                    <span>📍 {item.room}</span>
                    <span>📞 {item.phone}</span>
                </div>

                <div className="notes">
                    <strong>Notes:</strong> {item.notes}
                    </div>
                </div>

            <div className="actions">

                {/* Confirm button only shows when status is 'scheduled' */}
                {item.status === "scheduled" && (
                    <button
                    className="btn-complete"
                    onClick={() => confirmAppointment(item.id)}
                    >
                    ✓ Confirm
                    </button>
                )}

                {/* Cancel button always visible unless already cancelled */}
                <button
                    className="btn-cancel"
                    onClick={() => cancelAppointment(item.id)}
                >
                    ✕ Cancel
                </button>
            </div>

            </div>

          ))}
        </div>
      )}

      {/* UPCOMING */}
      {activeTab === "upcoming" && (
        <div className="card-full">
          <h4>Upcoming Appointments</h4>

          <div className="upcoming-card">
            <h5 className="patient-name">Michael Brown</h5>
            <span className="status-pill confirmed">confirmed</span>
            <div className="appointment-meta">1/23/2024 at 14:00</div>
            <div className="appointment-notes">Minor surgical procedure</div>
        </div>

        </div>
      )}

      {/* AVAILABILITY */}
        {activeTab === "availability" && (
        <div className="availability-wrapper">
            <h4 className="availability-title">Schedule Availability</h4>

            <div className="availability-card">
            <div className="availability-left">
                <h5 className="availability-date">1/22/2024</h5>
                <div className="availability-time">
                09:00 - 17:00 (Recurring)
                </div>
                <div className="availability-note">
                Regular clinic hours
                </div>
            </div>

            <div className="availability-right">
                <span className="availability-status">Available</span>
            </div>
            </div>


            <div className="availability-card">
            <div className="availability-left">
                <h5 className="availability-date">1/23/2024</h5>
                <div className="availability-time">
                13:00 - 18:00 
                </div>
                <div className="availability-note">
                Afternoon shift
                </div>
            </div>

            <div className="availability-right">
                <span className="availability-status">Available</span>
            </div>
            </div>
        
        </div>

        
        )}


      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h4>Set Schedule Availability</h4>
              <button onClick={() => setShowModal(false)}>✖</button>
            </div>

            <div className="modal-form">
              <label>Date</label>
              <input type="date" />

              <label>Recurring</label>
              <select>
                <option>Select pattern</option>
                <option>Daily</option>
                <option>Weekly</option>
              </select>

              <div className="row">
                <div>
                  <label>Start Time</label>
                  <input type="time" />
                </div>

                <div>
                  <label>End Time</label>
                  <input type="time" />
                </div>
              </div>

              <label>Notes</label>
              <textarea />

              <div className="modal-actions">
                <button onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn-dark">Save Schedule</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
