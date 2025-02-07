import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import profile from "./profile.png"
const API_URL = "http://localhost:3000/api";

const getUserProfile = async () => {
  return await axios.get(`${API_URL}/users/Profile`, { withCredentials: true });
};

const logout = async () => {
  try {
    await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
    Swal.fire({
      title: "Logged out!",
      text: "You have been logged out successfully.",
      icon: "success",
      confirmButtonText: "OK"
    }).then(() => {
      window.location.href = "/login";
    });
  } catch (error) {
    Swal.fire("Error", "Logout failed!", "error");
  }
};

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.data);
      } catch (error) {
        Swal.fire("Error", "You haven't logged in yet", "error");
        window.location.href = "/login";
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <div className="text-center mt-20 text-gray-500">go login</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen bg-white text-gray-900"
    >
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -100 }} 
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-1/4 bg-white p-6 shadow-xl rounded-r-lg"
      >
        <div className="text-center">
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src={profile}
            alt="Profile"
            className="mx-auto rounded-full border-4 border-gray-200 p-2 shadow-md"
          />
          <h2 className="text-xl font-semibold mt-3">{user.firstname} {user.lastname}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
        <div className="mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md shadow-lg"
          >
            Logout
          </motion.button>
        </div>
      </motion.div>

      {/* Profile Info */}
      <motion.div 
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-3/4 p-10"
      >
        <h1 className="text-3xl font-bold mb-4">Account Info</h1>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 shadow-lg rounded-lg border border-gray-200"
        >
          <p className="text-lg"><strong>Firstname:</strong> {user.firstname}</p>
          <p className="text-lg"><strong>Lastname:</strong> {user.lastname}</p>
          <p className="text-lg"><strong>Email Address:</strong> {user.email}</p>
          <p className="text-lg"><strong>Role:</strong> {user.role}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;
