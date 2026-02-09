import React, { useState, useRef, useEffect, type FormEvent } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Fingerprint, Loader } from "lucide-react";
import axiosInstance from "../api/axiosConfig";
import { Colors } from "../utils/colors";
import { Button } from "../components/ui/button";

const OTP_LENGTH = 6; // 5 digits

function OTPVerification() {
  const [otp, setOtp] = React.useState(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  // Handle change in each OTP input
  const handleChange = (e: any, idx: number) => {
    const val = e.target.value;
    if (!/^\d?$/.test(val)) return; // only digits or empty allowed

    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);

    if (val && idx < OTP_LENGTH - 1) {
      // Move to next input if current filled
      inputsRef.current[idx + 1]?.focus();
    }
  };

  // Handle backspace for navigation
  const handleKeyDown = (e: any, idx: number) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      const prevInput = inputsRef.current[idx - 1];
      if (prevInput) {
        prevInput.focus();
        const newOtp = [...otp];
        newOtp[idx - 1] = "";
        setOtp(newOtp);
      }
    }
  };
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (otp.some(digit => digit === "")) {
      toast.error("Please enter complete OTP");
      return;
    }

    const otpCode = otp.join("");
    setLoading(true);

    try {
      let response = null

      if (!fromPwd) {
        response = await axiosInstance.post(`/users/verify-otp?token=${otpCode}`);
      }
      else {
        response = await axiosInstance.post(`/users/forgot-password/submit?token=${otpCode}`, { password });
      }

      if (response.status === 200) {
        toast.success(response?.data?.message);
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  // Focus first input on mount
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const location = useLocation();

  const isResetPasswordPwd = location?.state?.isResetPasswordPwd

  const [fromPwd, setFromPwd] = useState(false);

  useEffect(() => {
    setFromPwd(location?.state?.isResetPasswordPwd || '')
  }, [isResetPasswordPwd])

  const handleResendOTP = async () => {
    try {

      const email = location.state?.email;

      const response = await axiosInstance.post(`/users/confirmation`, { email });
      if (response.status === 200) {
        toast.success(response?.data?.message || "OTP resent successfully!");
      }
      return;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form
      className="grid grid-cols-12 w-full md:h-dvh h-screen overflow-hidden"
      onSubmit={handleSubmit}
    >
      {/* Left Side Image with Text */}
      <div className="relative hidden lg:block col-span-7">
        <img
          src="/images/hero_bg.jpg"
          alt="Hero"
          className="w-full h-full object-cover object-center"
        />
        <img src='/images/plane.png' className={`absolute inset-0 z-10 w-full h-full`} />


        <div className="absolute z-50 inset-0 flex flex-col items-center justify-center text-center bg-black/40 px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl font-bold leading-tight lg:text-5xl"
          >
            Verify Your OTP
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/80 text-lg mt-4 max-w-xl"
          >
            Enter the OTP sent to your email to continue.
          </motion.p>
        </div>
      </div>

      {/* Right Side Form */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="col-span-12 lg:col-span-5 flex flex-col h-screen"
        style={{ backgroundColor: Colors.deepForestGreen }}
      >
        <section className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-6">
            <div className="w-8 mx-auto mb-2">
              <Link to="/">
                <img src="/icon.png" alt="Logo" />
              </Link>
            </div>

            <div className="text-center">
              <h2 className="text-lg font-semibold text-white border-b border-white/30 pb-2">
                OTP Verification
              </h2>
              <p className="text-sm text-white/70 mt-2">
                Enter the 5-digit code sent to your email address.
              </p>
            </div>

            <div className="flex justify-center flex-wrap gap-3 sm:gap-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  ref={(el) => {
                    inputsRef.current[idx] = el;
                  }}
                  className="w-10 sm:w-12 h-12 text-center text-xl rounded-md border border-white/30 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  aria-label={`OTP digit ${idx + 1}`}
                  autoComplete="one-time-code"
                />
              ))}
            </div>

            {
              fromPwd && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative"
                >
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full bg-white/10 border border-white/30 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/50"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                    <Fingerprint size={18} />
                  </span>
                </motion.div>
              )
            }


            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md font-semibold text-white transition-all duration-300 ${loading ? "bg-white/30 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {loading ? <Loader className="w-fit mx-auto" size={24} /> : "Verify OTP"}
            </motion.button>

            <div className="text-center text-sm text-white mt-4">
              Didn’t receive the code?{" "}
              <Button type="button" onClick={handleResendOTP} className="bg-inherit hover:bg-inherit hover:text-[#fcb929] text-[#E2a517] cursor-pointer">Resend OTP</Button>
            </div>
          </div>
        </section>
      </motion.div>
    </form>
  );
}

export default OTPVerification;
