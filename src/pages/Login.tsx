import React, { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { MailCheck, Fingerprint, Loader } from "lucide-react";
import { motion } from "framer-motion";
import axiosInstance from "../api/axiosConfig";
import { Colors } from "../utils/colors";
// import SocialAuth from "../components/SocialAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        toast.success("Login successful!");
        localStorage.setItem("token", response?.data?.token)
        localStorage.setItem("user", JSON.stringify(response?.data?.data))
        navigate("/dashboard")
      }
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Invalid credentials!";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="grid grid-cols-12 w-full md:h-dvh h-screen overflow-hidden"
      onSubmit={handleLogin}
    >
      {/* Left Image with Content */}
      <div className="relative hidden lg:block col-span-7">
        <img
          src="/images/hero_bg.jpg"
          alt="Hero"
          className="w-full h-full object-cover brightness-90 object-center"
        />
        <img src='/images/plane.png' className={`absolute inset-0 z-10 w-full h-full`} />


        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center bg-black/40 px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl font-bold leading-tight lg:text-5xl"
          >
            Welcome to Ebonyi State Scholarship Portal <br className="hidden md:block" /> Access Opportunities with Ease.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/80 text-lg mt-4 max-w-xl"
          >
            Sign in to apply for scholarships, track your application status, and manage your educational support.
            Empowering Ebonyi students for a brighter future.
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
                Welcome back
              </h2>
              <p className="text-sm text-white/70 mt-2">
                Sign in to access your dashboard
              </p>
            </div>

            <div className="space-y-4">
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
                  placeholder="Your Password"
                  className="w-full bg-white/10 border border-white/30 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/50"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                  <Fingerprint size={18} />
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
                transition={{ delay: 0.6 }}
              >
                {loading ? <Loader className="w-fit mx-auto" size={24} /> : "Login"}
              </motion.button>
            </div>

            {/* Divider */}
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
                Don't have an account?{" "}
                <Link to="/signup" className="text-yellow-300">
                  Register
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

export default Login;
