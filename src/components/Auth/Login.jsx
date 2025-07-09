import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // AuthContext का उपयोग करें
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { googleSignIn, facebookSignIn } = useAuth(); // AuthContext से फंक्शन्स

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
        role: "user", // डिफ़ॉल्ट रोल
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
      alert(error.message);
    }
  };

  // Facebook login handler (updated)
  const handleFacebookLogin = async () => {
    try {
      const result = await facebookSignIn();
      if (result && !result.success) {
        alert(result.message);
      }
    } catch (error) {
      alert("Facebook login failed: " + error.message);
    }
  };

  // Google login handler (updated)
  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn();
      if (result && !result.success) {
        alert(result.message);
      }
    } catch (error) {
      alert("Google login failed: " + error.message);
    }
  };

  return (
    <div style={{ padding: "40px", background: "#f8f9fa", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "500px" }}>
        <h2 className="mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Email/Password Login Button */}
          <button type="submit" className="btn btn-success w-100 mb-3">
            Login
          </button>

          {/* Facebook Login Button */}
          <button
            type="button"
            className="btn btn-primary w-100 mb-2"
            onClick={handleFacebookLogin}
          >
            Login with Facebook
          </button>

          {/* Google Login Button */}
          <button
            type="button"
            className="btn btn-danger w-100"
            onClick={handleGoogleLogin}
          >
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
