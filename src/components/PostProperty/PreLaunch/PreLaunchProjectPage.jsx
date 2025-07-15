// This is form for Uploading prelaunch data 

import React, { useState } from 'react';
import { db } from "../../../firebase/firebaseConfig";
import { collection, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import axios from 'axios';
import { useAuth } from "../../../context/AuthContext";
import { FaUpload, FaPlus, FaTrash } from 'react-icons/fa';

// Constants
const amenityOptions = ['Clubhouse', 'Gym', 'Swimming Pool', 'Power Backup', 'Security', 'Park', 'Kids Play Area', 'Lift', 'Parking', 'Garden'];
const configOptions = ['1 BHK', '2 BHK', '3 BHK', '4+ BHK', 'Studio'];
const planTypes = ['CLP', 'Flexi', 'Down Payment', 'Subvention'];
const possessionTypes = ['Stilt + 3', 'High Rise', 'Villa', 'Plotted', 'Other'];
const statusOptions = ['Pre-Launch', 'Launching Soon', 'Registration Open'];
const projectTypes = ['Residential', 'Commercial', 'Mixed-Use'];

// Initial form state
const initialForm = {
  title: '',
  type: '',
  builder: '',
  rera: '',
  status: '',
  launchDate: '',
  completionDate: '',
  state: '',
  city: '',
  locality: '',
  pincode: '',
  mapUrl: '',
  configurations: [],
  towers: '',
  floors: '',
  totalUnits: '',
  possessionType: '',
  startPrice: '',
  priceRange: '',
  paymentPlan: '',
  bookingAmount: '',
  amenities: [],
  brochureUrl: '',
  floorPlanUrls: [],
  imageUrls: [],
  walkthroughUrls: [],
  contacts: [{ name: '', phone: '', email: '', website: '' }],
  offers: '',
  description: '',
  termsAccepted: false,
};

const PrelaunchProjectForm = () => {
  const { user } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [fileUploads, setFileUploads] = useState({
    brochure: null,
    floorPlans: [],
    images: [],
    walkthroughs: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMultiSelect = (name, value) => {
    setForm(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };

  const handleContactChange = (index, field, value) => {
    const updatedContacts = [...form.contacts];
    updatedContacts[index][field] = value;
    setForm(prev => ({ ...prev, contacts: updatedContacts }));
  };

  const addContact = () => {
    setForm(prev => ({
      ...prev,
      contacts: [...prev.contacts, { name: '', phone: '', email: '', website: '' }]
    }));
  };

  const removeContact = (index) => {
    if (form.contacts.length > 1) {
      const updatedContacts = [...form.contacts];
      updatedContacts.splice(index, 1);
      setForm(prev => ({ ...prev, contacts: updatedContacts }));
    }
  };

  const handleFileChange = (e, field) => {
    const files = Array.from(e.target.files);
    if (field === 'brochure') {
      setFileUploads(prev => ({ ...prev, [field]: files[0] }));
    } else {
      setFileUploads(prev => ({ ...prev, [field]: files }));
    }
  };

  const uploadFile = async (file, folder) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'homeHeavenlyImage');
    data.append('folder', `prelaunchProject/${folder}`);

    // ✅ Detect correct resource type
    let resourceType = 'image'; // default
    if (file.type === 'application/pdf') {
      resourceType = 'raw'; // For PDFs
    } else if (file.type.includes('video')) {
      resourceType = 'video';
    }

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/de56w4x21/${resourceType}/upload`,
        data
      );
      return res.data.secure_url; // or return res.data for more info (like public_id)
    } catch (error) {
      console.error('Upload failed:', error.response?.data || error.message);
      throw error;
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.termsAccepted || !user) {
      alert('Please accept terms and conditions');
      return;
    }

    setLoading(true);
    try {
      // Upload files
      const uploadPromises = [];
      const uploadedFiles = {
        brochureUrl: '',
        floorPlanUrls: [],
        imageUrls: [],
        walkthroughUrls: []
      };

      // Upload brochure (PDF)
      if (fileUploads.brochure) {
        uploadPromises.push(
          uploadFile(fileUploads.brochure, 'brochure').then(url => {
            uploadedFiles.brochureUrl = url;
          })
        );
      }

      // Upload multiple floor plan PDFs
      if (fileUploads.floorPlans.length > 0) {
        uploadPromises.push(
          Promise.all(
            fileUploads.floorPlans.map(file => uploadFile(file, 'floorPlans'))
          ).then(urls => {
            uploadedFiles.floorPlanUrls = urls;
          })
        );
      }

      // Upload multiple image files
      if (fileUploads.images.length > 0) {
        uploadPromises.push(
          Promise.all(
            fileUploads.images.map(file => uploadFile(file, 'images'))
          ).then(urls => {
            uploadedFiles.imageUrls = urls;
          })
        );
      }

      // Upload multiple walkthrough video files (MP4)
      if (fileUploads.walkthroughs.length > 0) {
        uploadPromises.push(
          Promise.all(
            fileUploads.walkthroughs.map(file => uploadFile(file, 'walkthroughs'))
          ).then(urls => {
            uploadedFiles.walkthroughUrls = urls;
          })
        );
      }

      await Promise.all(uploadPromises);

      // Final project object to store
      const projectData = {
        ...form,
        ...uploadedFiles,
        userId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        type: 'prelaunch' // For filtering
      };

      // Save to Firestore
      const prelaunchRef = doc(collection(db, 'prelaunchProjects'));
      await setDoc(prelaunchRef, projectData);

      alert('Project submitted successfully!');
      setForm(initialForm);
      setFileUploads({
        brochure: null,
        floorPlans: [],
        images: [],
        walkthroughs: []
      });
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit project. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">Prelaunch Project Submission</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Title*</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Type*</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Type</option>
                {projectTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Builder Name*</label>
              <input
                name="builder"
                value={form.builder}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">RERA Number</label>
              <input
                name="rera"
                value={form.rera}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Status*</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Status</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Project Timeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Launch Date</label>
              <input
                type="date"
                name="launchDate"
                value={form.launchDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Completion Date</label>
              <input
                type="date"
                name="completionDate"
                value={form.completionDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Location Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State*</label>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Locality</label>
              <input
                name="locality"
                value={form.locality}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
              <input
                name="pincode"
                type="number"
                value={form.pincode}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Google Map URL</label>
              <input
                name="mapUrl"
                type="url"
                value={form.mapUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://maps.google.com/..."
              />
            </div>
          </div>
        </div>

        {/* Configuration Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Project Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Available Configurations</label>
              <div className="grid grid-cols-2 gap-2">
                {configOptions.map(config => (
                  <label key={config} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={form.configurations.includes(config)}
                      onChange={() => handleMultiSelect('configurations', config)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{config}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Possession Type</label>
              <select
                name="possessionType"
                value={form.possessionType}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Type</option>
                {possessionTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Towers</label>
              <input
                name="towers"
                type="number"
                value={form.towers}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Floors</label>
              <input
                name="floors"
                type="number"
                value={form.floors}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Units</label>
              <input
                name="totalUnits"
                type="number"
                value={form.totalUnits}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Pricing Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Starting Price (₹)</label>
              <input
                name="startPrice"
                type="number"
                value={form.startPrice}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range (₹)</label>
              <input
                name="priceRange"
                value={form.priceRange}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 50L - 1.2Cr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Plan</label>
              <select
                name="paymentPlan"
                value={form.paymentPlan}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Plan</option>
                {planTypes.map(plan => (
                  <option key={plan} value={plan}>{plan}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Booking Amount (₹)</label>
              <input
                name="bookingAmount"
                type="number"
                value={form.bookingAmount}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Amenities Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {amenityOptions.map(amenity => (
              <label key={amenity} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.amenities.includes(amenity)}
                  onChange={() => handleMultiSelect('amenities', amenity)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Media & Documents</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brochure (PDF)</label>
              <div className="flex items-center">
                <label className="flex-1">
                  <div className="flex items-center justify-center px-6 py-8 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500">
                    <div className="text-center">
                      <FaUpload className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-600">
                        {fileUploads.brochure ? fileUploads.brochure.name : 'Upload PDF Brochure'}
                      </p>
                    </div>
                    <input
                      id="brochure"
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, 'brochure')}
                      className="sr-only"
                    />
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Floor Plans (PDF)</label>
              <div className="flex items-center">
                <label className="flex-1">
                  <div className="flex items-center justify-center px-6 py-8 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500">
                    <div className="text-center">
                      <FaUpload className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-600">
                        {fileUploads.floorPlans.length > 0
                          ? `${fileUploads.floorPlans.length} files selected`
                          : 'Upload PDF Floor Plans'}
                      </p>
                    </div>
                    <input
                      id="floorPlans"
                      type="file"
                      accept=".pdf"
                      multiple
                      onChange={(e) => handleFileChange(e, 'floorPlans')}
                      className="sr-only"
                    />
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Images (JPG/PNG)</label>
              <div className="flex items-center">
                <label className="flex-1">
                  <div className="flex items-center justify-center px-6 py-8 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500">
                    <div className="text-center">
                      <FaUpload className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-600">
                        {fileUploads.images.length > 0
                          ? `${fileUploads.images.length} images selected`
                          : 'Upload Project Images'}
                      </p>
                    </div>
                    <input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileChange(e, 'images')}
                      className="sr-only"
                    />
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Walkthrough Videos (MP4)</label>
              <div className="flex items-center">
                <label className="flex-1">
                  <div className="flex items-center justify-center px-6 py-8 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500">
                    <div className="text-center">
                      <FaUpload className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-600">
                        {fileUploads.walkthroughs.length > 0
                          ? `${fileUploads.walkthroughs.length} videos selected`
                          : 'Upload Walkthrough Videos'}
                      </p>
                    </div>
                    <input
                      id="walkthroughs"
                      type="file"
                      accept="video/mp4"
                      multiple
                      onChange={(e) => handleFileChange(e, 'walkthroughs')}
                      className="sr-only"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Contacts Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Contact Information</h2>
          {form.contacts.map((contact, index) => (
            <div key={index} className="mb-6 p-4 border rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Contact Person {index + 1}</h3>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeContact(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    value={contact.name}
                    onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    value={contact.phone}
                    onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) => handleContactChange(index, 'email', e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="url"
                    value={contact.website}
                    onChange={(e) => handleContactChange(index, 'website', e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addContact}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaPlus className="mr-1" /> Add Another Contact
          </button>
        </div>

        {/* Additional Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Additional Information</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Special Offers</label>
              <textarea
                name="offers"
                value={form.offers}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Terms and Submit */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="termsAccepted"
                type="checkbox"
                checked={form.termsAccepted}
                onChange={handleChange}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-700">
                I agree to the terms and conditions
              </label>
              <p className="text-gray-500">
                By submitting this form, you confirm that all information provided is accurate.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              disabled={loading || !form.termsAccepted}
              className={`w-full px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${(loading || !form.termsAccepted) ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Submitting...' : 'Submit Project'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PrelaunchProjectForm;