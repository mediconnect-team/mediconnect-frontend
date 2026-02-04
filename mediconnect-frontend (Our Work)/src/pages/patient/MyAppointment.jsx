import React, { useEffect, useState } from 'react';
import { Calendar, CheckCircle, Stethoscope, Plus, Search, User, Star, Briefcase } from 'lucide-react';
import './MyAppointment.css';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { getCompletedAppointmentsCount, getDoctorsConsultedCount, getAllDoctors, getUpcomingAppointments, getPastAppointments } from '../../services/patientApi';
import useAuth from '../../hooks/useAuth';

const MyAppointment = () => {
  const { patientId } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [totalDoctorsConsulted, setTotalDoctorsConsulted] = useState(0);
  const [completedAppointments, setCompletedAppointments] = useState(0);
  const [doctors, setDoctors] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors = doctors.filter(doc => {
    const nameMatch = doc.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const specialtyMatch = doc.specialty?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.specialization?.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || specialtyMatch;
  });

  const handleBookAppointment = (doctor) => {
    navigate("/patient/appointments/2", { state: { doctor } });
  };

  const fetchDoctors = async () => {
    try {
      const data = await getAllDoctors();
      if (data) {
        setDoctors(data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const fetchAppointmentsData = async () => {
    if (!patientId) return;

    try {
      const [completedCount, doctorsCount, upcomingApps, pastApps] = await Promise.allSettled([
        getCompletedAppointmentsCount(patientId),
        getDoctorsConsultedCount(patientId),
        getUpcomingAppointments(patientId),
        getPastAppointments(patientId)
      ]);

      if (completedCount.status === 'fulfilled' && completedCount.value) {
        setCompletedAppointments(completedCount.value);
      }
      if (doctorsCount.status === 'fulfilled' && doctorsCount.value) {
        setTotalDoctorsConsulted(doctorsCount.value);
      }
      if (upcomingApps.status === 'fulfilled' && upcomingApps.value) {
        setUpcomingAppointments(upcomingApps.value);
      }
      if (pastApps.status === 'fulfilled' && pastApps.value) {
        setPastAppointments(pastApps.value);
      }
    } catch (error) {
      console.error("Error fetching appointment data:", error);
    }
  };

  const location = useLocation();

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    fetchAppointmentsData();
  }, [patientId, activeTab, location.key]);

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
            <p className="stat-value">{upcomingAppointments.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <CheckCircle className="stat-icon stat-icon-green" size={32} />
          <div className="stat-content">
            <p className="stat-label">Completed</p>
            <p className="stat-value">{completedAppointments}</p>
          </div>
        </div>

        <div className="stat-card">
          <Stethoscope className="stat-icon stat-icon-purple" size={32} />
          <div className="stat-content">
            <p className="stat-label">Total Doctors</p>
            <p className="stat-value">{doctors.length}</p>
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
        {activeTab === 'upcoming' && (
          upcomingAppointments.length === 0 ? (
            <div className="empty-state">
              <Calendar className="empty-icon" size={64} strokeWidth={1.5} />
              <h2 className="empty-title">No upcoming appointments</h2>
              <p className="empty-subtitle">You don't have any scheduled appointments.</p>
              <button className="book-appointment-btn-secondary" onClick={() => navigate("/patient/appointments/1")}>
                <Plus size={20} />
                Book Appointment
              </button>
            </div>
          ) : (
            <div className="appointments-list">
              {upcomingAppointments.map(app => (
                  <div key={app.appointmentId} className="appointment-card stat-card shadow-sm" style={{ padding: '20px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                    <div>
                      <h3 style={{ marginTop: 0, marginBottom: '4px', fontSize: '18px', fontWeight: 600, color: 'var(--text-color)' }}>{app.doctorName || 'Dr. Unknown'}</h3>
                      <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>{app.specialization || 'General Physician'}</p>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '12px', fontSize: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={16} color="var(--text-muted)" />
                        <span>{app.appointmentDate}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Time:</span>
                        <span>{app.startTime}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span style={{ padding: '6px 12px', borderRadius: '20px', backgroundColor: 'var(--alert-info-bg)', color: 'var(--alert-info-text)', fontSize: '13px', fontWeight: 500 }}>
                      Scheduled
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {activeTab === 'past' && (
          pastAppointments.length === 0 ? (
            <div className="empty-state">
              <CheckCircle className="empty-icon" size={64} strokeWidth={1.5} />
              <h2 className="empty-title">No past appointments</h2>
              <p className="empty-subtitle">You haven't completed any appointments yet.</p>
              <button className="book-appointment-btn-secondary" onClick={() => navigate("/patient/appointments/1")}>
                <Plus size={20} />
                Book Appointment
              </button>
            </div>
          ) : (
            <div className="appointments-list">
              {pastAppointments.map(app => (
                  <div key={app.appointmentId} className="appointment-card stat-card shadow-sm" style={{ padding: '20px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.8, backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                    <div>
                      <h3 style={{ marginTop: 0, marginBottom: '4px', fontSize: '18px', fontWeight: 600, color: 'var(--text-color)' }}>{app.doctorName || 'Dr. Unknown'}</h3>
                      <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>{app.specialization || 'General Physician'}</p>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '12px', fontSize: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={16} color="var(--text-muted)" />
                        <span>{app.appointmentDate}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Time:</span>
                        <span>{app.startTime}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span style={{ 
                      padding: '6px 12px', 
                      borderRadius: '20px', 
                      backgroundColor: app.status === 'COMPLETED' ? 'var(--alert-success-bg)' : 'var(--alert-error-bg)', 
                      color: app.status === 'COMPLETED' ? 'var(--alert-success-text)' : 'var(--alert-error-text)', 
                      fontSize: '13px', 
                      fontWeight: 500 
                    }}>
                      {app.status || 'Completed'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {activeTab === 'doctors' && (
          <div className="find-doctors-content">
            <div className="search-container" style={{ position: 'relative', marginBottom: '24px' }}>
              <Search className="search-icon" size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search by doctor name or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input form-control"
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 48px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  backgroundColor: 'var(--card-inner-bg)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-color)'
                }}
              />
            </div>

            {filteredDoctors.length === 0 ? (
              <div className="empty-state">
                <Search className="empty-icon" size={64} strokeWidth={1.5} />
                <h2 className="empty-title">No doctors found</h2>
                <p className="empty-subtitle">Try adjusting your search criteria.</p>
              </div>
            ) : (
              <div className="doctors-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {filteredDoctors.map((doctor) => (
                  <div key={doctor.doctorId || doctor.id} className="doctor-card stat-card shadow-sm" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', transition: 'all 0.2s', cursor: 'default', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--alert-info-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--alert-info-text)' }}>
                        <User size={32} />
                      </div>
                      <div>
                        <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 'bold', color: 'var(--text-color)' }}>{doctor.name || `Dr. ${doctor.username}`}</h3>
                        <p style={{ margin: '0 0 8px 0', color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>{doctor.specialty || doctor.specialization || 'General Physician'}</p>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: 'var(--text-muted)' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                            {doctor.rating || '4.8'}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Briefcase size={14} />
                            {doctor.experience || '8'} years
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleBookAppointment(doctor)}
                      className="btn btn-dark"
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        borderRadius: '8px', 
                        fontWeight: '600', 
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        marginTop: 'auto',
                        backgroundColor: 'var(--nav-active-bg)',
                        color: 'var(--nav-active-text)',
                        border: 'none'
                      }}
                    >
                      <Plus size={16} />
                      Book Appointment
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default MyAppointment;