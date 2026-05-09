import { useState } from "react";

import api from "../api/api";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {

  const [mobile, setMobile] = useState("");

  const [otp, setOtp] = useState("");

  const [step, setStep] = useState(1);

  const { login } = useAuth();
  const navigate = useNavigate();


  // ✅ Send OTP
  const sendOTP = async () => {

    try {

      await api.post("/auth/send-otp", {
        mobile
      });

      alert("OTP sent");

      setStep(2);

    } catch (err) {

      alert(
        err.response?.data?.error || "Error sending OTP"
      );
    }
  };

  // ✅ Verify OTP
  const verifyOTP = async () => {

    try {

      const response = await api.post(
        "/auth/verify-otp",
        {
          mobile,
          otp
        }
      );

      // ✅ Save token
      login(response.data.token);

  
      // Save actual user
      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user
        )
      );

      navigate("/dashboard");


      console.log(response.data);

    } catch (err) {

      alert(
        err.response?.data?.error || "OTP verification failed"
      );
    }
  };

  return (
    <div style={{ padding: 20 }}>

      <h2>Citizen Platform Login</h2>

      <input
        type="text"
        placeholder="Enter Mobile Number"
        value={mobile}
        onChange={(e) =>
          setMobile(e.target.value)
        }
      />

      <br />
      <br />

      {
        step === 1 ? (

          <button onClick={sendOTP}>
            Send OTP
          </button>

        ) : (

          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
              }
            />

            <br />
            <br />

            <button onClick={verifyOTP}>
              Verify OTP
            </button>
          </>
        )
      }

    </div>
  );
}

export default LoginPage;