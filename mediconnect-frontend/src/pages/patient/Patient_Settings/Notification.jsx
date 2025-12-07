import React, { useState } from "react";

export default function App() {
  const [settings, setSettings] = useState({
    appointmentReminders: true,
    emergencyAlerts: true,
    systemUpdates: false,
    reportGeneration: true,
    inApp: true,
    email: true,
    sms: false,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="py-2 w-100">

      <div className="card p-3 mb-4 shadow-sm">
        <h5 className="mb-3">🔔 Notification Preferences</h5>


        <div className="d-flex justify-content-between align-items-center border-bottom py-3">
          <div>
            <div className="fw-semibold">Appointment Reminders</div>
            <small className="text-muted">
              Get notified about upcoming appointments
            </small>
          </div>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              checked={settings.appointmentReminders}
              onChange={() => handleToggle("appointmentReminders")}
            />
          </div>
        </div>


        <div className="d-flex justify-content-between align-items-center border-bottom py-3">
          <div>
            <div className="fw-semibold">Emergency Alerts</div>
            <small className="text-muted">
              Critical system and patient alerts
            </small>
          </div>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              checked={settings.emergencyAlerts}
              onChange={() => handleToggle("emergencyAlerts")}
            />
          </div>
        </div>


        <div className="d-flex justify-content-between align-items-center border-bottom py-3">
          <div>
            <div className="fw-semibold">System Updates</div>
            <small className="text-muted">
              Software updates and maintenance notifications
            </small>
          </div>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              checked={settings.systemUpdates}
              onChange={() => handleToggle("systemUpdates")}
            />
          </div>
        </div>


        <div className="d-flex justify-content-between align-items-center py-3">
          <div>
            <div className="fw-semibold">Report Generation</div>
            <small className="text-muted">
              Daily and weekly report notifications
            </small>
          </div>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              checked={settings.reportGeneration}
              onChange={() => handleToggle("reportGeneration")}
            />
          </div>
        </div>
      </div>


      <div className="card p-3 shadow-sm">
        <h5 className="mb-3">Notification Methods</h5>

        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={settings.inApp}
            onChange={() => handleToggle("inApp")}
          />
          <label className="form-check-label">In-app notifications</label>
        </div>

        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={settings.email}
            onChange={() => handleToggle("email")}
          />
          <label className="form-check-label">Email notifications</label>
        </div>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={settings.sms}
            onChange={() => handleToggle("sms")}
          />
          <label className="form-check-label">SMS notifications</label>
        </div>

      </div>
      <div className="text-end mt-4">
        <button className="btn btn-dark px-4">💾 Save Settings</button>
      </div>
    </div>
  );
}
