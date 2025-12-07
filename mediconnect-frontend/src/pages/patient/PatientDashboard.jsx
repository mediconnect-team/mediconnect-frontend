import PageTitle from "../../components/common/PageTitle";
import StatCard from "../../components/patient/StatCard";
import AppointmentCard from "../../components/patient/AppointmentCard";
import ReportCard from "../../components/patient/ReportCard";
import QuickActionCard from './../../components/patient/QuickAction';



export default function PatientDashboard() {
    return (
        <div className="container-fluid">

            {/* Title */}
            <PageTitle
                title="Welcome Back, John!"
                subtitle="Here's an overview of your health information"
            />

            {/* Stats */}
            <div className="row g-3 mb-4">

                <div className="col-md-3">
                    <StatCard
                        label="Upcoming Appointments"
                        value="2"
                        icon="bi-calendar2-week"
                        iconColor="#0066ff"
                    />
                </div>

                <div className="col-md-3">
                    <StatCard
                        label="Pending Bills"
                        value="$350"
                        icon="bi-credit-card"
                        iconColor="#ff3b3b"
                    />
                </div>

                <div className="col-md-3">
                    <StatCard
                        label="Medical Records"
                        value="15"
                        icon="bi-file-earmark-medical"
                        iconColor="#00a65a"
                    />
                </div>

                <div className="col-md-3">
                    <StatCard
                        label="Active Prescriptions"
                        value="3"
                        icon="bi-heart-pulse"
                        iconColor="#8a2be2"
                    />
                </div>
            </div>

            {/* Appointments + Reports */}
            <div className="row g-4">

                {/* Appointments */}
                <div className="col-md-6">
                    <div className="card shadow-sm p-3 rounded-4">

                        <div className="d-flex justify-content-between">
                            <h5 className="fw-bold">Upcoming Appointments</h5>
                            <button className="btn btn-dark btn-sm">+ Book New</button>
                        </div>

                        <div className="mt-3">
                            <AppointmentCard
                                doctor="Dr. Smith"
                                dept="Cardiology"
                                date="25/01/2024"
                                status="Confirmed"
                            />
                            <AppointmentCard
                                doctor="Dr. Johnson"
                                dept="General Medicine"
                                date="28/01/2024"
                                status="Pending"
                            />
                        </div>
                    </div>
                </div>

                {/* Reports */}
                <div className="col-md-6">
                    <div className="card shadow-sm p-3 rounded-4">
                        <div className="d-flex justify-content-between">
                            <h5 className="fw-bold">Recent Reports</h5>
                            <button className="btn btn-outline-dark btn-sm">
                                View All
                            </button>
                        </div>

                        <div className="mt-3">
                            <ReportCard
                                title="Blood Test Results"
                                doctor="Dr. Smith"
                                status="Normal"
                                date="20/01/2024"
                            />
                            <ReportCard
                                title="X-Ray Report"
                                doctor="Dr. Davis"
                                status="Under Review"
                                date="18/01/2024"
                            />
                        </div>
                    </div>
                </div>

            </div>

            {/* Quick Actions */}
            <div className="mt-5">
                <h5 className="fw-bold mb-3">Quick Actions</h5>

                <div className="row g-3">
                    <div className="col-md-3">
                        <QuickActionCard icon="bi-calendar2-plus" label="Book Appointment" />
                    </div>

                    <div className="col-md-3">
                        <QuickActionCard icon="bi-wallet2" label="Pay Bills" />
                    </div>

                    <div className="col-md-3">
                        <QuickActionCard icon="bi-file-earmark-text" label="View Records" />
                    </div>

                    <div className="col-md-3">
                        <QuickActionCard icon="bi-heart-pulse" label="Health History" />
                    </div>
                </div>
            </div>
        </div>
    );
}
