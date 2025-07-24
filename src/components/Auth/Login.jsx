import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import { FiMail, FiLock, FiFacebook}from "react-icons/fi";
import {  FcGoogle } from "react-icons/fc";

import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { googleSignIn, facebookSignIn } = useAuth();

  // Firestore में यूजर डेटा सेव करने का फंक्शन
  const saveUserToFirestore = async (user) => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
        createdAt: new Date(),
        role: "user",
      });
    }
  };

  // Email/Password login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Facebook login handler
  const handleFacebookLogin = async () => {
    try {
      const result = await facebookSignIn();
      if (result && !result.success) {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Facebook login failed: " + error.message);
    }
  };

  // Google login handler
  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn();
      if (result && !result.success) {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Google login failed: " + error.message);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-800 rounded-xl shadow-2xl shadow-orange-500/20 border border-gray-700 p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-white text-center mb-6">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Sign in to your account
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="mb-5">
            <label className="flex items-center text-sm font-semibold text-gray-400 mb-2">
              <FiMail className="mr-2" />
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-orange-500 transition-colors duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="flex items-center text-sm font-semibold text-gray-400 mb-2">
              <FiLock className="mr-2" />
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-orange-500 transition-colors duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          {/* Email/Password Login Button */}
          <motion.button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg font-semibold flex items-center justify-center transition-colors duration-200 shadow-md hover:shadow-orange-500/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign In
          </motion.button>
        </form>

        {/* Signup Link */}
        <div className="text-center mt-4 text-sm text-gray-400">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-orange-400 hover:text-orange-300 font-semibold underline transition-colors duration-200"
          >
            Sign up here
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-600"></div>
          <span className="mx-4 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-600"></div>
        </div>

        {/* Social Login Buttons */}
        <motion.button
          onClick={handleFacebookLogin}
          className="w-full bg-blue-900 hover:bg-blue-800 text-white p-3 rounded-lg font-semibold flex items-center justify-center mb-3 transition-colors duration-200 shadow-md hover:shadow-blue-800/50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiFacebook className="mr-2" />
          Sign in with Facebook
        </motion.button>

        <motion.button
          onClick={handleGoogleLogin}
          className="w-full bg-red-900 hover:bg-red-800 text-white p-3 rounded-lg font-semibold flex items-center justify-center transition-colors duration-200 shadow-md hover:shadow-red-800/50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FcGoogle className="mr-2" />
          Sign in with Google
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Login;