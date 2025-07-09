import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const LOCAL_STORAGE_KEY = "property_form_draft";

const initialFormData = {
  listingType: "",
  propertyType: "",
  title: "",
  description: "",
  state: "",
  city: "",
  locality: "",
  pinCode: "",
  bedrooms: "",
  bathrooms: "",
  balconies: "",
  furnishing: "",
  builtupArea: "",
  carpetArea: "",
  totalFloors: "",
  floorNo: "",
  propertyAge: "",
  price: "",
  negotiable: "",
  maintenanceCharges: "",
  amenities: [],
  facing: "",
  ownership: "",
  photos: [],
  videos: [],
  name: "",
  email: "",
  phone: "",
  termsAccepted: false,
};

const PostPropertyPage = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox" && name === "termsAccepted") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "checkbox") {
      const updatedAmenities = checked
        ? [...formData.amenities, value]
        : formData.amenities.filter((item) => item !== value);
      setFormData({ ...formData, amenities: updatedAmenities });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("Please accept Terms & Conditions");
      return;
    }

    const uploadedImages = [];
    for (const file of formData.photos) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "your_upload_preset");
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`,
        data
      );
      uploadedImages.push(res.data.secure_url);
    }

    await addDoc(collection(db, `property_for_sale/${user.uid}/listings`), {
      ...formData,
      photos: uploadedImages,
      timestamp: new Date(),
    });

    localStorage.removeItem(LOCAL_STORAGE_KEY);
    alert("Property submitted successfully");
    setFormData(initialFormData);
  };

  const inputClass =
    "w-full border border-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-6">Post Property</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Basic Info */}
        <div>
          <label className={labelClass}>Listing Type *</label>
          <select
            name="listingType"
            value={formData.listingType}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select</option>
            <option>Sale</option>
            <option>Rent</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Property Type *</label>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select</option>
            <option>Apartment</option>
            <option>House</option>
            <option>Villa</option>
            <option>Plot</option>
            <option>Commercial</option>
          </select>
        </div>

        <div className="col-span-full">
          <label className={labelClass}>Title *</label>
          <input
            name="title"
            maxLength={100}
            value={formData.title}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="col-span-full">
          <label className={labelClass}>Description *</label>
          <textarea
            name="description"
            maxLength={1000}
            value={formData.description}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Location */}
        <div>
          <label className={labelClass}>State *</label>
          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>City *</label>
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Locality *</label>
          <input
            name="locality"
            value={formData.locality}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Pin Code *</label>
          <input
            name="pinCode"
            type="number"
            value={formData.pinCode}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Property Details */}
        <div>
          <label className={labelClass}>Bedrooms *</label>
          <select
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className={inputClass}
          >
            {[1, 2, 3, 4, "5+"].map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Bathrooms *</label>
          <select
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            className={inputClass}
          >
            {[1, 2, 3, 4, "5+"].map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Balconies *</label>
          <select
            name="balconies"
            value={formData.balconies}
            onChange={handleChange}
            className={inputClass}
          >
            {[1, 2, 3, 4, "5+"].map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Furnishing *</label>
          <select
            name="furnishing"
            value={formData.furnishing}
            onChange={handleChange}
            className={inputClass}
          >
            {["Furnished","Semi Furnished", "Not furnished"].map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Built-up Area (sq ft) *</label>
          <input
            type="number"
            name="builtupArea"
            value={formData.builtupArea}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Carpet Area (sq ft)</label>
          <input
            type="number"
            name="carpetArea"
            value={formData.carpetArea}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Total Floors</label>
          <input
            type="number"
            name="totalFloors"
            value={formData.totalFloors}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Floor No.</label>
          <input
            type="number"
            name="floorNo"
            value={formData.floorNo}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Property Age</label>
          <select
            name="propertyAge"
            value={formData.propertyAge}
            onChange={handleChange}
            className={inputClass}
          >
            {["New", "<1 Year", "1-3 Years", "3-5 Years", "5+ Years"].map(
              (opt) => (
                <option key={opt}>{opt}</option>
              )
            )}
          </select>
        </div>

        <div>
          <label className={labelClass}>Price (INR) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Negotiable</label>
          <select
            name="negotiable"
            value={formData.negotiable}
            onChange={handleChange}
            className={inputClass}
          >
            {["Yes", "No"].map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Maintenance Charges</label>
          <input
            type="number"
            name="maintenanceCharges"
            value={formData.maintenanceCharges}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Amenities</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              "Parking",
              "Lift",
              "Gym",
              "Swimming Pool",
              "Park",
              "Power Backup",
            ].map((opt) => (
              <label key={opt} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="amenities"
                  value={opt}
                  checked={formData.amenities.includes(opt)}
                  onChange={(e) => {
                    const value = e.target.value;
                    const updated = formData.amenities.includes(value)
                      ? formData.amenities.filter((item) => item !== value)
                      : [...formData.amenities, value];
                    setFormData((prev) => ({ ...prev, amenities: updated }));
                  }}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>Facing</label>
          <select
            name="facing"
            value={formData.facing}
            onChange={handleChange}
            className={inputClass}
          >
            {["East", "West", "North", "South"].map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Ownership *</label>
          <select
            name="ownership"
            value={formData.ownership}
            onChange={handleChange}
            className={inputClass}
          >
            {["Freehold", "Leasehold", "Co-operative Society"].map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Repeat for other fields... */}

        {/* Media */}
        <div>
          <label className={labelClass}>Photos *</label>
          <input
            type="file"
            name="photos"
            multiple
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Videos</label>
          <input
            type="file"
            name="videos"
            multiple
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Contact */}
        <div>
          <label className={labelClass}>Name *</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Phone *</label>
          <input
            name="phone"
            type="number"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="col-span-full flex items-center">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm">Accept Terms & Conditions *</label>
        </div>

        <div className="col-span-full">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostPropertyPage;
