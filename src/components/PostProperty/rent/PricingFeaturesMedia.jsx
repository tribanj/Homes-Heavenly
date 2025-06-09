import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../../firebase/firebaseConfig";
import { v4 as uuidv4 } from "uuid";

const PricingFeaturesMedia = ({ formData, setFormData, onBack, onNext }) => {
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFeatureToggle = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      features: { ...formData.features, [name]: checked },
    });
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    const uploaded = [];

    for (const file of files) {
      const storageRef = ref(storage, `propertyMedia/${uuidv4()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      uploaded.push({ url: downloadURL, name: storageRef.name });
    }

    setFormData({
      ...formData,
      media: [...(formData.media || []), ...uploaded],
    });

    setUploading(false);
  };

  const handleImageDelete = async (fileName) => {
    const fileRef = ref(storage, `propertyMedia/${fileName}`);
    try {
      await deleteObject(fileRef);
      setFormData({
        ...formData,
        media: formData.media.filter((file) => file.name !== fileName),
      });
    } catch (error) {
      console.error("Error deleting file: ", error);
      alert("Failed to delete file.");
    }
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">💰 Pricing, Features & Media</h3>

      <div className="mb-3">
        <label className="form-label">Monthly Rent *</label>
        <input
          type="number"
          className="form-control"
          name="rent"
          value={formData.rent || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Security Deposit</label>
        <input
          type="number"
          className="form-control"
          name="deposit"
          value={formData.deposit || ""}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Maintenance Charges</label>
        <input
          type="number"
          className="form-control"
          name="maintenance"
          value={formData.maintenance || ""}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Property Description</label>
        <textarea
          className="form-control"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          rows="4"
          placeholder="Describe your property, locality, amenities, etc."
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Property Features</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="parking"
            checked={formData.features?.parking || false}
            onChange={handleFeatureToggle}
          />
          <label className="form-check-label">Parking</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="lift"
            checked={formData.features?.lift || false}
            onChange={handleFeatureToggle}
          />
          <label className="form-check-label">Lift</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="furnished"
            checked={formData.features?.furnished || false}
            onChange={handleFeatureToggle}
          />
          <label className="form-check-label">Furnished</label>
        </div>
      </div>

      {/* Media Upload */}
      <div className="mb-3">
        <label className="form-label">Upload Images / Videos</label>
        <input
          type="file"
          className="form-control"
          accept="image/*,video/*"
          multiple
          onChange={handleFileUpload}
        />
        {uploading && <p className="text-warning mt-2">Uploading...</p>}
        <div className="d-flex flex-wrap mt-3 gap-2">
          {formData.media?.map((file, idx) => (
            <div key={idx} className="position-relative">
              {file.url.includes("video") ? (
                <video width="150" height="100" controls>
                  <source src={file.url} />
                </video>
              ) : (
                <img src={file.url} alt="preview" width={150} height={100} />
              )}
              <button
                type="button"
                className="btn btn-sm btn-danger position-absolute top-0 end-0"
                onClick={() => handleImageDelete(file.name)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-secondary" onClick={onBack}>
          ⬅ Back
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default PricingFeaturesMedia;
