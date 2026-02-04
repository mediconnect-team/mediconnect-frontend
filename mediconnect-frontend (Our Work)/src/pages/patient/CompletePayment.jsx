import React, { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle, Lock, CreditCard } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import { createOrder, verifyPayment, getRazorpayKey } from '../../services/patientApi';
import useAuth from '../../hooks/useAuth';

// Helper to safely format time from various inputs (string or array)
const getFormattedTime = (time) => {
  if (!time) return "00:00:00";
  // Handle array format [hour, minute] or [hour, minute, second]
  if (Array.isArray(time)) {
    const h = String(time[0]).padStart(2, '0');
    const m = String(time[1] || 0).padStart(2, '0');
    const s = String(time[2] || 0).padStart(2, '0');
    return `${h}:${m}:${s}`;
  }
  // Handle string format
  const str = String(time);
  if (str.length === 5) return `${str}:00`;
  return str;
};

const CompletePayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { appointmentId, amount, doctor, date, slot } = location.state || {};
  const { patientId } = useAuth(); // Assuming we might need user info for prefill

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Redirect if missing data
  useEffect(() => {
    if (!appointmentId || !amount) {
      navigate('/patient/appointments/1');
    }
  }, [appointmentId, amount, navigate]);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Create Order
      const orderPayload = {
        amount: amount,
        purpose: "Medical Appointment", // Fixed purpose or dynamic
        appointmentId: appointmentId,
        patientId: patientId
      };

      const orderResponse = await createOrder(orderPayload);
      console.log("Order Created:", orderResponse);

      // NOTE: Backend `BillingService` likely returns the Order object as string or map.
      // Let's assume orderResponse has `id` (standard Razorpay) or whatever backend returns.
      // If backend returns `string` (orderId), use that.
      // Let's assume orderResponse IS the order object.

      const rzpKey = await getRazorpayKey();

      const options = {
        key: rzpKey,
        amount: orderResponse.amount, // Amount in paise
        currency: "INR",
        name: "MediConnect",
        description: "Appointment Payment",
        order_id: orderResponse.orderId, // Matches backend response key
        handler: async function (response) {
          try {
            // 2. Verify Payment
            const verifyPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              appointmentId: appointmentId
            };

            // Call verification API
            await verifyPayment(verifyPayload); // returns string or success obj

            // Navigate to Success
            navigate("/patient/appointments/4");

          } catch (verifyErr) {
            console.error("Payment Verification Failed:", verifyErr);
            setError("Payment verification failed. Please contact support.");
            setLoading(false);
          }
        },
        prefill: {
          name: "Patient Name", // Could get from auth context
          email: "patient@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#111827"
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        console.error("Payment Failed:", response.error);
        setError(response.error.description || "Payment failed");
        setLoading(false);
      });
      rzp.open();

    } catch (err) {
      console.error("Payment Initialization Failed:", err);
      setError("Failed to initiate payment. Please try again.");
      setLoading(false);
    }
  };

  if (!appointmentId) return null;

  return (
    <div className="payment-wrapper">
      <style>{`
                .payment-wrapper {
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                  background-color: var(--bg-color);
                  min-height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 20px;
                }
                .payment-card {
                  background: var(--card-bg);
                  border-radius: 16px;
                  box-shadow: var(--card-shadow);
                  width: 100%;
                  max-width: 900px;
                  display: flex;
                  overflow: hidden;
                  flex-direction: row; 
                }
                @media (max-width: 768px) {
                    .payment-card {
                        flex-direction: column;
                    }
                }
                .left-panel {
                    flex: 1;
                    padding: 40px;
                    border-right: 1px solid var(--border-color);
                }
                .right-panel {
                    flex: 1;
                    padding: 40px;
                    background-color: var(--card-inner-bg);
                }
                .back-link {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: var(--text-muted);
                    cursor: pointer;
                    margin-bottom: 24px;
                    font-size: 14px;
                    font-weight: 500;
                }
                .title {
                    font-size: 24px;
                    font-weight: 700;
                    color: var(--text-color);
                    margin-bottom: 8px;
                }
                .subtitle {
                    color: var(--text-muted);
                    margin-bottom: 32px;
                    font-size: 14px;
                }
                .info-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 16px;
                    padding-bottom: 16px;
                    border-bottom: 1px solid var(--border-color);
                }
                .info-label {
                    color: var(--text-muted);
                    font-size: 14px;
                }
                .info-value {
                    font-weight: 600;
                    color: var(--text-color);
                    font-size: 14px;
                    text-align: right;
                }
                .total-row {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 24px;
                    font-size: 18px;
                    font-weight: 700;
                    color: var(--text-color);
                }
                .btn-pay {
                    width: 100%;
                    background-color: var(--nav-active-bg);
                    color: var(--nav-active-text);
                    padding: 14px;
                    border-radius: 8px;
                    border: none;
                    font-weight: 600;
                    font-size: 16px;
                    cursor: pointer;
                    margin-top: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: opacity 0.2s;
                }
                .btn-pay:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
                .secure-badge {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    margin-top: 20px;
                    color: #22c55e;
                    font-size: 13px;
                    font-weight: 500;
                }
                .method-card {
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    padding: 16px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: var(--card-bg);
                    margin-bottom: 16px;
                }
                .error-box {
                    padding: 12px;
                    background-color: rgba(220, 38, 38, 0.1);
                    color: #ef4444;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    font-size: 14px;
                    border: 1px solid rgba(220, 38, 38, 0.2);
                }
            `}</style>

      <div className="payment-card">
        <div className="left-panel">
          <div className="back-link" onClick={() => navigate("/patient/appointments/3", { state: { doctor, date, slot } })}>
            <ArrowLeft size={16} /> Back
          </div>

          <h1 className="title">Complete Payment</h1>
          <p className="subtitle">Secure your appointment by completing the payment</p>

          <div className="info-row">
            <span className="info-label">Doctor</span>
            <span className="info-value">{doctor?.name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Date & Time</span>
            <span className="info-value">{date} at {getFormattedTime(slot?.startTime).substring(0, 5)}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Consultation Fee</span>
            <span className="info-value">₹ {amount}</span>
          </div>
          <div className="total-row">
            <span>Total Amount</span>
            <span>₹ {amount}</span>
          </div>
        </div>

        <div className="right-panel">
          <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '16px', fontWeight: '600' }}>Payment Method</h3>

          <div className="method-card">
            <CreditCard size={20} color="var(--text-muted)" />
            <div>
              <div style={{ fontWeight: '500', fontSize: '14px', color: 'var(--text-color)' }}>Razorpay Secure Options</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>UPI, NetBanking, Cards, Wallet</div>
            </div>
            <CheckCircle size={16} color="#10b981" style={{ marginLeft: 'auto' }} />
          </div>

          {error && <div className="error-box">{error}</div>}

          <button className="btn-pay" onClick={handlePayment} disabled={loading}>
            {loading ? 'Processing...' : `Pay ₹ ${amount}`}
          </button>

          <div className="secure-badge">
            <Lock size={14} />
            Payments are 256-bit encrypted and secure
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletePayment;
