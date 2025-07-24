import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiUser, FiMail, FiLock, FiMapPin, FiFileText, FiUpload, FiKey, FiHome } from 'react-icons/fi';
import {FaBuilding} from "react-icons/fa";

import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const roleLimits = {
  user: 2,
  agent: 5,
  builder: 10,
  realestate: 10,
};

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    licenseAuthority: '',
    licenseNumber: '',
    nameOnLicense: '',
    status: 'pending',
    address: '',
    photo: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'photo') {
      const file = files[0];
      setFormData({ ...formData, photo: file });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (['agent', 'builder', 'realestate'].includes(formData.role)) {
      if (!formData.licenseAuthority) newErrors.licenseAuthority = 'Required';
      if (!formData.licenseNumber) newErrors.licenseNumber = 'Required';
      if (!formData.nameOnLicense) newErrors.nameOnLicense = 'Required';
      if (!formData.address) newErrors.address = 'Required';
      if (!formData.photo) newErrors.photo = 'Required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'homeHeavenlyImage');
    formData.append('folder', 'ImageForLic');
    formData.append('cloud_name', 'de56w4x21');

    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/de56w4x21/image/upload',
      formData
    );
    return res.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCred.user;

      let licenseURL = '';
      if (['agent', 'builder', 'realestate'].includes(formData.role) && formData.photo) {
        licenseURL = await uploadToCloudinary(formData.photo);
      }

      const userData = {
        uid: user.uid,
        email: formData.email,
        role: formData.role,
        adLimit: roleLimits[formData.role],
        createdAt: new Date(),
        displayName: formData.fullName,
      };

      if (['agent', 'builder', 'realestate'].includes(formData.role)) {
        userData.licenseInfo = {
          authority: formData.licenseAuthority,
          number: formData.licenseNumber,
          nameOnLicense: formData.nameOnLicense,
          address: formData.address,
          licensePhotoURL: licenseURL,
        };
        userData.verified = false;
      }

      await setDoc(doc(db, 'users', user.uid), userData);

      toast.success('Registration successful! Welcome to HomeHeavenly.');
      navigate('/');
    } catch (error) {
      let errorMessage = 'Registration failed. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
      }
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRoleIcon = () => {
    switch (formData.role) {
      case 'agent':
        return <FiUser className="text-blue-400" />;
      case 'builder':
        return <FiHome className="text-orange-400" />;
      case 'realestate':
        return <FaBuilding className="text-purple-400" />;
      default:
        return <FiUser className="text-gray-400" />;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-800 rounded-xl shadow-2xl shadow-orange-500/20 border border-gray-700 w-full max-w-3xl overflow-hidden"
      >
        <div className="md:flex">
          {/* Left side - Illustration */}
          <div className="hidden md:block md:w-1/2 bg-gradient-to-b from-orange-600 to-orange-800 p-8 text-white">
            <div className="flex flex-col h-full justify-center">
              <h2 className="text-3xl font-extrabold mb-4">Join HomeHeavenly</h2>
              <p className="mb-8 text-gray-200">
                Create your account to explore premium properties and connect with our professional network.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-white text-orange-600 p-2 rounded-full mr-3">
                    <FiKey size={20} />
                  </div>
                  <span>Secure Authentication</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white text-orange-600 p-2 rounded-full mr-3">
                    <FiFileText size={20} />
                  </div>
                  <span>Verified Listings</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white text-orange-600 p-2 rounded-full mr-3">
                    <FiMapPin size={20} />
                  </div>
                  <span>Professional Network</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-1/2 p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-white">Create Account</h2>
              <p className="text-gray-400">Join us today and get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-1 flex items-center">
                    <FiUser className="mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    className={`w-full p-3 rounded-lg bg-gray-700 text-white border ${errors.fullName ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:border-orange-500 transition-colors duration-200`}
                    placeholder="Bhuwa Mishra"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-1 flex items-center">
                    <FiMail className="mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className={`w-full p-3 rounded-lg bg-gray-700 text-white border ${errors.email ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:border-orange-500 transition-colors duration-200`}
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                </div>
              </div>

              {/* Password and Confirm Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-1 flex items-center">
                    <FiLock className="mr-2" />
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className={`w-full p-3 rounded-lg bg-gray-700 text-white border ${errors.password ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:border-orange-500 transition-colors duration-200`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-1 flex items-center">
                    <FiLock className="mr-2" />
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className={`w-full p-3 rounded-lg bg-gray-700 text-white border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:border-orange-500 transition-colors duration-200`}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-1 flex items-center">
                  {getRoleIcon()}
                  Account Type
                </label>
                <select
                  name="role"
                  className={`w-full p-3 rounded-lg bg-gray-700 text-white border ${errors.role ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:border-orange-500 transition-colors duration-200 appearance-none`}
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="user">Normal User</option>
                  <option value="agent">Real Estate Agent</option>
                  <option value="builder">Builder/Developer</option>
                  <option value="realestate">Real Estate Company</option>
                </select>
              </div>

              {/* License Fields (Conditional) */}
              {['agent', 'builder', 'realestate'].includes(formData.role) && (
                <div className="space-y-4 border-t border-gray-700 pt-4 mt-4">
                  <h3 className="text-sm font-semibold text-gray-400 flex items-center">
                    <FiFileText className="mr-2 text-orange-400" />
                    License Information
                  </h3>

                  {/* License Authority and License Number */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-1">License Authority</label>
                      <input
                        type="text"
                        name="licenseAuthority"
                        className={`w-full p-3 rounded-lg bg-gray-700 text-white border ${errors.licenseAuthority ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:border-orange-500 transition-colors duration-200`}
                        placeholder="e.g. State Real Estate Board"
                        value={formData.licenseAuthority}
                        onChange={handleChange}
                      />
                      {errors.licenseAuthority && <p className="mt-1 text-sm text-red-400">{errors.licenseAuthority}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-1">License Number</label>
                      <input
                        type="text"
                        name="licenseNumber"
                        className={`w-full p-3 rounded-lg bg-gray-700 text-white border ${errors.licenseNumber ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:border-orange-500 transition-colors duration-200`}
                        placeholder="e.g. AB123456"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                      />
                      {errors.licenseNumber && <p className="mt-1 text-sm text-red-400">{errors.licenseNumber}</p>}
                    </div>
                  </div>

                  {/* Name on License and Address */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-1">Name on License</label>
                      <input
                        type="text"
                        name="nameOnLicense"
                        className={`w-full p-3 rounded-lg bg-gray-700 text-white border ${errors.nameOnLicense ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:border-orange-500 transition-colors duration-200`}
                        placeholder="Full name as on license"
                        value={formData.nameOnLicense}
                        onChange={handleChange}
                      />
                      {errors.nameOnLicense && <p className="mt-1 text-sm text-red-400">{errors.nameOnLicense}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-1">Address on License</label>
                      <input
                        type="text"
                        name="address"
                        className={`w-full p-3 rounded-lg bg-gray-700 text-white border ${errors.address ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:border-orange-500 transition-colors duration-200`}
                        placeholder="License holder address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                      {errors.address && <p className="mt-1 text-sm text-red-400">{errors.address}</p>}
                    </div>
                  </div>

                  {/* License Photo Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-1">License Photo</label>
                    <div className={`border-2 border-dashed ${errors.photo ? 'border-red-500' : 'border-gray-600'} rounded-lg p-4 text-center`}>
                      {previewImage ? (
                        <div className="mb-2">
                          <img
                            src={previewImage}
                            alt="License preview"
                            className="h-32 mx-auto object-contain rounded"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setPreviewImage(null);
                              setFormData({ ...formData, photo: null });
                            }}
                            className="mt-2 text-sm text-red-400 hover:text-red-300"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <FiUpload className="text-gray-400 text-2xl" />
                          <p className="text-sm text-gray-400">Click to upload license photo</p>
                        </div>
                      )}
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                        id="license-upload"
                      />
                      <label
                        htmlFor="license-upload"
                        className="mt-2 inline-block px-4 py-2 bg-orange-500/20 text-orange-400 rounded-md text-sm font-medium hover:bg-orange-500/30 cursor-pointer transition-colors duration-200"
                      >
                        Choose File
                      </label>
                    </div>
                    {errors.photo && <p className="mt-1 text-sm text-red-400">{errors.photo}</p>}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold flex items-center justify-center transition-colors duration-200 shadow-md hover:shadow-orange-500/50 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </motion.button>

              {/* Login Link */}
              <div className="text-center text-sm text-gray-400 mt-4">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-orange-400 hover:text-orange-300 font-semibold transition-colors duration-200"
                >
                  Log in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;