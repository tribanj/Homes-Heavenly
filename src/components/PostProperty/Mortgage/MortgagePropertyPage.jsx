import React, { useState } from 'react';
import axios from 'axios';
import { db } from '../../../firebase/firebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../../context/AuthContext';
import { FiUpload, FiChevronDown, FiHome, FiDollarSign, FiMapPin, FiUser, FiFileText } from 'react-icons/fi';

const MortgageListingForm = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    propertyTitle: '',
    propertyType: '',
    propertyUsage: '',
    builtUpArea: '',
    carpetArea: '',
    plotArea: '',
    floors: '',
    ageOfProperty: '',
    furnishingStatus: '',
    facing: '',
    ownershipType: '',
    propertyDescription: '',
    mortgageType: '',
    loanAmount: '',
    loanTenure: '',
    interestRate: '',
    existingLoan: '',
    loanPurpose: '',
    downPayment: '',
    state: '',
    city: '',
    locality: '',
    pincode: '',
    mapUrl: '',
    name: '',
    phone: '',
    email: '',
    company: '',
    termsAccepted: false
  });

  const [files, setFiles] = useState({
    idProof: null,
    images: [],
    floorPlan: null,
    ownershipDocs: []
  });

  const [activeSection, setActiveSection] = useState('property');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e, key) => {
    const filesArray = Array.from(e.target.files);
    setFiles(prev => ({
      ...prev,
      [key]: key === 'images' || key === 'ownershipDocs' ? filesArray : filesArray[0],
    }));
  };

  const uploadToCloudinary = async (file, folder) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'homeHeavenlyImage');
    formData.append('folder', `mortgageListings/${folder}`);

    const config = {
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
      }
    };

    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/de56w4x21/upload',
      formData,
      config
    );
    return res.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.termsAccepted) return alert('Please accept terms and conditions');
    if (!user) return alert('Please login to submit a listing');

    try {
      setUploadProgress(0);

      // Upload files
      const uploaded = {
        idProofUrl: files.idProof ? await uploadToCloudinary(files.idProof, 'idProof') : '',
        imageUrls: files.images && files.images.length > 0
          ? await Promise.all(files.images.map(f => uploadToCloudinary(f, 'images')))
          : [],
        floorPlanUrl: files.floorPlan ? await uploadToCloudinary(files.floorPlan, 'floorPlan') : '',
        ownershipDocUrls: files.ownershipDocs && files.ownershipDocs.length > 0
          ? await Promise.all(files.ownershipDocs.map(f => uploadToCloudinary(f, 'ownershipDocs')))
          : [],
      };

      // Combine form data with uploaded file URLs
      const listingData = {
        ...form,
        ...uploaded,
        userId: user.uid,
        createdAt: serverTimestamp(),
      };

      // Add to Firestore
      await addDoc(collection(db, 'mortgageListings'), listingData);
      alert('Mortgage listing submitted successfully!');
      // Reset form after successful submission
      setForm({
        propertyTitle: '',
        propertyType: '',
        propertyUsage: '',
        builtUpArea: '',
        carpetArea: '',
        plotArea: '',
        floors: '',
        ageOfProperty: '',
        furnishingStatus: '',
        facing: '',
        ownershipType: '',
        propertyDescription: '',
        mortgageType: '',
        loanAmount: '',
        loanTenure: '',
        interestRate: '',
        existingLoan: '',
        loanPurpose: '',
        downPayment: '',
        state: '',
        city: '',
        locality: '',
        pincode: '',
        mapUrl: '',
        name: '',
        phone: '',
        email: '',
        company: '',
        termsAccepted: false
      });
      setFiles({
        idProof: null,
        images: [],
        floorPlan: null,
        ownershipDocs: []
      });
      setUploadProgress(0);
    } catch (err) {
      console.error('Submission error:', err);
      alert('Submission failed. Please try again.');
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'property':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold flex items-center text-white">
              <FiHome className="mr-2 text-orange-500" /> Property Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Property Title*</label>
                <input
                  name="propertyTitle"
                  value={form.propertyTitle}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  placeholder="e.g. Spacious 3BHK in Prime Location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Property Type*</label>
                <select
                  name="propertyType"
                  value={form.propertyType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                >
                  <option value="" className="text-gray-400">Select Property Type</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Land">Land</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Property Usage*</label>
                <select
                  name="propertyUsage"
                  value={form.propertyUsage}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                >
                  <option value="" className="text-gray-400">Select Usage</option>
                  <option value="Self-use">Self-use</option>
                  <option value="Investment">Investment</option>
                  <option value="Rental">Rental</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Built-up Area (sq ft)</label>
                <input
                  type="number"
                  name="builtUpArea"
                  value={form.builtUpArea}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  placeholder="e.g. 1500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Carpet Area (sq ft)</label>
                <input
                  type="number"
                  name="carpetArea"
                  value={form.carpetArea}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  placeholder="e.g. 1200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Plot Area (sq ft)</label>
                <input
                  type="number"
                  name="plotArea"
                  value={form.plotArea}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  placeholder="e.g. 2400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Number of Floors</label>
                <input
                  type="number"
                  name="floors"
                  value={form.floors}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  placeholder="e.g. 2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Age of Property</label>
                <select
                  name="ageOfProperty"
                  value={form.ageOfProperty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                >
                  <option value="" className="text-gray-400">Select Age</option>
                  <option value="New">New</option>
                  <option value="5 years">5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Furnishing Status</label>
                <select
                  name="furnishingStatus"
                  value={form.furnishingStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                >
                  <option value="" className="text-gray-400">Select Status</option>
                  <option value="Furnished">Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Facing</label>
                <select
                  name="facing"
                  value={form.facing}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                >
                  <option value="" className="text-gray-400">Select Direction</option>
                  <option value="North">North</option>
                  <option value="East">East</option>
                  <option value="South">South</option>
                  <option value="West">West</option>
                  <option value="NE">NE</option>
                  <option value="NW">NW</option>
                  <option value="SE">SE</option>
                  <option value="SW">SW</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Ownership Type</label>
                <select
                  name="ownershipType"
                  value={form.ownershipType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                >
                  <option value="" className="text-gray-400">Select Type</option>
                  <option value="Freehold">Freehold</option>
                  <option value="Leasehold">Leasehold</option>
                  <option value="Co-operative">Co-operative</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Property Description</label>
              <textarea
                name="propertyDescription"
                value={form.propertyDescription}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                placeholder="Describe your property in detail..."
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
                disabled
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('mortgage')}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
              >
                Next: Mortgage Details
              </button>
            </div>
          </div>
        );

      case 'mortgage':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold flex items-center text-white">
              <FiDollarSign className="mr-2 text-orange-500" /> Mortgage Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Mortgage Type*</label>
                <select
                  name="mortgageType"
                  value={form.mortgageType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                >
                  <option value="" className="text-gray-400">Select Mortgage Type</option>
                  <option value="Home Loan">Home Loan</option>
                  <option value="LAP (Loan Against Property)">LAP (Loan Against Property)</option>
                  <option value="Commercial Loan">Commercial Loan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Loan Amount (₹)*</label>
                <input
                  type="number"
                  name="loanAmount"
                  value={form.loanAmount}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  placeholder="e.g. 5000000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Loan Tenure (Years)*</label>
                <input
                  type="number"
                  name="loanTenure"
                  value={form.loanTenure}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  placeholder="e.g. 20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Interest Rate (%)</label>
                <input
                  type="number"
                  name="interestRate"
                  value={form.interestRate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  placeholder="e.g. 8.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Existing Loan?</label>
                <select
                  name="existingLoan"
                  value={form.existingLoan}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                >
                  <option value="" className="text-gray-400">Select Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Loan Purpose</label>
                <select
                  name="loanPurpose"
                  value={form.loanPurpose}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                >
                  <option value="" className="text-gray-400">Select Purpose</option>
                  <option value="Purchase">Purchase</option>
                  <option value="Refinance">Refinance</option>
                  <option value="Construction">Construction</option>
                  <option value="Renovation">Renovation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Down Payment (₹)</label>
                <input
                  type="number"
                  name="downPayment"
                  value={form.downPayment}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  placeholder="e.g. 1000000"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setActiveSection('property')}
                className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
              >
                Previous: Property Info
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('location')}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
              >
                Next: Location Details
              </button>
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold flex items-center text-white">
              <FiMapPin className="mr-2 text-orange-500" /> Location Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">State*</label>
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  placeholder="e.g. Punjab"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">City*</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  placeholder="e.g. Chandigarh"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Locality*</label>
                <input
                  name="locality"
                  value={form.locality}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  placeholder="e.g. Sector 22"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Pincode*</label>
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  placeholder="e.g. 160022"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-300">Google Map URL</label>
                <input
                  name="mapUrl"
                  value={form.mapUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  placeholder="Paste Google Maps link here"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setActiveSection('mortgage')}
                className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
              >
                Previous: Mortgage Details
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('contact')}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
              >
                Next: Contact Information
              </button>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold flex items-center text-white">
              <FiUser className="mr-2 text-orange-500" /> Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Name*</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Phone*</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  placeholder="e.g. 9876543210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  placeholder="e.g. example@domain.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Organization/Company</label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  placeholder="(Optional)"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setActiveSection('location')}
                className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
              >
                Previous: Location Details
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('documents')}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
              >
                Next: Documents Upload
              </button>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold flex items-center text-white">
              <FiFileText className="mr-2 text-orange-500" /> Documents Upload
            </h3>

            <div className="space-y-6">
              <div className="border border-gray-600 rounded-lg p-4 bg-gray-800">
                <label className="block text-sm font-medium mb-2 text-gray-300">ID Proof (Aadhar/PAN/Passport)*</label>
                <div className="flex items-center">
                  <label className="flex flex-col items-center px-4 py-6 bg-gray-700 text-orange-500 rounded-lg tracking-wide border border-orange-500 cursor-pointer hover:bg-gray-600 transition">
                    <FiUpload className="text-xl" />
                    <span className="mt-2 text-sm">Choose file</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, 'idProof')}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </label>
                  <span className="ml-4 text-sm text-gray-400">
                    {files.idProof ? files.idProof.name : 'No file selected'}
                  </span>
                </div>
              </div>

              <div className="border border-gray-600 rounded-lg p-4 bg-gray-800">
                <label className="block text-sm font-medium mb-2 text-gray-300">Property Images (Max 10)*</label>
                <div className="flex items-center">
                  <label className="flex flex-col items-center px-4 py-6 bg-gray-700 text-orange-500 rounded-lg tracking-wide border border-orange-500 cursor-pointer hover:bg-gray-600 transition">
                    <FiUpload className="text-xl" />
                    <span className="mt-2 text-sm">Choose files</span>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      onChange={(e) => handleFileChange(e, 'images')}
                      accept=".jpg,.jpeg,.png"
                    />
                  </label>
                  <span className="ml-4 text-sm text-gray-400">
                    {files.images.length > 0
                      ? `${files.images.length} file(s) selected`
                      : 'No files selected'}
                  </span>
                </div>
              </div>

              <div className="border border-gray-600 rounded-lg p-4 bg-gray-800">
                <label className="block text-sm font-medium mb-2 text-gray-300">Floor Plan</label>
                <div className="flex items-center">
                  <label className="flex flex-col items-center px-4 py-6 bg-gray-700 text-orange-500 rounded-lg tracking-wide border border-orange-500 cursor-pointer hover:bg-gray-600 transition">
                    <FiUpload className="text-xl" />
                    <span className="mt-2 text-sm">Choose file</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, 'floorPlan')}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </label>
                  <span className="ml-4 text-sm text-gray-400">
                    {files.floorPlan ? files.floorPlan.name : 'No file selected'}
                  </span>
                </div>
              </div>

              <div className="border border-gray-600 rounded-lg p-4 bg-gray-800">
                <label className="block text-sm font-medium mb-2 text-gray-300">Ownership Documents*</label>
                <div className="flex items-center">
                  <label className="flex flex-col items-center px-4 py-6 bg-gray-700 text-orange-500 rounded-lg tracking-wide border border-orange-500 cursor-pointer hover:bg-gray-600 transition">
                    <FiUpload className="text-xl" />
                    <span className="mt-2 text-sm">Choose files</span>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      onChange={(e) => handleFileChange(e, 'ownershipDocs')}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </label>
                  <span className="ml-4 text-sm text-gray-400">
                    {files.ownershipDocs.length > 0
                      ? `${files.ownershipDocs.length} file(s) selected`
                      : 'No files selected'}
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <label className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={form.termsAccepted}
                    onChange={handleChange}
                    className="mt-1 text-orange-500 focus:ring-orange-500 border-gray-600 bg-gray-800 rounded"
                  />
                  <span className="text-sm text-gray-300">
                    I agree to the <a href="/terms" className="text-orange-500 hover:underline">terms and conditions</a> and confirm that all information provided is accurate.
                  </span>
                </label>
              </div>

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="pt-2">
                  <div className="w-full bg-gray-600 rounded-full h-2.5">
                    <div
                      className="bg-orange-600 h-2.5 rounded-full transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Uploading files... {uploadProgress}%</p>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setActiveSection('contact')}
                  className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
                >
                  Previous: Contact Info
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition flex items-center disabled:bg-orange-400 disabled:cursor-not-allowed"
                  disabled={uploadProgress > 0 && uploadProgress < 100}
                >
                  {uploadProgress > 0 && uploadProgress < 100 ? (
                    'Uploading...'
                  ) : (
                    'Submit Mortgage Listing'
                  )}
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-500">Mortgage Property Listing</h1>
          <p className="mt-2 text-gray-400">
            Fill out the form below to list your property for mortgage
          </p>
        </div>

        <div className="bg-gray-800 shadow-xl rounded-xl overflow-hidden">
          {/* Progress Steps */}
          <div className="px-6 py-4 bg-gray-700 border-b border-gray-600">
            <div className="flex justify-between relative">
              {['property', 'mortgage', 'location', 'contact', 'documents'].map((step, index) => (
                <div key={step} className="flex flex-col items-center z-10">
                  <button
                    onClick={() => setActiveSection(step)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition ${activeSection === step
                      ? 'bg-orange-600 text-white'
                      : index < ['property', 'mortgage', 'location', 'contact', 'documents'].indexOf(activeSection)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-600 text-gray-300'
                      }`}
                  >
                    {index + 1}
                  </button>
                  <span className="text-xs mt-1 text-gray-400 capitalize">{step}</span>
                </div>
              ))}
              <div className="absolute top-5 left-10 right-10 h-1 bg-gray-600 z-0">
                <div
                  className="h-1 bg-orange-600 transition-all duration-300"
                  style={{
                    width: `${['property', 'mortgage', 'location', 'contact', 'documents'].indexOf(activeSection) * 25}%`
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            {renderSection()}
          </form>
        </div>
      </div>
    </div>
  );
};

export default MortgageListingForm;