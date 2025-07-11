import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { db } from '../../firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const roleLimits = {
  user: 2,
  agent: 5,
  builder: 10,
  realestate: 10,
};

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // Save additional data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email,
        role,
        adLimit: roleLimits[role],
        createdAt: new Date(),
      });

      alert('User registered successfully!');
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Create Your Account</h2>

        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border px-4 py-2 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border px-4 py-2 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Select Role</label>
            <select
              className="w-full border px-4 py-2 rounded-md"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">Normal User</option>
              <option value="agent">Agent</option>
              <option value="builder">Builder</option>
              <option value="realestate">Real Estate Company</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
