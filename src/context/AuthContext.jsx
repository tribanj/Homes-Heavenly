import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged,} from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  // 🔁 Check for logged-in user on app start
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe; // Cleanup on unmount
  }, []);

  // 🔐 Login using Firebase
  const login = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      console.log('✅ Logged in user:', res.user);
      setShowLoginModal(false);

      if (redirectPath) {
        navigate(redirectPath);
        setRedirectPath(null);
      } else {
        navigate('/user-dashboard'); // You can later update this based on user role
      }

      return { success: true, message: 'Logged in successfully' };
    } catch (error) {
      console.error('❌ Login error:', error.message);
      return { success: false, message: error.message };
    }
  };

  // 🚪 Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    console.log('✅ Logged out');
    navigate('/');
  };

  // 🆔 Extract role from custom claims or user metadata later (not covered here)
  const userRole = user?.role || null;

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
