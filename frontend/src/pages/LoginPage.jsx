import {
  useState,
} from "react";

import api
from "../api/api";

import {
  useAuth,
} from "../context/AuthContext";

import {
  useNavigate,
} from "react-router-dom";

function LoginPage() {

  const [mobile,
    setMobile] =
      useState("");

  const [otp,
    setOtp] =
      useState("");

  const [step,
    setStep] =
      useState(1);

  const { login } =
    useAuth();

  const navigate =
    useNavigate();

  // -------------------------
  // SEND OTP
  // -------------------------

  const sendOTP =
    async () => {

      try {

        await api.post(
          "/auth/send-otp",
          { mobile }
        );

        alert(
          "OTP sent successfully"
        );

        setStep(2);

      } catch (err) {

        alert(
          err.response?.data?.error ||

          "Failed to send OTP"
        );
      }
    };

  // -------------------------
  // VERIFY OTP
  // -------------------------

  const verifyOTP =
    async () => {

      try {

        const response =
          await api.post(
            "/auth/verify-otp",
            {
              mobile,
              otp,
            }
          );

        login(
          response.data.token,
          response.data.user
        );

        const user =
          response.data.user;


        // -------------------------
        // ROLE-BASED REDIRECTION
        // -------------------------

        if (

          user.role ===
          "SUPER_ADMIN"
        ) {

          navigate(
            "/super-admin/dashboard"
          );
        }

        else if (

          user.role ===
          "EXECUTIVE"
        ) {

          navigate(
            "/executive/dashboard"
          );
        }

        else if (

          user.role ===
          "ADMIN"
        ) {

          navigate(
            "/admin/dashboard"
          );
        }

        else if (

          user.role ===
          "AGENCY"
        ) {

          navigate(
            "/agency/dashboard"
          );
        }

        else if (

          user.role ===
          "AGENT"
        ) {

          navigate(
            "/agent/dashboard"
          );
        }

        else {

          navigate(
            "/dashboard"
          );
        }

      } catch (err) {

        alert(
          err.response?.data?.error ||

          "OTP verification failed"
        );
      }
    };

  // -------------------------
  // UI
  // -------------------------

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-blue-600">

            Citizen Platform

          </h1>

          <p className="text-gray-500 mt-2">

            Welfare Access System

          </p>

        </div>

        {/* MOBILE */}

        <div className="mb-5">

          <label className="block text-sm font-medium text-gray-700 mb-2">

            Mobile Number

          </label>

          <input
            type="text"

            placeholder="Enter mobile number"

            value={mobile}

            onChange={(e) =>
              setMobile(
                e.target.value
              )
            }

            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* OTP */}

        {
          step === 2 && (

            <div className="mb-5">

              <label className="block text-sm font-medium text-gray-700 mb-2">

                OTP

              </label>

              <input
                type="text"

                placeholder="Enter OTP"

                value={otp}

                onChange={(e) =>
                  setOtp(
                    e.target.value
                  )
                }

                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>
          )
        }

        {/* BUTTON */}

        {
          step === 1 ? (

            <button
              onClick={sendOTP}

              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            >

              Send OTP

            </button>

          ) : (

            <button
              onClick={verifyOTP}

              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
            >

              Verify OTP

            </button>
          )
        }

      </div>

    </div>
  );
}

export default LoginPage;