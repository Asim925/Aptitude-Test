"use client";
import React, { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fullName, setFullName] = useState(""); // for Sign Up
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(""); // only for sign up

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleForm = () => {
    setIsSignIn(!isSignIn); // switch form
    setEmail(""); // reset email
    setPassword(""); // reset password
    setConfirmPassword(""); // reset confirm password
    setFullName(""); // reset full name
    setError(null); // clear any error message
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Determine the redirect URL based on the environment
    const redirectUrl =
      process.env.NODE_ENV === "production"
        ? "https://aptitude-test.vercel.app"
        : "http://localhost:3000";

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // This is the critical part!
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName, // Good practice: save the name to user_metadata
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      alert("Account created! ✅ Check your email to verify your account.");
    }

    setLoading(false);
  };
  const handleSignIn = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br px-4">
      <div className="relative w-full max-w-5xl h-[520px] overflow-hidden rounded-2xl bg-orange-200/10 backdrop-blur-sm shadow-[0_0_20px_5px_rgba(217,119,6,0.45)]">
        {/* SIGN IN */}
        <div
          className={`absolute top-0 left-0 h-full sm:w-1/2 w-full transition-transform duration-700 ease-in-out
          ${isSignIn ? "translate-x-0" : "-translate-x-[200%]"}`}
        >
          <div className="h-full flex flex-col justify-center items-center text-black p-8 space-y-6">
            <h1 className="text-4xl font-semibold text-white">Sign In</h1>

            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full max-w-sm px-4 py-2 rounded-3xl bg-white border-2 border-orange-300 outline-0 focus:border-orange-400 focus:border-3 transition-all duration-200"
            />

            <div className="relative w-full max-w-sm">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-3xl bg-white border-2 border-orange-300 outline-0 focus:border-orange-400 focus:border-3 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-600 text-xl "
              >
                | {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {error && <p className="text-red-500 max-w-sm">{error}</p>}

            <button
              onClick={handleSignIn}
              disabled={loading}
              className={`px-8 py-2 ${error ? "-mt-1" : "mt-5"} w-full max-w-sm rounded-full border-2 bg-orange-400 border-orange-500  font-semibold transition-colors duration-200
                   hover:bg-orange-500 text-white active:bg-orange-600 hover:cursor-pointer`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <p className="text-white">
              Don't have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-orange-500 font-semibold hover:cursor-pointer"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>

        {/* SIGN UP */}
        <div
          className={`absolute top-0 left-0 h-full sm:w-1/2 w-full transition-transform duration-700 ease-in-out
          ${isSignIn ? "translate-x-[300%]" : "sm:translate-x-full translate-x-0"}`}
        >
          <div className="h-full flex flex-col justify-center items-center p-8 space-y-6 text-black">
            <h1 className="text-3xl font-semibold text-white">Sign Up</h1>

            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => setFullName(e.target.value)}
              className="w-full max-w-sm px-4 py-2 rounded-3xl bg-white border-2 border-orange-300 outline-0 focus:border-orange-400 focus:border-3 transition-all duration-200"
            />

            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full max-w-sm px-4 py-2 rounded-3xl bg-white border-2 border-orange-300 outline-0 focus:border-orange-400 focus:border-3 transition-all duration-200"
            />

            <div className="relative w-full max-w-sm">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-3xl bg-white border-2 border-orange-300 outline-0 focus:border-orange-400 focus:border-3 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-600 text-xl"
              >
                | {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <div className="relative w-full max-w-sm">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-3xl bg-white border-2 border-orange-300 outline-0 focus:border-orange-400 focus:border-3 transition-all duration-200"
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              onClick={handleSignUp}
              disabled={loading}
              className={`px-8 py-2 ${error ? "-mt-1" : "mt-5"} w-full max-w-sm rounded-full border-2 bg-orange-400 border-orange-500  font-semibold transition-colors duration-200
                   hover:bg-orange-500 text-white active:bg-orange-600 hover:cursor-pointer`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-white">
              already have an account?{" "}
              <button
                onClick={() => setIsSignIn(true)}
                className="text-orange-500 font-semibold hover:cursor-pointer"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>

        {/* OVERLAY */}
        <div
          className={`max-sm:hidden absolute top-0 left-1/2 h-full w-1/2 bg-[url('/kid.webp')] bg-cover bg-center text-white
          transition-transform duration-700 ease-in-out
          ${isSignIn ? "sm:translate-x-0" : "sm:-translate-x-full"}`}
        >
          <div className="h-full flex flex-col items-center justify-center p-10 text-center space-y-4  ">
            {isSignIn ? (
              <div className="px-10 py-5 rounded-xl bg-white/50 backdrop-blur-sm border text-gray-900 border-orange-500">
                <h2 className="text-2xl font-bold mb-2">Welcome Back 🔥</h2>
                <p>
                  To keep connected with us please login with your personal
                  info.
                </p>
                <button
                  onClick={toggleForm}
                  className="hover:cursor-pointer px-8 py-2 mt-3 rounded-full border-2 border-orange-500 bg-white text-orange-500 font-semibold transition-colors duration-200
                   hover:bg-orange-500 hover:text-white active:bg-orange-600"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="px-10 py-5 rounded-xl bg-white/50 text-gray-900 backdrop-blur-sm border border-orange-500">
                <h2 className="text-2xl font-bold mb-2">Hello, Friend 👋</h2>
                <p>
                  Enter your personal details and start your journey with us
                  today.
                </p>
                <button
                  onClick={() => setIsSignIn(true)}
                  className="hover:cursor-pointer px-8 py-2 mt-3 rounded-full border-2 bg-white border-orange-500 text-orange-500 font-semibold transition-colors duration-200
                   hover:bg-orange-500 hover:text-white active:bg-orange-600"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
