import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PatientLayout from "../components/layout/PatientLayout";

export default function PatientRoute() {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" replace />;
    if (user.role !== "PATIENT") return <Navigate to="/login" replace />;

    return (
        <PatientLayout>
            <Outlet />
        </PatientLayout>
    );
}
