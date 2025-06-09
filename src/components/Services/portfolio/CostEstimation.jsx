import React, { useState } from 'react';

// Data configuration
const constructionTypes = ['Residential', 'Commercial', 'Industrial'];

const propertySubtypes = {
  Residential: ['Villa', 'Flat', 'Independent House',],
  Commercial: ['Shop', 'Office', 'Showroom', 'Co-working Space'],
  Industrial: ['Warehouse', 'Factory', 'Workshop', 'Cold Storage'],
};

const materialQualities = ['Basic', 'Standard', 'Premium'];

const costPerSqft = {
  Residential: { Basic: 1200, Standard: 1600, Premium: 2000 },
  Commercial: { Basic: 1400, Standard: 1800, Premium: 2200 },
  Industrial: { Basic: 1500, Standard: 1900, Premium: 2400 },
};

const costBreakdown = {
  Bricks: 0.10,
  Cement: 0.15,
  Sand: 0.10,
  Steel: 0.20,
  Tiles: 0.10,
  Aggregate: 0.05,
  Plumbing: 0.10,
  Electrical: 0.05,
  Finishing: 0.05,
  Labor: 0.10,
};

const EstimationCalculator = () => {
  const [formData, setFormData] = useState({
    constructionType: '',
    propertySubtype: '',
    materialQuality: '',
    area: '',
    floors: '',
  });

  const [estimate, setEstimate] = useState(null);
  const [breakdown, setBreakdown] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'constructionType' ? { propertySubtype: '' } : {})
    }));
  };

  const calculate = () => {
    const { constructionType, materialQuality, area, floors } = formData;
    const rate = costPerSqft[constructionType]?.[materialQuality];
    const totalArea = parseFloat(area) * (parseInt(floors) || 1);

    if (!rate || !area || !floors) {
      alert("Please fill all required fields.");
      return;
    }

    const totalCost = totalArea * rate;
    const detailedBreakdown = {};
    for (const item in costBreakdown) {
      detailedBreakdown[item] = Math.round(totalCost * costBreakdown[item]);
    }

    setEstimate(totalCost);
    setBreakdown(detailedBreakdown);
  };

  return (
    <div className="container mt-5 mb-5">
      <h2>🏗️ Advanced Construction Estimation Calculator</h2>
      <p>Get a detailed construction cost with floor-wise and component breakdown.</p>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <label>Construction Type</label>
          <select
            className="form-select"
            name="constructionType"
            onChange={handleChange}
            value={formData.constructionType}
          >
            <option value="">Select</option>
            {constructionTypes.map(type => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>

        {formData.constructionType && (
          <div className="col-md-4">
            <label>Property Subtype</label>
            <select
              className="form-select"
              name="propertySubtype"
              onChange={handleChange}
              value={formData.propertySubtype}
            >
              <option value="">Select</option>
              {propertySubtypes[formData.constructionType].map(subtype => (
                <option key={subtype}>{subtype}</option>
              ))}
            </select>
          </div>
        )}

        <div className="col-md-4">
          <label>Material Quality</label>
          <select
            className="form-select"
            name="materialQuality"
            onChange={handleChange}
            value={formData.materialQuality}
          >
            <option value="">Select</option>
            {materialQualities.map(quality => (
              <option key={quality}>{quality}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label>Total Area per Floor (sq.ft)</label>
          <input
            type="number"
            name="area"
            className="form-control"
            placeholder="e.g., 1200"
            onChange={handleChange}
            value={formData.area}
          />
        </div>

        <div className="col-md-4">
          <label>Number of Floors</label>
          <input
            type="number"
            name="floors"
            className="form-control"
            placeholder="e.g., 2"
            onChange={handleChange}
            value={formData.floors}
          />
        </div>

        <div className="col-12 mt-3">
          <button className="btn btn-success" onClick={calculate}>Estimate Construction Cost</button>
        </div>
      </div>

      {estimate && (
        <div className="mt-4">
          <h4>💰 Total Estimated Cost: ₹ {estimate.toLocaleString()}</h4>
          <h5 className="mt-3">📊 Cost Breakdown by Component</h5>
          <table className="table table-bordered mt-2">
            <thead>
              <tr>
                <th>Component</th>
                <th>Cost (₹)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(breakdown).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>₹{value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-muted">Note: These are estimated values. Actual cost may vary depending on your location and contractor rates.</p>
        </div>
      )}
    </div>
  );
};

export default EstimationCalculator;
