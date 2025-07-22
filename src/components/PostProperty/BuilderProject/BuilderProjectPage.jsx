import React, { useState } from 'react';
import axios from 'axios';
import { db } from '../../../firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const initialForm = {
  projectName: '',
  builderName: '',
  projectType: '',
  status: '',
  city: '',
  locality: '',
  address: '',
  totalTowers: '',
  totalUnits: '',
  configuration: [],
  reraRegistrationNumber: '',
  priceRange: '',
  unitSizes: [],
  completionDate: '',
  reraApproved: '',
  landTitle: '',
  approvals: [],
  clubhouse: '',
  swimmingPool: '',
  gymnasium: '',
  projectImages: [],
  floorPlans: [],
  legalDocs: [],
  contactPerson: '',
  phoneNumber: '',
  email: '',
  website: '',
  termsAccepted: false,
};

const configurationOptions = ['1BHK', '2BHK', '3BHK', '4BHK', 'Penthouse'];
const unitSizeOptions = ['500-800', '800-1200', '1200-1600', '1600-2000', '2000+'];
const approvalOptions = ['Fire', 'Environmental', 'Municipal', 'Other'];
const cityOptions = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata'];

const BuilderProjectsForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedProjectImages, setSelectedProjectImages] = useState([]);
  const [selectedFloorPlans, setSelectedFloorPlans] = useState([]);
  const [selectedLegalDocs, setSelectedLegalDocs] = useState([]);

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

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    if (type === 'projectImages') {
      setSelectedProjectImages(files);
    } else if (type === 'floorPlans') {
      setSelectedFloorPlans(files);
    } else if (type === 'legalDocs') {
      setSelectedLegalDocs(files);
    }
  };

  const uploadFile = async (file, folder) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'homeHeavenlyImage');
    data.append('folder', `BuilderProjects/${folder}`);
    const res = await axios.post('https://api.cloudinary.com/v1_1/de56w4x21/upload', data);
    return res.data.secure_url;
  };

  const handleUploads = async () => {
    const projectImages = selectedProjectImages.length
      ? await Promise.all(selectedProjectImages.map((file) => uploadFile(file, 'images')))
      : [];
    const floorPlans = selectedFloorPlans.length
      ? await Promise.all(selectedFloorPlans.map((file) => uploadFile(file, 'floorPlans')))
      : [];
    const legalDocs = selectedLegalDocs.length
      ? await Promise.all(selectedLegalDocs.map((file) => uploadFile(file, 'legalDocs')))
      : [];

    return { projectImages, floorPlans, legalDocs };
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'projectName',
      'builderName',
      'projectType',
      'status',
      'city',
      'locality',
      'address',
      'totalTowers',
      'totalUnits',
      'configuration',
      'priceRange',
      'unitSizes',
      'completionDate',
      'reraApproved',
      'landTitle',
      'contactPerson',
      'phoneNumber',
      'email',
      'termsAccepted',
    ];

    requiredFields.forEach((field) => {
      if (field === 'termsAccepted' && !form[field]) {
        newErrors[field] = 'You must accept the terms and conditions';
      } else if ((Array.isArray(form[field]) && form[field].length === 0) || (!Array.isArray(form[field]) && !form[field])) {
        newErrors[field] = 'This field is required';
      }
    });

    if (selectedProjectImages.length < 3) {
      newErrors.projectImages = 'At least 3 images are required';
    }

    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (form.phoneNumber && !/^\+?\d{10,12}$/.test(form.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10-12 digits, optionally with country code';
    }

    if (form.totalTowers && form.totalTowers < 0) {
      newErrors.totalTowers = 'Total towers cannot be negative';
    }

    if (form.totalUnits && form.totalUnits < 0) {
      newErrors.totalUnits = 'Total units cannot be negative';
    }

    if (form.priceRange && !/^\d+-\d+$/.test(form.priceRange)) {
      newErrors.priceRange = 'Enter price range in format: min-max (e.g., 5000000-7000000)';
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
      const { projectImages, floorPlans, legalDocs } = await handleUploads();

      const payload = {
        ...form,
        projectImages,
        floorPlans,
        legalDocs,
        userId: user.uid,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'BuilderProjectsListing'), payload);

      alert('Listing submitted successfully!');
      setForm(initialForm);
      setSelectedProjectImages([]);
      setSelectedFloorPlans([]);
      setSelectedLegalDocs([]);
      setErrors({});
      navigate('/success');
    } catch (err) {
      console.error('Error submitting listing:', err);
      alert('Error submitting listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-8 text-center">
          Builder Projects Listing Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Project Details */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-orange-400">Basic Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Project Name*</label>
                <input
                  type="text"
                  name="projectName"
                  value={form.projectName}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter project name"
                />
                {errors.projectName && (
                  <p className="text-red-400 text-sm">{errors.projectName}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Builder/Developer Name*</label>
                <input
                  type="text"
                  name="builderName"
                  value={form.builderName}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter builder name"
                />
                {errors.builderName && (
                  <p className="text-red-400 text-sm">{errors.builderName}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Project Type*</label>
                <select
                  name="projectType"
                  value={form.projectType}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Mixed">Mixed</option>
                </select>
                {errors.projectType && (
                  <p className="text-red-400 text-sm">{errors.projectType}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Status*</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="Pre-launch">Pre-launch</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
                {errors.status && (
                  <p className="text-red-400 text-sm">{errors.status}</p>
                )}
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-orange-400">Location Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">City*</label>
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Select</option>
                  {cityOptions.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.city && (
                  <p className="text-red-400 text-sm">{errors.city}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Locality*</label>
                <input
                  type="text"
                  name="locality"
                  value={form.locality}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter locality"
                  required
                />
                {errors.locality && (
                  <p className="text-red-400 text-sm">{errors.locality}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2">Complete Address*</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                  rows="4"
                  placeholder="Enter full address with PIN code"
                  required
                />
                {errors.address && (
                  <p className="text-red-400 text-sm">{errors.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Project Features */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-orange-400">Project Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Total Towers*</label>
                <input
                  type="number"
                  name="totalTowers"
                  value={form.totalTowers}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter number of towers"
                  required
                  min="0"
                />
                {errors.totalTowers && (
                  <p className="text-red-400 text-sm">{errors.totalTowers}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Total Units*</label>
                <input
                  type="number"
                  name="totalUnits"
                  value={form.totalUnits}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter number of units"
                  required
                  min="0"
                />
                {errors.totalUnits && (
                  <p className="text-red-400 text-sm">{errors.totalUnits}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Configuration*</label>
                <div className="space-y-2">
                  {configurationOptions.map((config) => (
                    <label key={config} className="flex items-center text-gray-300">
                      <input
                        type="checkbox"
                        name="configuration"
                        value={config}
                        checked={form.configuration.includes(config)}
                        onChange={handleChange}
                        className="mr-2 text-orange-500 focus:ring-orange-500"
                      />
                      {config}
                    </label>
                  ))}
                </div>
                {errors.configuration && (
                  <p className="text-red-400 text-sm">{errors.configuration}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">RERA Registration Number</label>
                <input
                  type="text"
                  name="reraRegistrationNumber"
                  value={form.reraRegistrationNumber}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter RERA ID (if applicable)"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Units */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-orange-400">Pricing & Units</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Price Range (₹)*</label>
                <input
                  type="text"
                  name="priceRange"
                  value={form.priceRange}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., 5000000-7000000"
                  required
                />
                {errors.priceRange && (
                  <p className="text-red-400 text-sm">{errors.priceRange}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Available Unit Sizes (sq ft)*</label>
                <div className="space-y-2">
                  {unitSizeOptions.map((size) => (
                    <label key={size} className="flex items-center text-gray-300">
                      <input
                        type="checkbox"
                        name="unitSizes"
                        value={size}
                        checked={form.unitSizes.includes(size)}
                        onChange={handleChange}
                        className="mr-2 text-orange-500 focus:ring-orange-500"
                      />
                      {size}
                    </label>
                  ))}
                </div>
                {errors.unitSizes && (
                  <p className="text-red-400 text-sm">{errors.unitSizes}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Launch/Completion Date*</label>
                <input
                  type="date"
                  name="completionDate"
                  value={form.completionDate}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                  required
                />
                {errors.completionDate && (
                  <p className="text-red-400 text-sm">{errors.completionDate}</p>
                )}
              </div>
            </div>
          </div>

          {/* Legal & Approvals */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-orange-400">Legal & Approvals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">RERA Approved?*</label>
                <select
                  name="reraApproved"
                  value={form.reraApproved}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.reraApproved && (
                  <p className="text-red-400 text-sm">{errors.reraApproved}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Land Title*</label>
                <input
                  type="text"
                  name="landTitle"
                  value={form.landTitle}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter land title details"
                  required
                />
                {errors.landTitle && (
                  <p className="text-red-400 text-sm">{errors.landTitle}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Approvals</label>
                <div className="space-y-2">
                  {approvalOptions.map((approval) => (
                    <label key={approval} className="flex items-center text-gray-300">
                      <input
                        type="checkbox"
                        name="approvals"
                        value={approval}
                        checked={form.approvals.includes(approval)}
                        onChange={handleChange}
                        className="mr-2 text-orange-500 focus:ring-orange-500"
                      />
                      {approval}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-orange-400">Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Clubhouse</label>
                <select
                  name="clubhouse"
                  value={form.clubhouse}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Swimming Pool</label>
                <select
                  name="swimmingPool"
                  value={form.swimmingPool}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Gymnasium</label>
                <select
                  name="gymnasium"
                  value={form.gymnasium}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Media Uploads */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-orange-400">Media Uploads</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Upload Project Images (Min 3)*</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'projectImages')}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                />
                {errors.projectImages && (
                  <p className="text-red-400 text-sm">{errors.projectImages}</p>
                )}
                {selectedProjectImages.length > 0 && (
                  <div className="mt-2 text-sm text-gray-400">
                    {selectedProjectImages.length} image(s) selected
                  </div>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Upload Floor Plans</label>
                <input
                  type="file"
                  multiple
                  accept="image/*,application/pdf"
                  onChange={(e) => handleFileChange(e, 'floorPlans')}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                />
                {selectedFloorPlans.length > 0 && (
                  <div className="mt-2 text-sm text-gray-400">
                    {selectedFloorPlans.length} file(s) selected
                  </div>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Upload Legal Docs (PDFs)</label>
                <input
                  type="file"
                  multiple
                  accept="application/pdf"
                  onChange={(e) => handleFileChange(e, 'legalDocs')}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                />
                {selectedLegalDocs.length > 0 && (
                  <div className="mt-2 text-sm text-gray-400">
                    {selectedLegalDocs.length} document(s) selected
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-orange-400">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Contact Person*</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={form.contactPerson}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter contact person name"
                  required
                />
                {errors.contactPerson && (
                  <p className="text-red-400 text-sm">{errors.contactPerson}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Phone Number*</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., +919876543210"
                  required
                />
                {errors.phoneNumber && (
                  <p className="text-red-400 text-sm">{errors.phoneNumber}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email Address*</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter email"
                  required
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Official Website (Optional)</label>
                <input
                  type="url"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter website URL"
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
              className="mr-2 text-orange-500 focus:ring-orange-500"
              required
            />
            <label className="text-gray-300">
              I agree to the <a href="/terms" className="text-orange-400 hover:underline">terms and conditions</a>*
            </label>
            {errors.termsAccepted && (
              <p className="text-red-400 text-sm ml-4">{errors.termsAccepted}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="submit"
              disabled={loading || !user}
              className={`bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold py-4 px-10 rounded-xl hover:from-orange-700 hover:to-orange-600 transition-all duration-300 shadow-lg ${loading || !user ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Listing'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuilderProjectsForm;