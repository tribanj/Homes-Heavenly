import React, { useState, useEffect } from "react";
import "./AuthForm.css";
import { useAuth } from './context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthForm = ({ isSignUp }) => {
  const { login } = useAuth();
  const [passwordError, setPasswordError] = useState('');

  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Normal User',
  });

  const [showLicensePopup, setShowLicensePopup] = useState(false);
  const [licenseInfo, setLicenseInfo] = useState({
    authority: '',
    number: '',
    nameOnLicense: '',
    address: '',
    photo: null,
  });

  const [isSignUpMode, setIsSignUpMode] = useState(isSignUp);

  useEffect(() => {
    setIsSignUpMode(isSignUp);
  }, [isSignUp]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUpMode) {
      if (formData.password !== formData.confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }

      setPasswordError("");

      if (formData.role !== "Normal User") {
        setShowLicensePopup(true);
      } else {
        console.log("Normal User Signup:", formData);

        const result = login(formData.email, formData.password);
        if (result.success) {
          toast.success(`Welcome ${formData.Name}, your account has been created!`);
        } else {
          toast.error(result.message);
        }
      }
    } else {
      const result = login(formData.email, formData.password);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

  const handleLicenseSubmit = (e) => {
    e.preventDefault();

    console.log("Signup Data:", formData);
    console.log("License Info:", licenseInfo);
    setShowLicensePopup(false);

    const result = login(formData.email, formData.password);
    if (result.success) {
      toast.success(`Account created as ${formData.role}. Verification in process!`);
    } else {
      toast.error(result.message);
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
            <p style={{ color: 'red', fontSize: '0.85rem', margin: '4px 0 0' }}>
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
