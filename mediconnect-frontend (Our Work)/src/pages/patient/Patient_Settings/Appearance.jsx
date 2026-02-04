import React, { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { Sun, Moon, Layout, Check, Save, Type } from "lucide-react";

export default function Appearance() {
  const { 
    theme, setTheme, 
    compactMode, setCompactMode, 
    fontSize, setFontSize 
  } = useTheme();

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="settings-container">
      {showSuccess && (
        <Alert variant="success" className="mb-4 d-flex align-items-center gap-2 border-0 shadow-sm">
          <Check size={18} /> Appearance settings saved successfully!
        </Alert>
      )}

      <Row>
        <Col lg={6}>
          <Card className="settings-card p-4 mb-4 border-0">
            <h5 className="mb-4 d-flex align-items-center gap-2 fw-bold">
              <Sun size={20} className="text-primary" /> Visual Theme
            </h5>

            <div className="d-flex gap-3">
                  <button
                    className={`theme-preview-btn ${theme === 'light' ? 'active' : ''}`}
                    onClick={() => setTheme('light')}
                  >
                    <div className="preview-box light">
                      <Sun size={20} />
                      <span>Light Mode</span>
                    </div>
                  </button>

                  <button
                    className={`theme-preview-btn ${theme === 'dark' ? 'active' : ''}`}
                    onClick={() => setTheme('dark')}
                  >
                    <div className="preview-box dark">
                      <Moon size={20} />
                      <span>Dark Mode</span>
                    </div>
                  </button>
                </div>

                <div className="mt-4 d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="mb-1 fw-bold">Compact UI</h6>
                    <p className="text-muted small mb-0">Optimized for small screens</p>
                  </div>
                  <Form.Check 
                    type="switch"
                    id="compact-switch"
                    checked={compactMode}
                    onChange={(e) => setCompactMode(e.target.checked)}
                  />
                </div>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="settings-card p-4 mb-4 border-0">
            <h5 className="mb-4 d-flex align-items-center gap-2 fw-bold">
              <Type size={20} className="text-success" /> Typography & Layout
            </h5>

            <div className="mb-4">
                <div className="mb-3">
                  <Form.Label className="form-label">Font Size</Form.Label>
                  <Form.Select 
                    value={fontSize} 
                    onChange={(e) => setFontSize(e.target.value)}
                  >
                    <option value="Small">Small (Default - 13px)</option>
                    <option value="Medium">Medium (15px)</option>
                    <option value="Large">Large (17px)</option>
                  </Form.Select>
                  <small className="text-muted mt-2 d-block">Adjust how text is displayed across your dashboard.</small>
                </div>
            </div>

            <div className="mb-2">
              <Form.Label className="form-label d-flex align-items-center gap-2">
                <Layout size={14} /> Default Landing Page
              </Form.Label>
              <Form.Select defaultValue="Dashboard">
                <option>Dashboard</option>
                <option>Appointments</option>
                <option>Medical Records</option>
              </Form.Select>
            </div>
          </Card>

          <Button className="w-100 save-btn d-flex align-items-center justify-content-center gap-2" onClick={handleSave}>
            <Save size={18} /> Save Appearance
          </Button>
        </Col>
      </Row>
    </div>
  );
}
