import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './RoleSelectionModal.css'; // Optional styling

const RoleSelectionModal = () => {
  const { user, setShowRoleModal } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState('');
  const [licenseData, setLicenseData] = useState({
    licenseAuthority: '',
    licenseNumber: '',
    nameOnLicense: '',
    officeAddress: '',
    businessProof: null,
  });

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setLicenseData({ ...licenseData, businessProof: e.target.files[0] });
  };

  const handleSubmit = async () => {
    if (!role) return setError('Please select your role.');

    const isBusinessRole = ['Agent', 'Builder', 'Real Estate Company'].includes(role);

    if (isBusinessRole && (
      !licenseData.licenseAuthority ||
      !licenseData.licenseNumber ||
      !licenseData.nameOnLicense ||
      !licenseData.officeAddress ||
      !licenseData.businessProof
    )) {
      return setError('All license fields are required.');
    }

    try {
      setUploading(true);

      let proofURL = '';

      if (licenseData.businessProof) {
        const storageRef = import('firebase/storage').then(({ getStorage, ref, uploadBytes, getDownloadURL }) => {
          const storage = getStorage();
          const fileRef = ref(storage, `licenseProofs/${user.uid}/${licenseData.businessProof.name}`);
          return uploadBytes(fileRef, licenseData.businessProof)
            .then(() => getDownloadURL(fileRef));
        });

        proofURL = await proofURL;
      }

      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName || '',
        email: user.email,
        role,
        ...(isBusinessRole && {
          licenseAuthority: licenseData.licenseAuthority,
          licenseNumber: licenseData.licenseNumber,
          nameOnLicense: licenseData.nameOnLicense,
          officeAddress: licenseData.officeAddress,
          proofURL,
        }),
      });

      setUploading(false);
      setShowRoleModal(false);

      // Redirect user based on role
      switch (role) {
        case 'Normal User': navigate('/dashboard/user'); break;
        case 'Agent': navigate('/dashboard/agent'); break;
        case 'Builder': navigate('/dashboard/builder'); break;
        case 'Real Estate Company': navigate('/dashboard/company'); break;
        default: navigate('/');
      }

    } catch (err) {
      console.error('Error saving user info:', err);
      setError('Something went wrong. Please try again.');
      setUploading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h4>Select Your Role</h4>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">-- Choose Role --</option>
          <option value="Normal User">Normal User</option>
          <option value="Agent">Agent</option>
          <option value="Builder">Builder</option>
          <option value="Real Estate Company">Real Estate Company</option>
        </select>

        {['Agent', 'Builder', 'Real Estate Company'].includes(role) && (
          <>
            <input
              type="text"
              placeholder="License Authority"
              value={licenseData.licenseAuthority}
              onChange={(e) => setLicenseData({ ...licenseData, licenseAuthority: e.target.value })}
            />
            <input
              type="text"
              placeholder="License Number"
              value={licenseData.licenseNumber}
              onChange={(e) => setLicenseData({ ...licenseData, licenseNumber: e.target.value })}
            />
            <input
              type="text"
              placeholder="Name on License"
              value={licenseData.nameOnLicense}
              onChange={(e) => setLicenseData({ ...licenseData, nameOnLicense: e.target.value })}
            />
            <input
              type="text"
              placeholder="Office Address"
              value={licenseData.officeAddress}
              onChange={(e) => setLicenseData({ ...licenseData, officeAddress: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button onClick={handleSubmit} disabled={uploading}>
          {uploading ? 'Saving...' : 'Submit & Continue'}
        </button>
      </div>
    </div>
  );
};

export default RoleSelectionModal;
