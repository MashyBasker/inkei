import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { BackgroundBeams } from '../ui/background-beams';
import Navbar from '../ui/navbar';

// Decode JWT payload from localStorage
const decodeJWT = (token) => {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (err) {
    return null;
  }
};

const DashboardLayout = ({ children, title, description }) => {
  const [userName, setUserName] = useState('Guest');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const decoded = decodeJWT(token);
    if (decoded?.name) {
      setUserName(decoded.name);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      <Navbar />

      <div className="pt-20">
        {/* Header Section with gradient background */}
        <section className="relative py-12 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-600 mb-2">
                {title}
              </h1>
              {description && (
                <p className="text-slate-300 max-w-3xl mx-auto mb-2">
                  {description}
                </p>
              )}
              <p className="text-white text-5xl font-bold">
                👋 Welcome!
              </p>
            </div>
          </div>
          <BackgroundBeams />
        </section>

        {/* Main Content */}
        <div className="flex-grow">{children}</div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
