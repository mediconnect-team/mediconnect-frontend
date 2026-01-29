import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { createPaymentIntent, holdSlot } from '../../services/patientApi';
import { verifyPayment } from '../../services/patientApi';
const CompletePayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { patientId } = useAuth();
  const { selectedDoctor, selectedDate, selectedTime, appointmentType, notes, appointmentId, status } = location.state || {};
  const [isProcessing, setIsProcessing] = useState(false);

  if (!selectedDoctor || !selectedDate || !selectedTime) {
    navigate("/patient/appointments");
    return null;
  }

  const handlePayment = async () => {
    const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

    

    setIsProcessing(true);
    try {
      // If appointment is already booked (from step 4), just proceed with payment
      

      // Fallback: Book appointment if not already booked (old flow)
      const startTimeStr = selectedTime.length === 5 ? `${selectedTime}:00` : selectedTime;
      
      const [hours, minutes] = startTimeStr.split(':').map(Number);
      const endMinutes = minutes + 30;
      const endHours = hours + Math.floor(endMinutes / 60);
      const finalEndMinutes = endMinutes % 60;
      const endTimeStr = `${endHours.toString().padStart(2, '0')}:${finalEndMinutes.toString().padStart(2, '0')}:00`;

      const holdSlotData = {
        doctorId: selectedDoctor.doctorId,
        patientId: patientId,
        date: selectedDate.toLocaleDateString('en-CA'),
        amount:160,
        startTime: startTimeStr,
        endTime: endTimeStr,
        purpose : appointmentType,
        appointmentId: appointmentId || null,
      };

      console.log("Hold Slot Data:", holdSlotData);

      
      const order = await createPaymentIntent(holdSlotData);
      console.log("Payment Intent Response:", order);

      // const { order, appointmentId: newAppointmentId } = response;
      const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }


    const options = {
      key: "rzp_test_S9dNhbDJlTqrwH", 
      amount: order.amount,
      currency: order.currency,
      order_id: order.orderId,
      name: "Doctor Appointment",
      description: "Consultation Fee",

      handler: async function (response) {
        await verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          appointmentId
        });

        alert("Payment successful 🎉");
        navigate("/patient/appointments");
      },

      theme: {
        color: "#3399cc"
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
      
      
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Failed to process payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-wrapper">
      <style>{`
        .payment-wrapper {
          font-family: 'Inter', sans-serif;
          padding: 20px 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          color: #333;
        }

        .back {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: #fff;
          margin-bottom: 15px;
          font-size: 16px;
          font-weight: 500;
          transition: opacity 0.2s;
        }

        .back:hover {
          opacity: 0.8;
        }

        .title {
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 6px;
        }

        .subtitle {
          color: #e0e0e0;
          margin-bottom: 30px;
          font-size: 16px;
        }

        .payment-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          border: 1px solid rgba(255,255,255,0.2);
          overflow: hidden;
          max-width: 1000px;
          margin: 0 auto;
        }

        .card-header {
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
          padding: 24px 32px;
          border-bottom: 1px solid #e2e8f0;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .appointment-summary {
          display: flex;
          align-items: center;
          gap: 24px;
          flex: 1;
        }

        .doctor-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .doctor-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 18px;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .doctor-details h3 {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
          letter-spacing: -0.025em;
        }

        .doctor-details p {
          margin: 4px 0 0;
          color: #64748b;
          font-size: 14px;
          font-weight: 500;
        }

        .appointment-details {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .detail-item {
          text-align: center;
          padding: 8px 16px;
          background: linear-gradient(135deg, #f1f5f9 0%, #ffffff 100%);
          border-radius: 10px;
          border: 1px solid #e2e8f0;
        }

        .detail-label {
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }

        .detail-value {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          letter-spacing: -0.025em;
        }

        .total-amount {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 16px 24px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .total-amount .detail-label {
          color: rgba(255,255,255,0.9);
        }

        .total-amount .detail-value {
          color: white;
          font-size: 20px;
        }

        .card-body {
          padding: 32px;
        }

        .payment-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }

        .payment-info {
          flex: 1;
        }

        .payment-title {
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 8px;
          letter-spacing: -0.025em;
        }

        .payment-subtitle {
          color: #64748b;
          margin-bottom: 24px;
          font-size: 14px;
        }

        .secure-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
          color: #155724;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          border: 1px solid #c3e6cb;
        }

        .payment-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .cancel-btn {
          padding: 14px 28px;
          background: #f8fafc;
          border-radius: 12px;
          border: 2px solid #e2e8f0;
          cursor: pointer;
          font-weight: 600;
          color: #64748b;
          transition: all 0.3s ease;
          font-size: 14px;
        }

        .cancel-btn:hover {
          background: #edf2f7;
          border-color: #cbd5e0;
          transform: translateY(-1px);
        }

        .pay-btn {
          padding: 14px 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          border: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          font-size: 14px;
        }

        .pay-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
        }

        .pay-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .pay-btn:disabled:hover {
          transform: none;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        @media (max-width: 768px) {
          .payment-wrapper {
            padding: 15px 20px;
          }

          .header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .appointment-summary {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .appointment-details {
            flex-wrap: wrap;
            gap: 12px;
          }

          .payment-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
          }

          .payment-actions {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>

      <div className="back" onClick={() => navigate("/patient/appointments")} >
        <ArrowLeft size={18} /> Back
      </div>

      <div className="title">Complete Payment</div>
      <div className="subtitle">
        Secure your appointment by completing the payment
      </div>

      <div className="payment-card">
        <div className="card-header">
          <div className="header-content">
            <div className="appointment-summary">
              <div className="doctor-info">
                <div className="doctor-avatar">
                  {selectedDoctor.name.charAt(0)}
                </div>
                <div className="doctor-details">
                  <h3>Dr. {selectedDoctor.name}</h3>
                  <p>{selectedDoctor.specialization}</p>
                </div>
              </div>

              <div className="appointment-details">
                <div className="detail-item">
                  <div className="detail-label">Date</div>
                  <div className="detail-value">{selectedDate.toLocaleDateString()}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Time</div>
                  <div className="detail-value">{selectedTime.substring(0, 5)}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Type</div>
                  <div className="detail-value">{appointmentType}</div>
                </div>
                <div className="total-amount">
                  <div className="detail-label">Total Amount</div>
                  <div className="detail-value">₹1500</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="payment-section">
            <div className="payment-info">
              <h2 className="payment-title">Payment Details</h2>
              <p className="payment-subtitle">
                {appointmentId 
                  ? `Complete your payment to confirm appointment #${appointmentId} (${status})`
                  : "Complete your secure payment to confirm the appointment"
                }
              </p>
              <div className="secure-badge">
                🔒 Secure Payment
              </div>
              {appointmentId && (
                <div style={{ marginTop: '16px', padding: '12px', background: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)', borderRadius: '8px', border: '1px solid #c3e6cb' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#155724', marginBottom: '4px' }}>
                    Appointment Status: {status}
                  </div>
                  <div style={{ fontSize: '12px', color: '#155724' }}>
                    Appointment ID: {appointmentId}
                  </div>
                </div>
              )}
            </div>

            <div className="payment-actions">
              <button className="cancel-btn" onClick={() => navigate("/patient/appointments")}>Cancel</button>
              <button 
                className="pay-btn" 
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Pay Now ₹1500"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletePayment;
