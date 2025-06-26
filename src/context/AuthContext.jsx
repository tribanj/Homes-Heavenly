// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebaseConfig';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const role = await fetchUserRole(currentUser.uid);
        setUserRole(role);
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserRole = async (uid) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return data.role || null;
      }
      return null;
    } catch (error) {
      console.error('Error fetching role:', error.message);
      return null;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const uid = res.user.uid;
      const role = await fetchUserRole(uid);
      setUser(res.user);
      setUserRole(role);
      setShowLoginModal(false);

      console.log('✅ Logged in:', res.user);

      if (redirectPath) {
        navigate(redirectPath);
        setRedirectPath(null);
      } else {
        navigateBasedOnRole(role);
      }

      return { success: true, message: 'Logged in successfully' };
    } catch (error) {
      console.error('❌ Login error:', error.message);
      return { success: false, message: error.message };
    }
  };

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        setPendingUser(user);
        setShowRoleModal(true);
      } else {
        const role = userDoc.data().role;
        setUser(user);
        setUserRole(role);
        navigateBasedOnRole(role);
      }
    } catch (error) {
      console.error('❌ Google Sign-In Error:', error.message);
    }
  };

  const facebookSignIn = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        setPendingUser(user);
        setShowRoleModal(true);
      } else {
        const role = userDoc.data().role;
        setUser(user);
        setUserRole(role);
        navigateBasedOnRole(role);
      }
    } catch (error) {
      console.error('❌ Facebook Sign-In Error:', error.message);
    }
  };

  const submitRoleAndLicense = async (data) => {
    try {
      let {
        role,
        licenseAuthority,
        licenseNumber,
        licenseName,
        officeAddress,
        proofUrl
      } = data;

      const uid = pendingUser.uid;

      // Normalize 'Normal User' to 'user'
      if (role === 'Normal User') role = 'user';

      const userData = {
        name: pendingUser.displayName || '',
        email: pendingUser.email,
        role,
      };

      if (role !== 'user') {
        userData.licenseAuthority = licenseAuthority;
        userData.licenseNumber = licenseNumber;
        userData.licenseName = licenseName;
        userData.officeAddress = officeAddress;
        userData.proofUrl = proofUrl;
      }

      await setDoc(doc(db, 'users', uid), userData);

      setUser(pendingUser);
      setUserRole(role);
      setPendingUser(null);
      setShowRoleModal(false);
      navigateBasedOnRole(role);
    } catch (error) {
      console.error('❌ Error saving role/license:', error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUserRole(null);
    console.log('✅ Logged out');
    navigate('/');
  };

  const navigateBasedOnRole = (role) => {
    switch (role) {
      case 'user':
        navigate('/user-dashboard');
        break;
      case 'agent':
        navigate('/agent-dashboard');
        break;
      case 'builder':
        navigate('/builder-dashboard');
        break;
      case 'company':
      case 'real estate company':
        navigate('/company-dashboard');
        break;
      case 'admin':
        navigate('/admin-dashboard');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        login,
        logout,
        loading,
        redirectPath,
        setRedirectPath,
        showLoginModal,
        setShowLoginModal,
        googleSignIn,
        facebookSignIn,
        showRoleModal,
        setShowRoleModal,
        submitRoleAndLicense,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
