import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaBuilding, FaHome, FaIdCard, FaUpload } from 'react-icons/fa';
import { MdEmail, MdPassword, MdVerifiedUser } from 'react-icons/md';

const roleLimits = {
  user: 2,
  agent: 5,
  builder: 10,
  realestate: 10,
};

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    licenseAuthority: '',
    licenseNumber: '',
    nameOnLicense: '',
    status:'pending',
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
      if (!formData.photo) newErrors.photo = 'License photo is required';
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

      // Show success message
      alert('Registration successful! Welcome to HomeHeavenly.');
      navigate('/');
    } catch (error) {
      let errorMessage = 'Registration failed. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
      }
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRoleIcon = () => {
    switch (formData.role) {
      case 'agent': return <FaUser className="text-blue-500" />;
      case 'builder': return <FaHome className="text-orange-500" />;
      case 'realestate': return <FaBuilding className="text-purple-500" />;
      default: return <FaUser className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-2xl">
        <div className="md:flex">
          {/* Left side - Illustration */}
          <div className="hidden md:block md:w-1/2 bg-gradient-to-b from-blue-500 to-indigo-600 p-8 text-white">
            <div className="flex flex-col h-full justify-center">
              <h2 className="text-3xl font-bold mb-4">Join HomeHeavenly</h2>
              <p className="mb-8">Create your account and start exploring the best properties in your area.</p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-white text-blue-600 p-2 rounded-full mr-3">
                    <MdVerifiedUser size={20} />
                  </div>
                  <span>Verified property listings</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white text-blue-600 p-2 rounded-full mr-3">
                    <FaIdCard size={20} />
                  </div>
                  <span>Secure authentication</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white text-blue-600 p-2 rounded-full mr-3">
                    <FaBuilding size={20} />
                  </div>
                  <span>Professional network</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-1/2 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
              <p className="text-gray-600">Join us today and get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdEmail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    className={`pl-10 w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdPassword className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    className={`pl-10 w-full px-4 py-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdPassword className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    className={`pl-10 w-full px-4 py-2 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {getRoleIcon()}
                  </div>
                  <select
                    name="role"
                    className={`pl-10 w-full px-4 py-2 rounded-lg border ${errors.role ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none`}
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="user">Normal User</option>
                    <option value="agent">Real Estate Agent</option>
                    <option value="builder">Builder/Developer</option>
                    <option value="realestate">Real Estate Company</option>
                  </select>
                </div>
              </div>

              {/* License Fields (Conditional) */}
              {['agent', 'builder', 'realestate'].includes(formData.role) && (
                <div className="space-y-4 border-t pt-4 mt-4">
                  <h3 className="font-medium text-gray-700 flex items-center">
                    <FaIdCard className="mr-2 text-blue-500" />
                    License Information
                  </h3>

                  {/* License Authority */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Authority</label>
                    <input
                      type="text"
                      name="licenseAuthority"
                      className={`w-full px-4 py-2 rounded-lg border ${errors.licenseAuthority ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="e.g. State Real Estate Board"
                      value={formData.licenseAuthority}
                      onChange={handleChange}
                    />
                    {errors.licenseAuthority && <p className="mt-1 text-sm text-red-600">{errors.licenseAuthority}</p>}
                  </div>

                  {/* License Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                    <input
                      type="text"
                      name="licenseNumber"
                      className={`w-full px-4 py-2 rounded-lg border ${errors.licenseNumber ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="e.g. AB123456"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                    />
                    {errors.licenseNumber && <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>}
                  </div>

                  {/* Name on License */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name on License</label>
                    <input
                      type="text"
                      name="nameOnLicense"
                      className={`w-full px-4 py-2 rounded-lg border ${errors.nameOnLicense ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Full name as on license"
                      value={formData.nameOnLicense}
                      onChange={handleChange}
                    />
                    {errors.nameOnLicense && <p className="mt-1 text-sm text-red-600">{errors.nameOnLicense}</p>}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address on License</label>
                    <input
                      type="text"
                      name="address"
                      className={`w-full px-4 py-2 rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="License holder address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                  </div>

                  {/* License Photo Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Photo</label>
                    <div className={`border-2 border-dashed ${errors.photo ? 'border-red-500' : 'border-gray-300'} rounded-lg p-4 text-center`}>
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
                            className="mt-2 text-sm text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <FaUpload className="text-gray-400 text-2xl" />
                          <p className="text-sm text-gray-600">Click to upload license photo</p>
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
                        className="mt-2 inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-100 cursor-pointer"
                      >
                        Choose File
                      </label>
                    </div>
                    {errors.photo && <p className="mt-1 text-sm text-red-600">{errors.photo}</p>}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>

              {/* Login Link */}
              <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Log in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;