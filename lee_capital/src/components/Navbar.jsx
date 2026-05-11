import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LogIn, LogOut, BarChart3 } from 'lucide-react';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 nav-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <BarChart3 className="h-8 w-8 text-[#3282B8] group-hover:scale-105 transition-transform duration-300" />
            <span className="font-montserrat font-bold text-xl tracking-tight bg-gradient-to-r from-[#002B5B] to-[#3282B8] bg-clip-text text-transparent">
              LEE CAPITAL
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-[#1a2a3a] hover:text-[#3282B8] font-medium transition-colors">Home</Link>
            <Link to="/services" className="text-[#1a2a3a] hover:text-[#3282B8] font-medium transition-colors">Services</Link>
            <Link to="/portfolio" className="text-[#1a2a3a] hover:text-[#3282B8] font-medium transition-colors">Portfolio</Link>
            <Link to="/insights" className="text-[#1a2a3a] hover:text-[#3282B8] font-medium transition-colors">Insights</Link>
            {currentUser ? (
              <>
                <Link to="/dashboard" className="text-[#1a2a3a] hover:text-[#3282B8] font-medium transition-colors">Dashboard</Link>
                <button onClick={handleLogout} className="flex items-center gap-2 btn-outline">
                  <LogOut size={18} /> Sign Out
                </button>
              </>
            ) : (
              <button onClick={() => navigate('/login')} className="flex items-center gap-2 btn-primary py-2 px-4">
                <LogIn size={18} /> Client Portal
              </button>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg bg-white/50">
            {isOpen ? <X className="h-6 w-6 text-[#002B5B]" /> : <Menu className="h-6 w-6 text-[#002B5B]" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden glass-card mx-4 mb-4 p-4 flex flex-col space-y-3">
          <Link to="/" className="px-3 py-2 hover:bg-[#3282B8]/10 rounded-lg" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/services" className="px-3 py-2 hover:bg-[#3282B8]/10 rounded-lg" onClick={() => setIsOpen(false)}>Services</Link>
          <Link to="/portfolio" className="px-3 py-2 hover:bg-[#3282B8]/10 rounded-lg" onClick={() => setIsOpen(false)}>Portfolio</Link>
          <Link to="/insights" className="px-3 py-2 hover:bg-[#3282B8]/10 rounded-lg" onClick={() => setIsOpen(false)}>Insights</Link>
          {currentUser ? (
            <>
              <Link to="/dashboard" className="px-3 py-2 hover:bg-[#3282B8]/10 rounded-lg">Dashboard</Link>
              <button onClick={handleLogout} className="text-left px-3 py-2 text-red-600">Logout</button>
            </>
          ) : (
            <button onClick={() => { navigate('/login'); setIsOpen(false); }} className="btn-primary text-center">Portal Login</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;