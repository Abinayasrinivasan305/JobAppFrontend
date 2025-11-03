import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./componentds/Navbar";
import Create from "./componentds/Create";
import Edit from "./componentds/Edit";
import Contact from "./componentds/Contact";
import Login from "./componentds/auth/Login";
import Register from "./componentds/auth/Register";
import UserDashboard from "./componentds/dashboards/UserDashboard";
import AdminDashboard from "./componentds/dashboards/AdminDashboard";
import SuperAdminDashboard from "./componentds/dashboards/SuperAdminDashboard";
import Search from './componentds/Search';
import ProtectedRoute from './componentds/auth/ProctectedRoute';
import { FavoritesProvider } from "./context/FavoritesContext";

export default function App() {
  return (
    <FavoritesProvider>
      {/* Only one Navbar at the top */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/create" element={<ProtectedRoute roles={["ADMIN","SUPER_ADMIN"]}><Create/></ProtectedRoute>} />
        <Route path="/edit" element={<ProtectedRoute roles={["ADMIN","SUPER_ADMIN"]}><Edit/></ProtectedRoute>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard/user" element={<ProtectedRoute roles={["USER","ADMIN","SUPER_ADMIN"]}><UserDashboard/></ProtectedRoute>} />
        <Route path="/dashboard/admin" element={<ProtectedRoute roles={["ADMIN"]}><AdminDashboard/></ProtectedRoute>} />
        <Route path="/dashboard/superadmin" element={<ProtectedRoute roles={["SUPER_ADMIN"]}><SuperAdminDashboard/></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </FavoritesProvider>
  )
}
