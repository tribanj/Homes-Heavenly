import React, { useState } from 'react';
import axios from 'axios';
import { db } from '../../../firebase/firebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiHome, FiMapPin, FiDollarSign, FiGrid, FiCheckCircle, FiUser, FiPhone, FiMail, FiFileText, FiImage, FiUpload, FiArrowRight } from 'react-icons/fi';
import { FaRuler as FiRuler } from "react-icons/fa6";

const initialForm = {
  propertyTitle: '',
  propertyType: '',
  spaceType: '',
  totalArea: '',
  carpetArea: '',
  city: '',
  locality: '',
  pinCode: '',
  monthlyRent: '',
  securityDeposit: '',
  maintenanceCharges: '',
  leaseDuration: '',
  availableFrom: '',
  lockInPeriod: '',
  totalFloors: '',
  propertyFloor: '',
  facing: '',
  ageOfProperty: '',
  washrooms: '',
  powerBackup: false,
  airConditioning: false,
  parkingSpaces: '',
  furnishedStatus: '',
  furnitureDetails: '',
  interiorCondition: '',
  videoTourLink: '',
  propertyOwnership: '',
  reraNumber: '',
  fireSafety: '',
  contactName: '',
  contactNumber: '',
  email: '',
  specialNotes: ''
};

