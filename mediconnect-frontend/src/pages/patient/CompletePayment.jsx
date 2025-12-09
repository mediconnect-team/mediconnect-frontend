import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const CompletePayment = () => {
  const navigate = useNavigate();
  return (
    <div className="payment-wrapper">
      <style>{`
        .payment-wrapper {
          font-family: 'Inter', sans-serif;
          padding: 40px 80px;
          background: linear-gradient(to bottom right, #f1f5ff, #fff);
          min-height: 100vh;
        }

        .back {
          display: flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          color: #444;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .title {
          font-size: 28px;
          font-weight: 700;
        }

        .subtitle {
          color: #7a7a7a;
          margin-bottom: 30px;
        }

        .layout {
          display: flex;
          gap: 30px;
        }

        /* LEFT CARD */
        .left-card, .summary-card {
          background: white;
          padding: 25px;
          border-radius: 15px;
          width: 320px;
          box-shadow: 0px 4px 12px rgba(0,0,0,0.08);
        }

        .section-title {
          font-weight: 600;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
        }

        .doctor-card {
          background: #f4f4ff;
          padding: 15px;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .doctor-name {
          font-weight: 600;
        }

        .item {
          margin-bottom: 10px;
        }

        .item span {
          font-weight: 600;
        }

        /* SUMMARY BOX */
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          color: #444;
        }

        .summary-row.total {
          font-size: 18px;
          font-weight: 700;
          margin-top: 10px;
        }

        /* RIGHT SIDE */
        .right-card {
          background: white;
          padding: 30px;
          border-radius: 15px;
          flex: 1;
          box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
        }

        .input-label {
          font-size: 14px;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .input {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
          margin-bottom: 15px;
        }

        .split {
          display: flex;
          gap: 10px;
        }

        .btn-wrapper {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
          gap: 20px;
        }

        .cancel-btn {
          padding: 12px 25px;
          background: white;
          border-radius: 8px;
          border: 1px solid #ddd;
          cursor: pointer;
        }

        .pay-btn {
          padding: 12px 30px;
          background: #000;
          color: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }

        .safe-box {
          margin-top: 20px;
          background: #eaffea;
          padding: 15px;
          border-radius: 10px;
          color: #187a22;
          border: 1px solid #b6e8b6;
          width: 300px;
        }
      `}</style>

      <div className="back" onClick={() => navigate("/patient/appointments")} >
        <ArrowLeft size={18} /> Back
      </div>

      <div className="title">Complete Payment</div>
      <div className="subtitle">
        Secure your appointment by completing the payment
      </div>

      <div className="layout">
        {/* LEFT SIDE */}
        <div>
          <div className="left-card">
            <div className="section-title">📅 Appointment Details</div>

            <div className="doctor-card">
              <div className="doctor-name">Dr. Michael Brown</div>
              <div>Dermatologist</div>
            </div>

            <div className="item">
              <span>Date:</span> Wednesday, December 10, 2025
            </div>
            <div className="item">
              <span>Time:</span> 11:00
            </div>
            <div className="item">
              <span>Type:</span> Consultation
            </div>
          </div>

          <div className="summary-card" style={{ marginTop: "20px" }}>
            <div className="section-title">$ Payment Summary</div>

            <div className="summary-row">
              <p>Consultation Fee</p>
              <p>$150</p>
            </div>
            <div className="summary-row">
              <p>Service Fee</p>
              <p>$10</p>
            </div>

            <div className="summary-row total">
              <p>Total Amount</p>
              <p>$160</p>
            </div>
          </div>

          <div className="safe-box">
            <strong>Secure Payment</strong>
            <br />
            Your payment information is encrypted and secure.
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-card">
          <div className="section-title">💳 Payment Information</div>

          <div className="input-label">Payment Method</div>
          <input className="input" value="Credit/Debit Card" readOnly />

          <div className="input-label">Cardholder Name</div>
          <input className="input" placeholder="John Doe" />

          <div className="input-label">Card Number</div>
          <input className="input" placeholder="1234 5678 9012 3456" />

          <div className="split">
            <div style={{ flex: 1 }}>
              <div className="input-label">Expiry Date</div>
              <input className="input" placeholder="MM/YY" />
            </div>

            <div style={{ flex: 1 }}>
              <div className="input-label">CVV</div>
              <input className="input" placeholder="123" />
            </div>
          </div>

          <div className="btn-wrapper">
            <button className="cancel-btn">Cancel</button>
            <button className="pay-btn">Pay $160</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletePayment;
