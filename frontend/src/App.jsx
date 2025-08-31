import { useContext, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import { AuthProvider, AuthContext } from './components/AuthContext'
import { toaster } from './components/ui/toaster'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'

function Logout() {
  const { setIsAuthenticated } = useContext(AuthContext);
  localStorage.clear();

  setIsAuthenticated(false);

  toaster.create({
    title: "Logged Out",
    description: "You have been logged out successfully.",
    type: "info",
    closable: true,
    duration: 5000,
  });
  
  return <Navigate to="/login" />;
}

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
