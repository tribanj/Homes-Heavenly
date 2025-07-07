// src/context/AuthContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

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
    let isMounted = true;
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!isMounted) return;

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

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const fetchUserRole = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data().role || null : null;
    } catch (error) {
      console.error("Error fetching role:", error);
      return null;
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const role = await fetchUserRole(res.user.uid);

      setUser(res.user);
      setUserRole(role);
      setShowLoginModal(false);

      if (redirectPath) {
        navigate(redirectPath);
        setRedirectPath(null);
      } else {
        navigateBasedOnRole(role);
      }

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      // अगर यूजर पहले से मौजूद नहीं है तो डेटा सेव करें
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          displayName: user.displayName || "",
          email: user.email || "",
          photoURL: user.photoURL || "",
          createdAt: new Date(),
          role: "user", // डिफ़ॉल्ट रोल
        });
      }

      if (!userDoc.exists() || !userDoc.data().role) {
        setPendingUser(user);
        setShowRoleModal(true);
        setShowLoginModal(false); // Close login modal
        return { success: false, message: "Please select your role" };
      } else {
        setShowLoginModal(false);
        const role = userDoc.data().role;
        setUser(user);
        setUserRole(role);
        navigateBasedOnRole(role);
        return { success: true };
      }
    } catch (error) {
      console.error("Social login error:", error);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("email");
    provider.addScope("profile");
    return handleSocialLogin(provider);
  };

  const facebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    return handleSocialLogin(provider);
  };

  const submitRoleAndLicense = async (data) => {
    setLoading(true);
    try {
      let {
        role,
        licenseAuthority,
        licenseNumber,
        licenseName,
        officeAddress,
        proofUrl,
      } = data;
      if (role === "Normal User") role = "user";

      const userData = {
        name: pendingUser.displayName || "",
        email: pendingUser.email,
        role,
        ...(role !== "user" && {
          licenseAuthority,
          licenseNumber,
          licenseName,
          officeAddress,
          proofUrl,
        }),
      };

      await setDoc(doc(db, "users", pendingUser.uid), userData);

      setUser(pendingUser);
      setUserRole(role);
      setPendingUser(null);
      setShowRoleModal(false);
      navigateBasedOnRole(role);

      return { success: true };
    } catch (error) {
      console.error("Error saving role:", error);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setUserRole(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const navigateBasedOnRole = (role) => {
    switch (role) {
      case "user":
        navigate("/user-dashboard");
        break;
      case "agent":
        navigate("/agent-dashboard");
        break;
      case "builder":
        navigate("/builder-dashboard");
        break;
      case "company":
      case "real estate company":
        navigate("/company-dashboard");
        break;
      case "admin":
        navigate("/admin-dashboard");
        break;
      default:
        navigate(user ? "/profile" : "/");
    }
  };

  const handleRoleModalClose = () => {
    setPendingUser(null);
    setShowRoleModal(false);
  };

  const contextValue = useMemo(
    () => ({
      user,
      userRole,
      loading,
      redirectPath,
      showLoginModal,
      showRoleModal,
      login,
      logout,
      googleSignIn,
      facebookSignIn,
      submitRoleAndLicense,
      setRedirectPath,
      setShowLoginModal,
      handleRoleModalClose,
    }),
    [user, userRole, loading, redirectPath, showLoginModal, showRoleModal]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
