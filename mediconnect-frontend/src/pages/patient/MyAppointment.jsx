import React, { useState } from 'react';
import { Calendar, CheckCircle, Stethoscope, Plus } from 'lucide-react';
import './MyAppointment.css';
import { Outlet, useNavigate } from 'react-router-dom';

const MyAppointment = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const navigate = useNavigate();

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <div>
          <h1 className="appointments-title">My Appointments</h1>
          <p className="appointments-subtitle">Schedule and manage your appointments with doctors</p>
        </div>
        <button
          className="book-appointment-btn"
          onClick={() => navigate("/patient/appointments/1")}
        >
          <Plus size={20} />
          Book Appointment
        </button>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <Calendar className="stat-icon stat-icon-blue" size={32} />
          <div className="stat-content">
            <p className="stat-label">Upcoming</p>
            <p className="stat-value">0</p>
          </div>
        </div>

        <div className="stat-card">
          <CheckCircle className="stat-icon stat-icon-green" size={32} />
          <div className="stat-content">
            <p className="stat-label">Completed</p>
            <p className="stat-value">1</p>
          </div>
        </div>

        <div className="stat-card">
          <Stethoscope className="stat-icon stat-icon-purple" size={32} />
          <div className="stat-content">
            <p className="stat-label">Total Doctors</p>
            <p className="stat-value">5</p>
          </div>
        </div>
      </div>

      <div className="tabs-container">
        <button
          className={`tab ${activeTab === 'upcoming' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Appointments
        </button>
        <button
          className={`tab ${activeTab === 'past' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Past Appointments
        </button>
        <button
          className={`tab ${activeTab === 'doctors' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('doctors')}
        >
          Find Doctors
        </button>
      </div>

      <div className="appointments-content">
        <div className="empty-state">
          <Calendar className="empty-icon" size={64} strokeWidth={1.5} />
          <h2 className="empty-title">No upcoming appointments</h2>
          <p className="empty-subtitle">You don't have any scheduled appointments.</p>
          <button className="book-appointment-btn-secondary" onClick={() => navigate("/patient/appointments/1")}>
            <Plus size={20} />
            Book Appointment
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MyAppointment;