const CoworkingLeaseForm = () => {
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState({ images: [], floorPlan: null });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e, name) => {
    const fileList = Array.from(e.target.files);
    setFiles((prev) => ({
      ...prev,
      [name]: name === 'images' ? fileList : fileList[0]
    }));
  };

  const uploadToCloudinary = async (file, folder) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'homeHeavenlyImage');
    data.append('folder', `coworkingLease/${folder}`);
    const res = await axios.post('https://api.cloudinary.com/v1_1/de56w4x21/upload', data);
    return res.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const imageUrls = await Promise.all(files.images.map((f) => uploadToCloudinary(f, 'images')));
      const floorPlanUrl = files.floorPlan ? await uploadToCloudinary(files.floorPlan, 'floorPlan') : '';

      const data = {
        ...form,
        imageUrls,
        floorPlanUrl,
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'coworkingLeaseProperties'), data);
      toast.success('Listing submitted successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setForm(initialForm);
      setFiles({ images: [], floorPlan: null });
    } catch (error) {
      console.error(error);
      toast.error('Submission failed. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-orange-700 to-orange-600">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <FiHome className="mr-2" /> Co-working Space Lease Form
          </h1>
          <p className="text-orange-100 mt-2">List your co-working space with detailed information to attract potential lessees.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Details Section */}
          <div>
            <h2 className="text-xl font-semibold text-orange-400 flex items-center mb-4">
              <FiGrid className="mr-2" /> Basic Property Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Property Title *</label>
                <div className="relative">
                  <FiHome className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="text"
                    name="propertyTitle"
                    value={form.propertyTitle}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    required
                    placeholder="Enter property title"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Property Type *</label>
                <select
                  name="propertyType"
                  value={form.propertyType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  required
                >
                  <option value="">Select Property Type</option>
                  <option value="Office">Office</option>
                  <option value="Co-working">Co-working</option>
                  <option value="Commercial Shop">Commercial Shop</option>
                  <option value="Showroom">Showroom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Space Type *</label>
                <select
                  name="spaceType"
                  value={form.spaceType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  required
                >
                  <option value="">Select Space Type</option>
                  <option value="Private Cabin">Private Cabin</option>
                  <option value="Shared Desk">Shared Desk</option>
                  <option value="Virtual Office">Virtual Office</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Total Area (sq ft) *</label>
                <div className="relative">
                  <FiRuler className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="number"
                    name="totalArea"
                    value={form.totalArea}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    required
                    placeholder="Enter total area"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Carpet Area (sq ft)</label>
                <div className="relative">
                  <FiRuler className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="number"
                    name="carpetArea"
                    value={form.carpetArea}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="Enter carpet area"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Property Specifications Section */}
          <div>
            <h2 className="text-xl font-semibold text-orange-400 flex items-center mb-4">
              <FiMapPin className="mr-2" /> Property Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">City *</label>
                <div className="relative">
                  <FiMapPin className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    required
                    placeholder="Enter city"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Locality *</label>
                <div className="relative">
                  <FiMapPin className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="text"
                    name="locality"
                    value={form.locality}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    required
                    placeholder="Enter locality"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Pin Code *</label>
                <div className="relative">
                  <FiMapPin className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="number"
                    name="pinCode"
                    value={form.pinCode}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    required
                    placeholder="Enter pin code"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Total Floors</label>
                <input
                  type="number"
                  name="totalFloors"
                  value={form.totalFloors}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  placeholder="Enter total floors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Property Floor</label>
                <input
                  type="number"
                  name="propertyFloor"
                  value={form.propertyFloor}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  placeholder="Enter property floor"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Facing</label>
                <select
                  name="facing"
                  value={form.facing}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                >
                  <option value="">Select Direction</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Age of Property</label>
                <select
                  name="ageOfProperty"
                  value={form.ageOfProperty}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                >
                  <option value="">Select Age</option>
                  <option value="New">New</option>
                  <option value="1-5 years">1-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Washrooms</label>
                <input
                  type="number"
                  name="washrooms"
                  value={form.washrooms}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  placeholder="Enter number of washrooms"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Availability Section */}
          <div>
            <h2 className="text-xl font-semibold text-orange-400 flex items-center mb-4">
              <FiDollarSign className="mr-2" /> Pricing & Availability
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Monthly Rent (INR) *</label>
                <div className="relative">
                  <FiDollarSign className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="number"
                    name="monthlyRent"
                    value={form.monthlyRent}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    required
                    placeholder="Enter monthly rent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Security Deposit (INR) *</label>
                <div className="relative">
                  <FiDollarSign className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="number"
                    name="securityDeposit"
                    value={form.securityDeposit}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    required
                    placeholder="Enter security deposit"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Maintenance Charges</label>
                <div className="relative">
                  <FiDollarSign className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="text"
                    name="maintenanceCharges"
                    value={form.maintenanceCharges}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="Enter maintenance charges"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Lease Duration *</label>
                <select
                  name="leaseDuration"
                  value={form.leaseDuration}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  required
                >
                  <option value="">Select Duration</option>
                  <option value="6 months">6 months</option>
                  <option value="1 year">1 year</option>
                  <option value="3 years">3 years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Available From *</label>
                <input
                  type="date"
                  name="availableFrom"
                  value={form.availableFrom}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Lock-in Period *</label>
                <select
                  name="lockInPeriod"
                  value={form.lockInPeriod}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  required
                >
                  <option value="">Select Period</option>
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                  <option value="1 year">1 year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Amenities & Features Section */}
          <div>
            <h2 className="text-xl font-semibold text-orange-400 flex items-center mb-4">
              <FiCheckCircle className="mr-2" /> Amenities & Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="powerBackup"
                  checked={form.powerBackup}
                  onChange={handleChange}
                  className="w-5 h-5 text-orange-600 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                />
                <label className="ml-2 text-gray-300">Power Backup</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="airConditioning"
                  checked={form.airConditioning}
                  onChange={handleChange}
                  className="w-5 h-5 text-orange-600 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                />
                <label className="ml-2 text-gray-300">Air Conditioning</label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Parking Spaces</label>
                <input
                  type="number"
                  name="parkingSpaces"
                  value={form.parkingSpaces}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  placeholder="Enter number of parking spaces"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Furnishing Status</label>
                <select
                  name="furnishedStatus"
                  value={form.furnishedStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                >
                  <option value="">Select Status</option>
                  <option value="Furnished">Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Furniture Details</label>
                <input
                  type="text"
                  name="furnitureDetails"
                  value={form.furnitureDetails}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  placeholder="Describe furniture details"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Interior Condition</label>
                <select
                  name="interiorCondition"
                  value={form.interiorCondition}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                >
                  <option value="">Select Condition</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Needs Renovation">Needs Renovation</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Video Tour Link</label>
                <div className="relative">
                  <FiFileText className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="url"
                    name="videoTourLink"
                    value={form.videoTourLink}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="Enter video tour link"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Upload Property Images</label>
                <div className="relative">
                  <FiImage className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'images')}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Upload Floor Plan</label>
                <div className="relative">
                  <FiUpload className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    onChange={(e) => handleFileChange(e, 'floorPlan')}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Legal & Contact Section */}
          <div>
            <h2 className="text-xl font-semibold text-orange-400 flex items-center mb-4">
              <FiFileText className="mr-2" /> Legal & Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Property Ownership</label>
                <select
                  name="propertyOwnership"
                  value={form.propertyOwnership}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                >
                  <option value="">Select Ownership</option>
                  <option value="Owned">Owned</option>
                  <option value="Leased">Leased</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">RERA Registration Number</label>
                <div className="relative">
                  <FiFileText className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="text"
                    name="reraNumber"
                    value={form.reraNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="Enter RERA number"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Fire Safety Certificate</label>
                <select
                  name="fireSafety"
                  value={form.fireSafety}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                >
                  <option value="">Select Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Contact Name *</label>
                <div className="relative">
                  <FiUser className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="text"
                    name="contactName"
                    value={form.contactName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    required
                    placeholder="Enter contact name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Contact Number *</label>
                <div className="relative">
                  <FiPhone className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="number"
                    name="contactNumber"
                    value={form.contactNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    required
                    placeholder="Enter contact number"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                <div className="relative">
                  <FiMail className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    required
                    placeholder="Enter email"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Special Terms or Conditions</label>
                <textarea
                  name="specialNotes"
                  value={form.specialNotes}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  placeholder="Enter any special terms or conditions"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-right">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-lg font-medium flex items-center ${loading ? 'bg-orange-700 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-500'} text-white transition-colors`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <FiArrowRight className="mr-2" /> Submit Property
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoworkingLeaseForm;