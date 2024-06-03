
import React, { useState } from 'react';
import '../../css/app.css';

import asset2 from '../../../public/Assets/Asset2.svg';
import asset1 from '../../../public/Assets/Asset1.svg';
import DonationCard from './DonationCard'

const ProjekTerbaru = () => {
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

    <div className="w-full hijau py-16">
      <div className="container mx-auto">
        <div className="mb-8">
          <h2 className="text-white text-5xl font-extrabold font-['Plus Jakarta Sans'] leading-10">
            Projek Terbaru Minggu Ini
          </h2>
        </div>
        <div className="scrollable-container">
      <div className="scrollable-content">
        {/* Render multiple DonationCard components */}
        <DonationCard />
        <DonationCard />
        <DonationCard />
        <DonationCard />
        {/* Add more DonationCard components as needed */}
      </div>
    </div>
      </div>
    </div>



  );
};

export default ProjekTerbaru;
