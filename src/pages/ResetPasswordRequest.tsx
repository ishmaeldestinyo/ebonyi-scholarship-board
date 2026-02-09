import React, { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader, MailCheck } from "lucide-react";
import axiosInstance from "../api/axiosConfig";
import { Colors } from "../utils/colors";

function ResetPasswordRequest() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const handleRequestReset = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/users/confirmation", {
        email,
      });

      if (response.status === 200) {
        toast.success(response?.data?.message);
        setEmail("");
        setTimeout(() => {
          navigate("/verify-otp", { state: { email, isResetPasswordPwd: true } });

        }, 300);
      }
      return;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="grid grid-cols-12 w-full md:h-dvh h-screen overflow-hidden"
      onSubmit={handleRequestReset}
    >
      {/* Left Side Image with Text */}
      <div className="relative hidden lg:block col-span-7">
        <img
          src="/images/bg.jpg"
          alt="Hero"
          className="w-full h-full object-cover object-center"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/40 px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl font-bold leading-tight lg:text-5xl"
          >
            Forgot Your Password?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/80 text-lg mt-4 max-w-xl"
          >
            No worries! Enter your email and we'll send you a link to reset your password securely.
          </motion.p>
        </div>
      </div>

      {/* Right Side Form */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="col-span-12 lg:col-span-5"
        style={{ backgroundColor: Colors.deepForestGreen }}
      >
        <section className="flex items-center justify-center w-full h-full p-8">
          <div className="w-full max-w-md space-y-6">
            <div className="w-8 mx-auto mb-2">
              <Link to="/">
                <img src="/images/logo.png" alt="Logo" className="w-24 rounded-full mx-auto" />
              </Link>
            </div>

            <div className="text-center">
              <h2 className="text-lg font-semibold text-white border-b border-white/30 pb-2">
                Reset your password
              </h2>
              <p className="text-sm text-white/70 mt-2">
                Enter your email to receive a password reset link.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full bg-white/10 border border-white/30 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/50"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                <MailCheck size={18} />
              </span>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md font-semibold text-white transition-all duration-300 ${loading
                ? "bg-white/30 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {loading ? <Loader className="w-fit mx-auto" size={24} /> : "Send Reset Link"}
            </motion.button>

            <div className="text-center text-sm text-white mt-4">
              Remember your password?{" "}
              <Link to="/login" className="text-yellow-300">
                Go to Login
              </Link>
            </div>
          </div>
        </section>
      </motion.div>
    </form>
  );
}

export default ResetPasswordRequest;
