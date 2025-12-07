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

    </Routes>
  );
}
