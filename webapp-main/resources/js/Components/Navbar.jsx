import React, { useState } from 'react';
import '../../css/app.css';
import Logo from '../../../public/Assets/Logo.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isDropdownOpen) setIsDropdownOpen(false); // Close dropdown if menu is toggled
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-full px-4 md:pd-3 py-7 bg-[#446747] justify-between items-center flex flex-col md:flex-row md:px-20 relative">
      <div className="flex items-center justify-between w-full md:w-auto">
        <img className="w-36 h-14" src={Logo} alt="Company Logo" />
        <button className="md:hidden text-white focus:outline-none" onClick={toggleMenu}>
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z" />
            ) : (
              <path fillRule="evenodd" clipRule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
            )}
          </svg>
        </button>
      </div>
      <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:pl-5 md:flex flex-col md:flex-row md:items-center md:justify-end md:space-x-8 w-full md:w-auto bg-neutral-600 md:bg-transparent absolute md:static top-full left-0 right-0 pd-2 md:mt-0 py-4 md:py-0 z-10`}>
        <a href="#" className="text-white text-sm font-semibold hover:text-gray-200 mb-4 md:mb-0">Beranda</a>
        <a href="#" className="text-white text-sm font-semibold hover:text-gray-200 mb-4 md:mb-0">Tentang Kami</a>
        <a href="#" className="text-white text-sm font-semibold hover:text-gray-200 mb-4 md:mb-0">Daftar Bisnis</a>
        <div className="relative mb-4 md:mb-0">
          <button onClick={toggleDropdown} className="text-white text-sm font-semibold hover:text-gray-200 flex items-center space-x-1">
            <span>Resources</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-md shadow-lg z-20">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Event</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Blog</a>
            </div>
          )}
        </div>
        <a href="#" className="text-white text-sm font-semibold hover:text-gray-200 mb-4 md:mb-0">Kontak</a>
        <div className="mt-4 md:mt-0">
          <a href="#" className="inline-block h-12 px-4 py-3 rounded-3xl border border-white text-white text-base font-bold hover:bg-white hover:text-neutral-600">Sign Up / Login</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
