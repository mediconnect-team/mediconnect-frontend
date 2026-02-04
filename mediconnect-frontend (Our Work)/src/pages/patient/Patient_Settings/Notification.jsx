import React, { useState, useEffect } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Bell, Mail, MessageSquare, ShieldCheck, Save, CheckCircle } from "lucide-react";

export default function Notification() {
  const [settings, setSettings] = useState({
    appointmentReminders: true,
    emergencyAlerts: true,
    systemUpdates: false,
    reportGeneration: true,
    inApp: true,
    email: true,
    sms: false,
  });

  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("notificationSettings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    setSaving(true);
    localStorage.setItem("notificationSettings", JSON.stringify(settings));
    setTimeout(() => {
      setSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="settings-container">
      {showSuccess && (
        <Alert variant="success" className="mb-4 d-flex align-items-center gap-2 border-0 shadow-sm">
          <CheckCircle size={18} /> Notification preferences updated!
        </Alert>
      )}

      <div className="row">
        <Col lg={7}>
          <Card className="settings-card p-4 mb-4 border-0">
            <h5 className="mb-4 d-flex align-items-center gap-2 fw-bold">
              <Bell size={20} className="text-primary" /> Alert Preferences
            </h5>

            <div className="d-flex justify-content-between align-items-start py-3 border-bottom">
              <div className="flex-grow-1">
                <div className="fw-semibold">Appointment Reminders</div>
                <small className="text-muted">Get notifications about upcoming visits and scheduling changes</small>
              </div>
              <Form.Check 
                type="switch"
                checked={settings.appointmentReminders}
                onChange={() => handleToggle("appointmentReminders")}
              />
            </div>

            <div className="d-flex justify-content-between align-items-start py-3 border-bottom">
              <div className="flex-grow-1">
                <div className="fw-semibold">Security Alerts</div>
                <small className="text-muted">Notifications about login attempts and password changes</small>
              </div>
              <Form.Check 
                type="switch"
                checked={settings.emergencyAlerts}
                onChange={() => handleToggle("emergencyAlerts")}
              />
            </div>

            <div className="d-flex justify-content-between align-items-start py-3">
              <div className="flex-grow-1">
                <div className="fw-semibold">System Updates</div>
                <small className="text-muted">Stay informed about new features and platform improvements</small>
              </div>
              <Form.Check 
                type="switch"
                checked={settings.systemUpdates}
                onChange={() => handleToggle("systemUpdates")}
              />
            </div>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="settings-card p-4 mb-4 border-0">
            <h5 className="mb-4 d-flex align-items-center gap-2 fw-bold">
              <MessageSquare size={20} className="text-success" /> Delivery Channels
            </h5>

            <div className="d-flex align-items-center mb-4 gap-3">
              <div className="p-2 rounded bg-light">
                <Bell size={18} className="text-primary" />
              </div>
              <div className="flex-grow-1">
                <div className="small fw-bold">In-App Notifications</div>
              </div>
              <Form.Check 
                type="switch"
                checked={settings.inApp}
                onChange={() => handleToggle("inApp")}
              />
            </div>

            <div className="d-flex align-items-center mb-4 gap-3">
              <div className="p-2 rounded bg-light">
                <Mail size={18} className="text-warning" />
              </div>
              <div className="flex-grow-1">
                <div className="small fw-bold">Email Digest</div>
              </div>
              <Form.Check 
                type="switch"
                checked={settings.email}
                onChange={() => handleToggle("email")}
              />
            </div>

            <div className="d-flex align-items-center gap-3">
              <div className="p-2 rounded bg-light">
                <MessageSquare size={18} className="text-info" />
              </div>
              <div className="flex-grow-1">
                <div className="small fw-bold">SMS Messages</div>
              </div>
              <Form.Check 
                type="switch"
                checked={settings.sms}
                onChange={() => handleToggle("sms")}
              />
            </div>
          </Card>

          <Button 
            className="w-100 save-btn d-flex align-items-center justify-content-center gap-2" 
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? <Spinner size="sm" /> : <Save size={18} />}
            {saving ? "Saving..." : "Update Preferences"}
          </Button>
        </Col>
      </div>
    </div>
  );
}

// Add Col import
import { Col } from "react-bootstrap";
