import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', age: '', gender: '', 
    height: '', weight: '', goal: 'Weight Loss', activityLevel: 'Sedentary'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5002/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center py-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-8 rounded-2xl w-full max-w-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">Create an Account</h2>
        {error && <div className="bg-red-500/20 border border-red-500 text-red-500 p-3 rounded mb-4 text-center">{error}</div>}
        
        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input type="text" name="name" className="input-field" onChange={handleChange} required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" name="email" className="input-field" onChange={handleChange} required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" name="password" className="input-field" onChange={handleChange} required />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input type="number" name="age" className="input-field" onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select name="gender" className="input-field" onChange={handleChange} required>
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Height (cm)</label>
            <input type="number" name="height" className="input-field" onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Weight (kg)</label>
            <input type="number" name="weight" className="input-field" onChange={handleChange} required />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Goal</label>
            <select name="goal" className="input-field" onChange={handleChange}>
              <option value="Weight Loss">Weight Loss</option>
              <option value="Weight Gain">Weight Gain</option>
              <option value="Maintain">Maintain</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Activity Level</label>
            <select name="activityLevel" className="input-field" onChange={handleChange}>
              <option value="Sedentary">Sedentary</option>
              <option value="Lightly Active">Lightly Active</option>
              <option value="Moderately Active">Moderately Active</option>
              <option value="Very Active">Very Active</option>
            </select>
          </div>

          <div className="md:col-span-2 mt-4">
            <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors shadow-lg shadow-blue-500/30">
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
        </p>
      </motion.div>

      <style>{`
        .input-field {
          width: 100%;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          background-color: var(--card);
          border: 1px solid var(--border);
          outline: none;
        }
        .dark .input-field {
          background-color: #1f2937;
          border-color: #374151;
        }
        .input-field:focus {
          ring: 2px;
          ring-color: #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default Register;
