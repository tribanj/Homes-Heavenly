import React, { useState } from 'react';
import axios from 'axios';
import { db } from '../../../firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const initialForm = {
  propertyType: '',
  listingType: '',
  availableFor: '',
  propertyName: '',
  locality: '',
  city: '',
  state: '',
  roomType: '',
  furnishing: '',
  attachedBathroom: '',
  totalBeds: '',
  monthlyRent: '',
  securityDeposit: '',
  minimumStay: '',
  foodIncluded: '',
  mealsProvided: [],
  laundryService: '',
  housekeeping: '',
  wifi: '',
  powerBackup: '',
  security: '',
  commonAreas: [],
  parking: '',
  visitorEntry: '',
  smokingAllowed: '',
  drinkingAllowed: '',
  gateTiming: '',
  imageUrls: [],
  videoUrl: '',
  contactPerson: '',
  contactNumber: '',
  email: '',
  description: '',
  landmarks: '',
  notes: '',
  termsAccepted: false,
  status: "pending"
};

const commonAreasOptions = ['TV Room', 'Dining Hall', 'Kitchen', 'Terrace'];
const mealsOptions = ['Breakfast', 'Lunch', 'Dinner', 'All'];

const PGHostelForm = () => {
  const { user } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'termsAccepted') {
      setForm({ ...form, [name]: checked });
    } else if (type === 'checkbox') {
      setForm((prev) => {
        const newSet = new Set(prev[name]);
        newSet.has(value) ? newSet.delete(value) : newSet.add(value);
        return { ...prev, [name]: [...newSet] };
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const uploadFile = async (file, folder) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'homeHeavenlyImage');
    data.append('folder', `PGHostel/${folder}`);
    const res = await axios.post('https://api.cloudinary.com/v1_1/de56w4x21/upload', data);
    return res.data.secure_url;
  };

  const handleUploads = async () => {
    const imageFiles = document.getElementById('images').files;
    const images = imageFiles.length
      ? await Promise.all(Array.from(imageFiles).map((file) => uploadFile(file, 'images')))
      : [];
    const videoFile = document.getElementById('video').files[0];
    const videoUrl = videoFile ? await uploadFile(videoFile, 'video') : '';
    return { images, videoUrl };
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'propertyType',
      'listingType',
      'availableFor',
      'propertyName',
      'locality',
      'city',
      'state',
      'roomType',
      'furnishing',
      'attachedBathroom',
      'totalBeds',
      'monthlyRent',
      'securityDeposit',
      'minimumStay',
      'foodIncluded',
      'laundryService',
      'housekeeping',
      'wifi',
      'powerBackup',
      'security',
      'parking',
      'visitorEntry',
      'smokingAllowed',
      'drinkingAllowed',
      'contactPerson',
      'contactNumber',
      'email',
      'termsAccepted',
    ];

    requiredFields.forEach((field) => {
      if (field === 'termsAccepted' && !form[field]) {
        newErrors[field] = 'You must accept the terms and conditions';
      } else if (!form[field] && form[field] !== 0) {
        newErrors[field] = 'This field is required';
      }
    });

    if (form.foodIncluded === 'Yes' && form.mealsProvided.length === 0) {
      newErrors.mealsProvided = 'At least one meal must be selected';
    }

    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (form.contactNumber && !/^\d{10}$/.test(form.contactNumber)) {
      newErrors.contactNumber = 'Contact number must be 10 digits';
    }

    if (form.totalBeds && form.totalBeds < 0) {
      newErrors.totalBeds = 'Total beds cannot be negative';
    }

    if (form.monthlyRent && form.monthlyRent < 0) {
      newErrors.monthlyRent = 'Monthly rent cannot be negative';
    }

    if (form.securityDeposit && form.securityDeposit < 0) {
      newErrors.securityDeposit = 'Security deposit cannot be negative';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to submit the form');
      return;
    }

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const { images, videoUrl } = await handleUploads();
      const payload = {
        ...form,
        imageUrls: images,
        videoUrl,
        userId: user.uid,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, 'PGAndHostels'), payload);
      alert('Listing submitted successfully!');
      navigate('/success');
      setForm(initialForm);
      document.getElementById('images').value = '';
      document.getElementById('video').value = '';
    } catch (err) {
      console.error('Error submitting listing:', err);
      alert('Error submitting listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-8 text-center">
          PG/Hostel Listing Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Details */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-orange-400">Basic Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Property Type</label>
                <select
                  name="propertyType"
                  value={form.propertyType}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="PG">PG</option>
                  <option value="Hostel">Hostel</option>
                </select>
                {errors.propertyType && (
                  <p className="text-red-400 text-sm">{errors.propertyType}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Listing Type</label>
                <select
                  name="listingType"
                  value={form.listingType}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="Rent">Rent</option>
                  <option value="Lease">Lease</option>
                </select>
                {errors.listingType && (
                  <p className="text-red-400 text-sm">{errors.listingType}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Available For</label>
                <select
                  name="availableFor"
                  value={form.availableFor}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="Boys">Boys</option>
                  <option value="Girls">Girls</option>
                  <option value="Unisex">Unisex</option>
                </select>
                {errors.availableFor && (
                  <p className="text-red-400 text-sm">{errors.availableFor}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Property Name</label>
                <input
                  type="text"
                  name="propertyName"
                  value={form.propertyName}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter property name"
                />
                {errors.propertyName && (
                  <p className="text-red-400 text-sm">{errors.propertyName}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Locality</label>
                <input
                  type="text"
                  name="locality"
                  value={form.locality}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter locality"
                />
                {errors.locality && (
                  <p className="text-red-400 text-sm">{errors.locality}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="text-red-400 text-sm">{errors.city}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter state"
                />
                {errors.state && (
                  <p className="text-red-400 text-sm">{errors.state}</p>
                )}
              </div>
            </div>
          </div>

          {/* Accommodation */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-orange-400">Accommodation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Room Type</label>
                <select
                  name="roomType"
                  value={form.roomType}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Triple">Triple</option>
                  <option value="Dormitory">Dormitory</option>
                </select>
                {errors.roomType && (
                  <p className="text-red-400 text-sm">{errors.roomType}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Furnishing</label>
                <select
                  name="furnishing"
                  value={form.furnishing}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="Furnished">Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
                {errors.furnishing && (
                  <p className="text-red-400 text-sm">{errors.furnishing}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Attached Bathroom</label>
                <select
                  name="attachedBathroom"
                  value={form.attachedBathroom}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.attachedBathroom && (
                  <p className="text-red-400 text-sm">{errors.attachedBathroom}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Total Beds Available</label>
                <input
                  type="number"
                  name="totalBeds"
                  value={form.totalBeds}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter number of beds"
                />
                {errors.totalBeds && (
                  <p className="text-red-400 text-sm">{errors.totalBeds}</p>
                )}
              </div>
            </div>
          </div>

          {/* Rent & Deposit */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-orange-400">Rent & Deposit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Monthly Rent (per bed)</label>
                <input
                  type="number"
                  name="monthlyRent"
                  value={form.monthlyRent}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter rent amount"
                />
                {errors.monthlyRent && (
                  <p className="text-red-400 text-sm">{errors.monthlyRent}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Security Deposit</label>
                <input
                  type="number"
                  name="securityDeposit"
                  value={form.securityDeposit}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter deposit amount"
                />
                {errors.securityDeposit && (
                  <p className="text-red-400 text-sm">{errors.securityDeposit}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Minimum Stay</label>
                <select
                  name="minimumStay"
                  value={form.minimumStay}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="No minimum">No minimum</option>
                  <option value="1 month">1 month</option>
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                </select>
                {errors.minimumStay && (
                  <p className="text-red-400 text-sm">{errors.minimumStay}</p>
                )}
              </div>
            </div>
          </div>

          {/* Facilities */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-orange-400">Facilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Food Included</label>
                <select
                  name="foodIncluded"
                  value={form.foodIncluded}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.foodIncluded && (
                  <p className="text-red-400 text-sm">{errors.foodIncluded}</p>
                )}
              </div>
              {form.foodIncluded === 'Yes' && (
                <div>
                  <label className="block text-gray-300 mb-2">Meals Provided</label>
                  <div className="space-y-2">
                    {mealsOptions.map((meal) => (
                      <label key={meal} className="flex items-center text-gray-300">
                        <input
                          type="checkbox"
                          name="mealsProvided"
                          value={meal}
                          checked={form.mealsProvided.includes(meal)}
                          onChange={handleChange}
                          className="mr-2 text-indigo-500 focus:ring-indigo-500"
                        />
                        {meal}
                      </label>
                    ))}
                  </div>
                  {errors.mealsProvided && (
                    <p className="text-red-400 text-sm">{errors.mealsProvided}</p>
                  )}
                </div>
              )}
              <div>
                <label className="block text-gray-300 mb-2">Laundry Service</label>
                <select
                  name="laundryService"
                  value={form.laundryService}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.laundryService && (
                  <p className="text-red-400 text-sm">{errors.laundryService}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Housekeeping</label>
                <select
                  name="housekeeping"
                  value={form.housekeeping}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="None">None</option>
                </select>
                {errors.housekeeping && (
                  <p className="text-red-400 text-sm">{errors.housekeeping}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">WiFi</label>
                <select
                  name="wifi"
                  value={form.wifi}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.wifi && (
                  <p className="text-red-400 text-sm">{errors.wifi}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Power Backup</label>
                <select
                  name="powerBackup"
                  value={form.powerBackup}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="Full">Full</option>
                  <option value="Partial">Partial</option>
                  <option value="None">None</option>
                </select>
                {errors.powerBackup && (
                  <p className="text-red-400 text-sm">{errors.powerBackup}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Security</label>
                <select
                  name="security"
                  value={form.security}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="CCTV">CCTV</option>
                  <option value="Guard">Guard</option>
                  <option value="Both">Both</option>
                  <option value="None">None</option>
                </select>
                {errors.security && (
                  <p className="text-red-400 text-sm">{errors.security}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Common Areas</label>
                <div className="space-y-2">
                  {commonAreasOptions.map((area) => (
                    <label key={area} className="flex items-center text-gray-300">
                      <input
                        type="checkbox"
                        name="commonAreas"
                        value={area}
                        checked={form.commonAreas.includes(area)}
                        onChange={handleChange}
                        className="mr-2 text-indigo-500 focus:ring-indigo-500"
                      />
                      {area}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Parking</label>
                <select
                  name="parking"
                  value={form.parking}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="2-Wheeler">2-Wheeler</option>
                  <option value="4-Wheeler">4-Wheeler</option>
                  <option value="None">None</option>
                </select>
                {errors.parking && (
                  <p className="text-red-400 text-sm">{errors.parking}</p>
                )}
              </div>
            </div>
          </div>

          {/* Rules */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-orange-400">Rules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Visitor Entry Allowed</label>
                <select
                  name="visitorEntry"
                  value={form.visitorEntry}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.visitorEntry && (
                  <p className="text-red-400 text-sm">{errors.visitorEntry}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Smoking Allowed</label>
                <select
                  name="smokingAllowed"
                  value={form.smokingAllowed}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.smokingAllowed && (
                  <p className="text-red-400 text-sm">{errors.smokingAllowed}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Drinking Allowed</label>
                <select
                  name="drinkingAllowed"
                  value={form.drinkingAllowed}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.drinkingAllowed && (
                  <p className="text-red-400 text-sm">{errors.drinkingAllowed}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Gate Timing</label>
                <input
                  type="text"
                  name="gateTiming"
                  value={form.gateTiming}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., 11 PM"
                />
                {errors.gateTiming && (
                  <p className="text-red-400 text-sm">{errors.gateTiming}</p>
                )}
              </div>
            </div>
          </div>

          {/* Images & Media */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-orange-400">Images & Media</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Upload Images</label>
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                />
                {form.imageUrls.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {form.imageUrls.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Uploaded ${index}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Upload Video (Optional)</label>
                <input
                  type="file"
                  id="video"
                  accept="video/*"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                />
                {form.videoUrl && (
                  <video
                    src={form.videoUrl}
                    controls
                    className="mt-4 w-full h-24 rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-orange-400">Contact Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Contact Person</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={form.contactPerson}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter contact person name"
                />
                {errors.contactPerson && (
                  <p className="text-red-400 text-sm">{errors.contactPerson}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={form.contactNumber}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter 10-digit number"
                />
                {errors.contactNumber && (
                  <p className="text-red-400 text-sm">{errors.contactNumber}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter email"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-orange-400">Additional Info</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                  rows="4"
                  placeholder="Describe the property"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Nearby Landmarks</label>
                <input
                  type="text"
                  name="landmarks"
                  value={form.landmarks}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter nearby landmarks"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Any Other Notes</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                  rows="4"
                  placeholder="Add any special notes"
                />
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={form.termsAccepted}
              onChange={handleChange}
              className="mr-2 text-indigo-500 focus:ring-indigo-500"
            />
            <label className="text-gray-300">
              I agree to the <a href="/terms" className="text-orange-400 hover:underline">terms and conditions</a>
            </label>
            {errors.termsAccepted && (
              <p className="text-red-400 text-sm ml-4">{errors.termsAccepted}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading || !user}
              className={`bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-10 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg ${loading || !user ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Submitting...' : 'Submit Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PGHostelForm;