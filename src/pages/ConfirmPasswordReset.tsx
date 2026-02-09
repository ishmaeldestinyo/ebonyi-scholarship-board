import React, { useState, type FormEvent } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { LockIcon, KeyIcon, ShieldCheckIcon } from "lucide-react";
import axiosInstance from "../api/axiosConfig";
import { Colors } from "../utils/colors";

function ConfirmPasswordReset() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tokenFromQuery = queryParams.get("token");

  const [token, setToken] = useState(tokenFromQuery || "");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token && !otp) {
      toast.error("Enter OTP or token to proceed.");
      return;
    }
    if (!password || !confirmPassword) {
      toast.error("Both password fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.post("/api/users/confirm-password-reset", {
        token,
        otp,
        password,
      });

      if (res.status === 200) {
        toast.success("Password reset successful! You can now login.");
        navigate("/auth/login");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Reset failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-12 w-full md:h-dvh overflow-hidden"
    >
      {/* Left Visual */}
      <div className="relative hidden lg:block col-span-7">
        <img
          src="/images/bg.jpg"
          alt="Hero"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center px-8 text-center">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-white text-4xl lg:text-5xl font-bold"
          >
            Reset your password
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 text-lg mt-4 max-w-xl"
          >
            Choose a new password. Use the link sent or enter the OTP you received.
          </motion.p>
        </div>
      </div>

      {/* Right Form */}
      <motion.div
        className="col-span-12 lg:col-span-5"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ backgroundColor: Colors.deepForestGreen }}
      >
        <section className="flex items-center justify-center w-full h-full p-8">
          <div className="w-full max-w-md space-y-6">
            <div className="w-8 mx-auto mb-2">
              <Link to="/">
                <img src="/icon.png" alt="Logo" />
              </Link>
            </div>

            <div className="text-center">
              <h2 className="text-lg font-semibold text-white border-b border-white/30 pb-2">
                Confirm Password Reset
              </h2>
              <p className="text-sm text-white/70 mt-2">
                Set a new password to access your account.
              </p>
            </div>

            {/* OTP (only if no token in URL) */}
            {!tokenFromQuery && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full bg-white/10 border border-white/30 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/50"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                  <ShieldCheckIcon size={18} />
                </span>
              </motion.div>
            )}

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                className="w-full bg-white/10 border border-white/30 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/50"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                <LockIcon size={18} />
              </span>
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full bg-white/10 border border-white/30 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/50"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                <KeyIcon size={18} />
              </span>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md font-semibold text-white transition-all duration-300 ${
                loading
                  ? "bg-white/30 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </motion.button>

            <div className="text-center text-sm text-white mt-4">
              Return to{" "}
              <Link to="/auth/login" className="text-yellow-300">
                Login
              </Link>
            </div>
          </div>
        </section>
      </motion.div>
    </form>
  );
}

export default ConfirmPasswordReset;
