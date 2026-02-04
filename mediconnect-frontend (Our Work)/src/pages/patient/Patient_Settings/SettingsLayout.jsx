import { NavLink, Outlet } from "react-router-dom";
import "./Settings.css";

export default function SettingsLayout() {
    const tabs = ["edit-profile", "notification", "appearance"];

    return (
        <div className="w-100 p-4 settings-container">
            {/* Header */}
            <div className="mb-4">
                <h2 className="fw-bold mb-1">Account Settings</h2>
                <p className="text-muted">Manage your profile, notifications, and preferences</p>
            </div>

            {/* Pill Tabs */}
            <div className="pill-tabs mb-4">
                {tabs.map((tab) => (
                    <NavLink
                        key={tab}
                        to={tab}
                        className={({ isActive }) =>
                            "pill-tab" + (isActive ? " pill-active" : "")
                        }
                    >
                        {/* {tab.charAt(0).toUpperCase() + tab.slice(1)} */}
                        {tab.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())}
                    </NavLink>
                ))}
            </div>

            {/* Page Content */}
            <Outlet />
        </div>
    );
}
