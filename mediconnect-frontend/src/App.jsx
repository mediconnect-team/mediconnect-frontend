import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/patient/Dashboard";
import PatientRoute from "./routing/PatientRoute";
import Login from './pages/auth/Login';
import Register from "./pages/auth/RegisterPatient";

export default function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      {/* Patient Protected */}
      <Route path="/patient" element={<PatientRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

    </Routes>
  );
}
