import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/patient/Dashboard";
import PatientRoute from "./routing/PatientRoute";
import Login from './pages/auth/Login';
import Register from "./pages/auth/RegisterPatient";

// Settings pages
import Settings from './pages/patient/Patient_Settings/Settings';
import Notification from './pages/patient/Patient_Settings/Notification';
import Security from './pages/patient/Patient_Settings/Security';
import System from './pages/patient/Patient_Settings/System';
import Appearance from './pages/patient/Patient_Settings/Appearance';
import LandingPage from './pages/LandingPage/LandingPage';
import MedicalRecords from "./pages/patient/MedicalRecord";
import EmergencyContacts from './pages/patient/EmergencyContact';
import DoctorRoute from "./routing/DoctorRoute";
import DoctorDashboard from "./components/doctor/DoctorDashboard";
import AdminRoute from './routing/AdminRoute';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminStaffRegistration from "./pages/admin/AdminStaffRegistration";
import StaffDirectory from "./pages/admin/AdminStaffDirectory";
import AppointmentsMonitor from "./pages/admin/AppointmentMonitor";

export default function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Patient Protected Routes */}
      <Route path="/patient" element={<PatientRoute />}>

        {/* Patient Dashboard */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* Patient Medical Records */}
        <Route path="records" element={<MedicalRecords />} />

        {/* Patient Medical Emergency Contact */}
        <Route path="emergency" element={<EmergencyContacts />} />

        {/* Patient Settings */}
        <Route path="settings" element={<Settings />}>
          <Route index element={<div />} />
          <Route path="general" element={<div />} />
          <Route path="notification" element={<Notification />} />
          <Route path="security" element={<Security />} />
          <Route path="system" element={<System />} />
          <Route path="appearance" element={<Appearance />} />
        </Route>

      </Route>

      {/* Doctor Protected Routes */}
      <Route path="/doctor" element={<DoctorRoute />}>
        <Route path="dashboard" element={<DoctorDashboard />} />
        {/* <Route path="reports" element={<DoctorReports />} />
        <Route path="schedule" element={<DoctorSchedule />} />
        <Route path="appointments" element={<DoctorAppointments />} /> */}
        <Route path="settings" element={<Settings />}>
          <Route index element={<div />} />
          <Route path="general" element={<div />} />
          <Route path="notification" element={<Notification />} />
          <Route path="security" element={<Security />} />
          <Route path="system" element={<System />} />
          <Route path="appearance" element={<Appearance />} />
        </Route>
      </Route>

      {/* ADMIN */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="staff">
          <Route path="registration" element={<AdminStaffRegistration />} />
          <Route path="directory" element={<StaffDirectory />} />
        </Route>
        <Route path="appointments" element={<AppointmentsMonitor />} />

        {/* <Route path="staff" element={<StaffRegistration />} />
        <Route path="patients" element={<ManagePatients />} />
        <Route path="doctors" element={<ManageDoctors />} /> */}

        <Route path="settings" element={<Settings />}>
          <Route index element={<div />} />
          <Route path="general" element={<div />} />
          <Route path="notification" element={<Notification />} />
          <Route path="security" element={<Security />} />
          <Route path="system" element={<System />} />
          <Route path="appearance" element={<Appearance />} />
        </Route>
      </Route>


    </Routes>
  );
}
