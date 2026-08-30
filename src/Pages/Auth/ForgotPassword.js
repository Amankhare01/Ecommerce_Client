import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../../component/Layout/Layout/Layout";
import { FiMail, FiLock, FiShield, FiArrowRight, FiCheckCircle } from "react-icons/fi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Step 1: Send OTP to Email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email || !email.trim()) {
      toast.error("Please enter your registered email address");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/auth/send-otp", { email: email.trim() });
      setLoading(false);

      if (data?.success) {
        setOtpSent(true);
        setTimer(60);
        setOtp("");
        toast.success(data.message || "OTP verification code sent to your email!");
      } else {
        toast.error(data?.message || "Failed to send OTP");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      let errMsg = "Error sending OTP. Please check your connection.";
      if (error.response?.data && typeof error.response.data === "object" && error.response.data.message) {
        errMsg = error.response.data.message;
      } else if (error.response?.status === 404) {
        errMsg = "Backend route not active. Please restart your backend server terminal (Ctrl+C and restart).";
      }
      toast.error(errMsg, { duration: 6000 });
    }
  };

  // Step 2: Verify OTP and Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || otp.trim().length < 4) {
      toast.error("Please enter the verification code (OTP)");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/auth/reset-password-otp", {
        email: email.trim(),
        otp: otp.trim(),
        newPassword,
      });
      setLoading(false);

      if (data?.success) {
        toast.success("Password reset successfully! Please login with your new password.");
        navigate("/login");
      } else {
        toast.error(data?.message || "Failed to reset password");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      const errMsg =
        error.response?.data?.message || "Invalid or expired OTP. Please try again.";
      toast.error(errMsg);
    }
  };

  return (
    <Layout title="OTP Password Reset - Ecommerce">
      <div className="py-12 flex items-center justify-center">
        <div className="w-full max-w-md bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          
          {/* Top Icon and Heading */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
              <FiShield className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900">
              {otpSent ? "Enter Verification Code" : "Reset via Email OTP"}
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              {otpSent
                ? `Enter the 6-digit code sent to ${email}`
                : "We'll send a one-time verification code to your email"}
            </p>
          </div>

          {!otpSent ? (
            /* Step 1: Request OTP Form */
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl pl-10 pr-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="you@example.com"
                  />
                  <FiMail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-bold text-sm py-3 rounded-xl shadow-sm transition-colors mt-2 disabled:opacity-50"
              >
                <span>{loading ? "Sending OTP..." : "Send Verification Code"}</span>
                <FiArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Step 2: Verify OTP & Enter New Password Form */
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-neutral-700">
                    6-Digit OTP Code
                  </label>
                  <button
                    type="button"
                    disabled={timer > 0 || loading}
                    onClick={handleSendOtp}
                    className="text-xs text-primary-600 hover:text-primary-700 font-semibold disabled:text-neutral-400 disabled:cursor-not-allowed"
                  >
                    {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-center font-mono font-bold tracking-widest text-lg rounded-xl py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="123456"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl pl-10 pr-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Minimum 6 characters"
                  />
                  <FiLock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl pl-10 pr-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Re-enter new password"
                  />
                  <FiLock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-bold text-sm py-3 rounded-xl shadow-sm transition-colors mt-2 disabled:opacity-50"
              >
                <FiCheckCircle className="w-4 h-4" />
                <span>{loading ? "Resetting Password..." : "Confirm & Reset Password"}</span>
              </button>

              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full text-xs text-neutral-500 hover:text-neutral-700 text-center pt-1"
              >
                Use a different email address
              </button>
            </form>
          )}

          <p className="text-xs text-center text-neutral-500 mt-6 border-t border-neutral-100 pt-4">
            Remembered your password?{" "}
            <Link to="/login" className="text-primary-600 font-semibold hover:underline">
              Back to Sign in
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
