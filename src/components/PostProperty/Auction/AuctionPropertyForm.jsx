import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from "../../../firebase/firebaseConfig";
import axios from 'axios';
import { FaUpload, FaInfoCircle, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AuctionPropertyForm = () => {
    // Form state
    const [formData, setFormData] = useState({
        basicDetails: {
            listingTitle: '',
            propertyType: '',
            listingStatus: ''
        },
        propertyDetails: {
            builtUpArea: '',
            carpetArea: '',
            bedrooms: '',
            bathrooms: '',
            furnishingStatus: ''
        },
        auctionDetails: {
            startingBidPrice: '',
            reservePrice: '',
            bidIncrement: '',
            auctionStartDate: '',
            auctionEndDate: ''
        },
        locationDetails: {
            city: '',
            locality: '',
            pinCode: ''
        },
        ownerInfo: {
            fullName: '',
            contactNumber: '',
            email: ''
        },
        mediaUploads: {
            propertyImages: [],
            videoTourLink: '',
            documents: []
        },
        legalDetails: {
            ownershipType: '',
            legalDisputes: '',
            encumbranceCertificate: ''
        },
        additionalNotes: '',
        status:pending
    });

    const [declaration, setDeclaration] = useState(false);
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState({
        images: [],
        documents: []
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    // Property options
    const propertyTypes = ['Apartment', 'Villa', 'Plot', 'Commercial', 'Penthouse', 'Farm House'];
    const listingStatuses = ['Upcoming', 'Active', 'Closed'];
    const furnishingStatuses = ['Fully Furnished', 'Semi Furnished', 'Unfurnished'];
    const ownershipTypes = ['Freehold', 'Leasehold'];
    const legalDisputes = ['Litigation', 'Clean Title'];
    const encumbranceOptions = ['Yes', 'No'];
    const bedrooms = Array.from({ length: 10 }, (_, i) => i + 1);
    const bathrooms = Array.from({ length: 10 }, (_, i) => i + 1);

    // Handle input changes
    const handleChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    // Handle file uploads
    const handleFileChange = async (e, type) => {
        const selectedFiles = Array.from(e.target.files);

        if (type === 'images' && selectedFiles.length + files.images.length > 5) {
            setErrors({ images: 'Maximum 5 images allowed' });
            return;
        }

        setErrors({});

        // Upload files to Cloudinary
        setLoading(true);
        try {
            const uploadPromises = selectedFiles.map(file => uploadToCloudinary(file));
            const urls = await Promise.all(uploadPromises);

            if (type === 'images') {
                setFiles(prev => ({
                    ...prev,
                    images: [...prev.images, ...urls]
                }));
            } else {
                setFiles(prev => ({
                    ...prev,
                    documents: [...prev.documents, ...urls]
                }));
            }
        } catch (error) {
            setErrors({ upload: 'File upload failed. Please try again.' });
            console.error('Upload error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Cloudinary upload function
    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'homeHeavenlyImage');

        try {
            const res = await axios.post(
                'https://api.cloudinary.com/v1_1/de56w4x21/upload',
                formData
            );
            return res.data.secure_url;
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            throw error;
        }
    };

    // Remove file
    const removeFile = (type, index) => {
        if (type === 'images') {
            setFiles(prev => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== index)
            }));
        } else {
            setFiles(prev => ({
                ...prev,
                documents: prev.documents.filter((_, i) => i !== index)
            }));
        }
    };

    // Form validation
    const validateForm = () => {
        const newErrors = {};

        // Basic details validation
        if (!formData.basicDetails.listingTitle) {
            newErrors.listingTitle = 'Listing title is required';
        }
        if (!formData.basicDetails.propertyType) {
            newErrors.propertyType = 'Property type is required';
        }

        // Property details validation
        if (!formData.propertyDetails.builtUpArea) {
            newErrors.builtUpArea = 'Built-up area is required';
        }
        if (!formData.propertyDetails.bedrooms) {
            newErrors.bedrooms = 'Bedrooms is required';
        }

        // Auction details validation
        if (!formData.auctionDetails.startingBidPrice) {
            newErrors.startingBidPrice = 'Starting bid price is required';
        }
        if (!formData.auctionDetails.auctionStartDate) {
            newErrors.auctionStartDate = 'Auction start date is required';
        }

        // Location validation
        if (!formData.locationDetails.city) {
            newErrors.city = 'City is required';
        }
        if (!formData.locationDetails.pinCode) {
            newErrors.pinCode = 'PIN code is required';
        }

        // Owner info validation
        if (!formData.ownerInfo.fullName) {
            newErrors.fullName = 'Full name is required';
        }
        if (!formData.ownerInfo.contactNumber || formData.ownerInfo.contactNumber.length !== 10) {
            newErrors.contactNumber = 'Valid 10-digit contact number is required';
        }
        if (!formData.ownerInfo.email || !/^\S+@\S+\.\S+$/.test(formData.ownerInfo.email)) {
            newErrors.email = 'Valid email is required';
        }

        // Media validation
        if (files.images.length < 3) {
            newErrors.images = 'At least 3 images are required';
        }

        // Legal validation
        if (!formData.legalDetails.ownershipType) {
            newErrors.ownershipType = 'Ownership type is required';
        }

        // Declaration
        if (!declaration) {
            newErrors.declaration = 'You must accept the declaration';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            // Prepare media data
            const mediaData = {
                propertyImages: files.images,
                documents: files.documents,
                videoTourLink: formData.mediaUploads.videoTourLink
            };

            // Combine all form data
            const propertyData = {
                ...formData,
                mediaUploads: mediaData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            // Save to Firestore
            const docRef = await addDoc(collection(db, "property_for_auction"), propertyData);
            console.log("Document written with ID: ", docRef.id);

            setSuccess(true);
            // Reset form after success
            setTimeout(() => {
                setFormData({
                    basicDetails: {
                        listingTitle: '',
                        propertyType: '',
                        listingStatus: ''
                    },
                    propertyDetails: {
                        builtUpArea: '',
                        carpetArea: '',
                        bedrooms: '',
                        bathrooms: '',
                        furnishingStatus: ''
                    },
                    auctionDetails: {
                        startingBidPrice: '',
                        reservePrice: '',
                        bidIncrement: '',
                        auctionStartDate: '',
                        auctionEndDate: ''
                    },
                    locationDetails: {
                        city: '',
                        locality: '',
                        pinCode: ''
                    },
                    ownerInfo: {
                        fullName: '',
                        contactNumber: '',
                        email: ''
                    },
                    mediaUploads: {
                        propertyImages: [],
                        videoTourLink: '',
                        documents: []
                    },
                    legalDetails: {
                        ownershipType: '',
                        legalDisputes: '',
                        encumbranceCertificate: ''
                    },
                    additionalNotes: ''
                });
                setFiles({ images: [], documents: [] });
                setDeclaration(false);
                setSuccess(false);
                toast.success("Property submitted successfully")
            }, 3000);
        } catch (error) {
            console.error("Error adding document: ", error);
            setErrors({ submit: 'Failed to submit form. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-orange-500 mb-2">Create Auction Property Listing</h1>
                    <p className="text-gray-400">Fill in all required details to list your property for auction</p>
                </div>

                {success && (
                    <div className="bg-green-900 text-green-300 p-4 rounded-lg mb-6 flex items-center">
                        <FaInfoCircle className="mr-2 text-xl" />
                        Property listed successfully! Redirecting...
                    </div>
                )}

                {errors.submit && (
                    <div className="bg-red-900 text-red-300 p-4 rounded-lg mb-6 flex items-center">
                        <FaInfoCircle className="mr-2 text-xl" />
                        {errors.submit}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8 bg-gray-800 p-6 rounded-xl shadow-lg">
                    {/* Basic Details Section */}
                    <div className="border-b border-orange-500 pb-6">
                        <h2 className="text-xl font-bold text-orange-400 mb-4 flex items-center">
                            <FaInfoCircle className="mr-2" /> Basic Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-300 mb-2">Listing Title *</label>
                                <input
                                    type="text"
                                    maxLength={100}
                                    value={formData.basicDetails.listingTitle}
                                    onChange={(e) => handleChange('basicDetails', 'listingTitle', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="Modern 3BHK Apartment in Prime Location"
                                />
                                {errors.listingTitle && <p className="text-red-400 text-sm mt-1">{errors.listingTitle}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Property Type *</label>
                                <select
                                    value={formData.basicDetails.propertyType}
                                    onChange={(e) => handleChange('basicDetails', 'propertyType', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                >
                                    <option value="">Select Property Type</option>
                                    {propertyTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                {errors.propertyType && <p className="text-red-400 text-sm mt-1">{errors.propertyType}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Listing Status</label>
                                <select
                                    value={formData.basicDetails.listingStatus}
                                    onChange={(e) => handleChange('basicDetails', 'listingStatus', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                >
                                    <option value="">Select Status</option>
                                    {listingStatuses.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Property Details Section */}
                    <div className="border-b border-orange-500 pb-6">
                        <h2 className="text-xl font-bold text-orange-400 mb-4">Property Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-300 mb-2">Built-up Area (sq ft) *</label>
                                <input
                                    type="number"
                                    value={formData.propertyDetails.builtUpArea}
                                    onChange={(e) => handleChange('propertyDetails', 'builtUpArea', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="e.g. 1200"
                                />
                                {errors.builtUpArea && <p className="text-red-400 text-sm mt-1">{errors.builtUpArea}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Carpet Area (sq ft)</label>
                                <input
                                    type="number"
                                    value={formData.propertyDetails.carpetArea}
                                    onChange={(e) => handleChange('propertyDetails', 'carpetArea', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="e.g. 1000"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Bedrooms *</label>
                                <select
                                    value={formData.propertyDetails.bedrooms}
                                    onChange={(e) => handleChange('propertyDetails', 'bedrooms', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                >
                                    <option value="">Select Bedrooms</option>
                                    {bedrooms.map(num => (
                                        <option key={num} value={num}>{num} {num === 1 ? 'Bedroom' : 'Bedrooms'}</option>
                                    ))}
                                </select>
                                {errors.bedrooms && <p className="text-red-400 text-sm mt-1">{errors.bedrooms}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Bathrooms</label>
                                <select
                                    value={formData.propertyDetails.bathrooms}
                                    onChange={(e) => handleChange('propertyDetails', 'bathrooms', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                >
                                    <option value="">Select Bathrooms</option>
                                    {bathrooms.map(num => (
                                        <option key={num} value={num}>{num} {num === 1 ? 'Bathroom' : 'Bathrooms'}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Furnishing Status</label>
                                <select
                                    value={formData.propertyDetails.furnishingStatus}
                                    onChange={(e) => handleChange('propertyDetails', 'furnishingStatus', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                >
                                    <option value="">Select Furnishing</option>
                                    {furnishingStatuses.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Auction Details Section */}
                    <div className="border-b border-orange-500 pb-6">
                        <h2 className="text-xl font-bold text-orange-400 mb-4 flex items-center">
                            <FaCalendarAlt className="mr-2" /> Auction Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-300 mb-2">Starting Bid Price (₹) *</label>
                                <input
                                    type="number"
                                    value={formData.auctionDetails.startingBidPrice}
                                    onChange={(e) => handleChange('auctionDetails', 'startingBidPrice', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="e.g. 5000000"
                                />
                                {errors.startingBidPrice && <p className="text-red-400 text-sm mt-1">{errors.startingBidPrice}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Reserve Price (₹)</label>
                                <input
                                    type="number"
                                    value={formData.auctionDetails.reservePrice}
                                    onChange={(e) => handleChange('auctionDetails', 'reservePrice', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="e.g. 5500000"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Bid Increment (₹)</label>
                                <input
                                    type="number"
                                    value={formData.auctionDetails.bidIncrement}
                                    onChange={(e) => handleChange('auctionDetails', 'bidIncrement', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="e.g. 10000"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Auction Start Date *</label>
                                <input
                                    type="date"
                                    value={formData.auctionDetails.auctionStartDate}
                                    onChange={(e) => handleChange('auctionDetails', 'auctionStartDate', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                                {errors.auctionStartDate && <p className="text-red-400 text-sm mt-1">{errors.auctionStartDate}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Auction End Date</label>
                                <input
                                    type="date"
                                    value={formData.auctionDetails.auctionEndDate}
                                    onChange={(e) => handleChange('auctionDetails', 'auctionEndDate', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Location Details Section */}
                    <div className="border-b border-orange-500 pb-6">
                        <h2 className="text-xl font-bold text-orange-400 mb-4 flex items-center">
                            <FaMapMarkerAlt className="mr-2" /> Location Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-300 mb-2">City *</label>
                                <input
                                    type="text"
                                    value={formData.locationDetails.city}
                                    onChange={(e) => handleChange('locationDetails', 'city', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="e.g. Mumbai"
                                />
                                {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Locality</label>
                                <input
                                    type="text"
                                    value={formData.locationDetails.locality}
                                    onChange={(e) => handleChange('locationDetails', 'locality', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="e.g. Bandra West"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">PIN Code *</label>
                                <input
                                    type="number"
                                    maxLength={6}
                                    value={formData.locationDetails.pinCode}
                                    onChange={(e) => handleChange('locationDetails', 'pinCode', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="e.g. 400050"
                                />
                                {errors.pinCode && <p className="text-red-400 text-sm mt-1">{errors.pinCode}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Owner/Seller Information Section */}
                    <div className="border-b border-orange-500 pb-6">
                        <h2 className="text-xl font-bold text-orange-400 mb-4">Owner/Seller Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-300 mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    value={formData.ownerInfo.fullName}
                                    onChange={(e) => handleChange('ownerInfo', 'fullName', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="e.g. Raj Sharma"
                                />
                                {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Contact Number *</label>
                                <input
                                    type="tel"
                                    maxLength={10}
                                    value={formData.ownerInfo.contactNumber}
                                    onChange={(e) => handleChange('ownerInfo', 'contactNumber', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="e.g. 9876543210"
                                />
                                {errors.contactNumber && <p className="text-red-400 text-sm mt-1">{errors.contactNumber}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Email *</label>
                                <input
                                    type="email"
                                    value={formData.ownerInfo.email}
                                    onChange={(e) => handleChange('ownerInfo', 'email', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="e.g. owner@example.com"
                                />
                                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Media Uploads Section */}
                    <div className="border-b border-orange-500 pb-6">
                        <h2 className="text-xl font-bold text-orange-400 mb-4">Media Uploads</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-gray-300 mb-2">
                                    Property Images * (Min 3 required)
                                </label>
                                <div className="flex flex-wrap gap-4 mb-4">
                                    {files.images.map((url, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={url}
                                                alt={`Property ${index + 1}`}
                                                className="w-24 h-24 object-cover rounded-lg border border-gray-600"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeFile('images', index)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center">
                                    <label className="flex-1">
                                        <div className="flex items-center justify-center px-6 py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                                            <div className="text-center">
                                                <FaUpload className="mx-auto text-orange-500 text-2xl mb-2" />
                                                <p className="text-gray-400">
                                                    {files.images.length > 0
                                                        ? `Add more images (${files.images.length}/5)`
                                                        : 'Click to upload property images'}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">JPG, PNG (Max 5 images)</p>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={(e) => handleFileChange(e, 'images')}
                                                className="sr-only"
                                                disabled={files.images.length >= 5 || loading}
                                            />
                                        </div>
                                    </label>
                                </div>
                                {errors.images && <p className="text-red-400 text-sm mt-2">{errors.images}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Video Tour Link</label>
                                <input
                                    type="url"
                                    value={formData.mediaUploads.videoTourLink}
                                    onChange={(e) => handleChange('mediaUploads', 'videoTourLink', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="e.g. https://youtube.com/your-video"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Documents Upload (PDFs)</label>
                                <div className="flex flex-wrap gap-4 mb-4">
                                    {files.documents.map((url, index) => (
                                        <div key={index} className="relative group">
                                            <div className="w-24 h-24 bg-gray-700 rounded-lg border border-gray-600 flex items-center justify-center">
                                                <span className="text-orange-500 font-bold">PDF</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFile('documents', index)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center">
                                    <label className="flex-1">
                                        <div className="flex items-center justify-center px-6 py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                                            <div className="text-center">
                                                <FaUpload className="mx-auto text-orange-500 text-2xl mb-2" />
                                                <p className="text-gray-400">
                                                    {files.documents.length > 0
                                                        ? `Add more documents (${files.documents.length} uploaded)`
                                                        : 'Click to upload documents'}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">PDF format only</p>
                                            </div>
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                multiple
                                                onChange={(e) => handleFileChange(e, 'documents')}
                                                className="sr-only"
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Legal & Documentation Section */}
                    <div className="border-b border-orange-500 pb-6">
                        <h2 className="text-xl font-bold text-orange-400 mb-4">Legal & Documentation</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-300 mb-2">Ownership Type *</label>
                                <select
                                    value={formData.legalDetails.ownershipType}
                                    onChange={(e) => handleChange('legalDetails', 'ownershipType', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                >
                                    <option value="">Select Ownership Type</option>
                                    {ownershipTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                {errors.ownershipType && <p className="text-red-400 text-sm mt-1">{errors.ownershipType}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Legal Disputes (if any)</label>
                                <select
                                    value={formData.legalDetails.legalDisputes}
                                    onChange={(e) => handleChange('legalDetails', 'legalDisputes', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                >
                                    <option value="">Select Status</option>
                                    {legalDisputes.map(dispute => (
                                        <option key={dispute} value={dispute}>{dispute}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Encumbrance Certificate Provided?</label>
                                <select
                                    value={formData.legalDetails.encumbranceCertificate}
                                    onChange={(e) => handleChange('legalDetails', 'encumbranceCertificate', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                >
                                    <option value="">Select Option</option>
                                    {encumbranceOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Additional Notes Section */}
                    <div className="pb-6">
                        <h2 className="text-xl font-bold text-orange-400 mb-4">Additional Notes</h2>
                        <textarea
                            value={formData.additionalNotes}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                additionalNotes: e.target.value
                            }))}
                            rows={4}
                            className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Special conditions, disclosures, or any other relevant information..."
                        />
                    </div>

                    {/* Declaration Section */}
                    <div className="mt-8">
                        <div className="flex items-start">
                            <div className="flex items-center h-5 mt-1">
                                <input
                                    id="declaration"
                                    type="checkbox"
                                    checked={declaration}
                                    onChange={(e) => setDeclaration(e.target.checked)}
                                    className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-600 focus:ring-2"
                                    required
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="declaration" className="font-medium text-gray-300">
                                    I confirm all information provided is accurate *
                                </label>
                                <p className="text-gray-500">
                                    By checking this box, you declare that all details entered are correct to the best of your knowledge.
                                </p>
                                {errors.declaration && <p className="text-red-400 text-sm mt-1">{errors.declaration}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-6 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                'List Property for Auction'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuctionPropertyForm;