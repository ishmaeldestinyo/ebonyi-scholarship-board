import React, { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader } from "lucide-react";
import { motion } from "framer-motion";
import axiosInstance from "../api/axiosConfig";
import { Colors } from "../utils/colors";
// import SocialAuth from "../components/SocialAuth";

function RegisterUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = useState("");
  const [foundError, setFoundError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);

  const navigate = useNavigate();

  const handleUserRegistration = async (e: FormEvent) => {
    e.preventDefault();
    setFoundError(false);

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      toast.error("Please fill in all required fields.");
      setFoundError(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      setFoundError(true);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      setFoundError(true);
      return;
    }



    setLoading(true);

    try {
      const response = await axiosInstance.post("/users", {
        email,
        password,
        firstName,
        lastName,
      });

      if (response.status === 201) {
        toast.success(response.data?.message);

        // Show success animation before navigating
        setShowSuccessAnim(true);
        setLoading(false);

        // Wait for 200 milliseconds then navigate
        setTimeout(() => {
          setShowSuccessAnim(false);
          navigate("/verify-otp", { state: { email } });
        }, 200);
      }

    } catch (error: any) {
      const msg = error?.response?.data?.message;
      toast.error(msg);
      console.error("Registration error:", error);
      setLoading(false);
    }
  };

  return (
    <form
      className="grid grid-cols-12 w-full md:h-dvh overflow-hidden relative"
      onSubmit={handleUserRegistration}
      style={{ backgroundColor: Colors.deepForestGreen }}
    >
      {/* Left Side Image */}
      <div className="relative hidden lg:block col-span-7 pb-16">
        <img
          src="/images/hero_bg.jpg"
          alt="Hero"
          className="w-[250px] sm:w-[350px] bg-top-left md:w-full h-screen object-cover object-center"
        />
        <img src='/images/plane.png' className={`absolute inset-0 z-10 w-full h-full`} />
        <div className="absolute inset-0 flex z-50 flex-col items-center justify-center text-center bg-black/40 px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl font-bold leading-tight lg:text-5xl"
          >
            Register to Begin Your Journey <br className="hidden md:block" /> with Ebonyi State Scholarship.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/80 text-lg mt-4 max-w-xl"
          >
            Create your account to apply for scholarships, track your application status, and access exclusive academic support provided by the <strong className="text-white">Ebonyi State Government</strong>. Empower your future through education.
          </motion.p>


        </div>
      </div>

      {/* Right Side Form */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="col-span-12 lg:col-span-5 flex flex-col h-screen relative"
        style={{ backgroundColor: Colors.deepForestGreen }}
      >
        <section className="flex-1 overflow-y-auto p-8 pt-12 pb-20">
          <div className="w-full max-w-md space-y-6">
            <div className="w-8 mx-auto mb-2">
              <Link to="/">
                <img src="/images/logo.png" alt="Logo" className="w-24 rounded-full mx-auto"/>
              </Link>
            </div>

            <div className="text-center">
              <h2 className="text-lg font-semibold text-white border-b border-white/30 pb-2">
                Create account
              </h2>
              <p className="text-sm text-white/70 mt-2">
                Seamlessly authenticate to manage your account
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Your First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full bg-white/10 border border-white/30 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/50"
                />
                <input
                  type="text"
                  placeholder="Your Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full bg-white/10 border border-white/30 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/50"
                />
              </div>

              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/10 border border-white/30 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/50"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white/10 border border-white/30 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-white/70 hover:text-yellow-400 transition"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <motion.button
                type="submit"
                disabled={loading || foundError}
                className={`w-full py-2 rounded-md font-semibold text-white transition-all duration-300 ${loading || foundError
                  ? "bg-white/30 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {loading ? <Loader className="w-fit mx-auto" size={24} /> : "Submit"}
              </motion.button>
            </div>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/30" />
              <span className="text-white text-sm whitespace-nowrap">
                Or Continue with
              </span>
              <div className="flex-1 h-px bg-white/30" />
            </div>

            {/* <SocialAuth /> */}

            <div className="text-sm text-white flex justify-evenly items-center gap-y-2 mt-4">
              <div>
                Already have an account?{" "}
                <Link to="/login" className="text-yellow-300">
                  Login
                </Link>
              </div>
              <div>
                Forgot password?{" "}
                <Link to="/resetpassword" className="text-yellow-300">
                  Reset
                </Link>
              </div>
            </div>
          </div>
        </section>

      </motion.div>
    </form>
  );
}

export default RegisterUser;
