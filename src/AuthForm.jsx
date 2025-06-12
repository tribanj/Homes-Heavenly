import React, { useState, useEffect } from "react";
import "./AuthForm.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "./firebase/firebaseConfig";
import { useAuth } from "./context/AuthContext";

const AuthForm = ({ isSignUp }) => {
  const [passwordError, setPasswordError] = useState("");

  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Normal User",
  });

  const [showLicensePopup, setShowLicensePopup] = useState(false);
  const [licenseInfo, setLicenseInfo] = useState({
    authority: "",
    number: "",
    nameOnLicense: "",
    address: "",
    photo: null,
  });

  const [isSignUpMode, setIsSignUpMode] = useState(isSignUp);
  const { googleSignIn, facebookSignIn } = useAuth();

  useEffect(() => {
    setIsSignUpMode(isSignUp);
  }, [isSignUp]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }
  };

  const handleLicenseChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setLicenseInfo((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setLicenseInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUpMode) {
      if (formData.password !== formData.confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const user = userCredential.user;

        if (formData.role === "Normal User") {
          await setDoc(doc(db, "users", user.uid), {
            name: formData.Name,
            email: formData.email,
            role: formData.role,
            createdAt: new Date(),
          });

          toast.success(`Welcome ${formData.Name}, your account has been created!`);
        } else {
          setShowLicensePopup(true); // Open license form
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      // Sign In logic
      try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        toast.success("Signed in successfully!");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleLicenseSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      let photoURL = "";

      if (licenseInfo.photo) {
        const storageRef = ref(storage, `licensePhotos/${user.uid}`);
        await uploadBytes(storageRef, licenseInfo.photo);
        photoURL = await getDownloadURL(storageRef);
      }

      await setDoc(doc(db, "users", user.uid), {
        name: formData.Name,
        email: formData.email,
        role: formData.role,
        licenseInfo: {
          authority: licenseInfo.authority,
          number: licenseInfo.number,
          nameOnLicense: licenseInfo.nameOnLicense,
          address: licenseInfo.address,
          photoURL,
        },
        verified: false,
        createdAt: new Date(),
      });

      toast.success(`Account created as ${formData.role}. Verification in process.`);
      setShowLicensePopup(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="auth-form-popup">
      {isSignUpMode ? (
        <form onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <input
            type="text"
            name="Name"
            placeholder="Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {passwordError && (
            <p style={{ color: "red", fontSize: "0.85rem", margin: "4px 0 0" }}>
              {passwordError}
            </p>
          )}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="Normal User">Normal User</option>
            <option value="Builder">Builder</option>
            <option value="Real Estate Company">Real Estate Company</option>
            <option value="Agent">Agent</option>
          </select>
          <button type="submit">Sign Up</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign In</button>
        </form>
      )}

      <div className="social-login">
        <button onClick={googleSignIn} className="google-btn">Continue with Google</button>
        <button onClick={facebookSignIn} className="facebook-btn">Continue with Facebook</button>
      </div>

      {showLicensePopup && (
        <div className="auth-modal-overlay">
          <form className="auth-modal" onSubmit={handleLicenseSubmit}>
            <button
              className="close-btn"
              onClick={() => setShowLicensePopup(false)}
              type="button"
              aria-label="Close license form"
            >
              ×
            </button>
            <h2>License Details Required</h2>
            <input
              type="text"
              name="authority"
              placeholder="License Authority"
              value={licenseInfo.authority}
              onChange={handleLicenseChange}
              required
            />
            <input
              type="text"
              name="number"
              placeholder="License Number"
              value={licenseInfo.number}
              onChange={handleLicenseChange}
              required
            />
            <input
              type="text"
              name="nameOnLicense"
              placeholder="Name on License"
              value={licenseInfo.nameOnLicense}
              onChange={handleLicenseChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address on License"
              value={licenseInfo.address}
              onChange={handleLicenseChange}
              required
            />
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleLicenseChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
