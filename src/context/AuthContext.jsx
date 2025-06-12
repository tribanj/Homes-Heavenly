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
        switch (role) {
          case 'Normal User':
            navigate('/dashboard/user');
            break;
          case 'Agent':
            navigate('/dashboard/agent');
            break;
          case 'Builder':
            navigate('/dashboard/builder');
            break;
          case 'Real Estate Company':
            navigate('/dashboard/company');
            break;
          case 'Admin':
            navigate('/dashboard/admin');
            break;
          default:
            navigate('/');
        }
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
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName || '',
          email: user.email,
          role: 'Normal User',
        });
      }

      setUser(user);
      setUserRole('Normal User');
      navigate('/dashboard/user');
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
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName || '',
          email: user.email,
          role: 'Normal User',
        });
      }

      setUser(user);
      setUserRole('Normal User');
      navigate('/dashboard/user');
    } catch (error) {
      console.error('❌ Facebook Sign-In Error:', error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUserRole(null);
    console.log('✅ Logged out');
    navigate('/');
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
