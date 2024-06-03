import React, { useState } from 'react';
import '../../css/app.css';

import Logo from '../../../public/Assets/Logo.svg';
import Asset from '../../../public/Assets/Home.svg';
import Asset1 from '../../../public/Assets/Forbes.svg';
import Asset2 from '../../../public/Assets/Kompas.svg';
import Asset3 from '../../../public/Assets/Rcti.svg';

const Hero = () => {
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
    <div className="w-full h-auto relative hijau px-4 py-8 md:px-12 md:py-16">
  <div className="flex flex-col md:flex-row items-center justify-between">
    <div className="flex flex-col justify-start items-start gap-8 mb-8 md:mb-0 md:w-1/2">
      <div className="flex flex-col justify-center items-start gap-4">
        <h1 className="text-white text-4xl md:text-5xl font-bold font-['Geist']">
          Melangkah menuju masa depan yang lebih hijau,{' '}
          <span className="font-normal">mulai dari transaksi bisnis anda</span>
        </h1>
      </div>
      <div className="text-white text-xl md:text-2xl font-normal font-['Geist']">
        Tumbuh Together adalah cara termudah untuk berkontribusi terhadap proyek pengijauan tanpa memberatkan bisnis
        anda. Ikuti kami sekarang, untuk masa depan yang lebih hijau
      </div>
      <div className="flex justify-center items-center gap-4">
        <button className="px-6 py-3 bg-white rounded-3xl text-neutral-600 text-lg font-bold font-['Geist'] flex items-center gap-2">
          <span>Bergabung Sekarang</span>
          <svg className="w-6 h-6" />
        </button>
      </div>
    </div>
    <div className="md:w-1/2">
      <img className="w-full h-auto" src={Asset} alt="Placeholder" />
    </div>
  </div>
  <div className="mt-8 md:mt-16 flex flex-col md:flex-row items-center justify-start gap-4 md:gap-8">
    <div className="text-white text-sm font-semibold font-['Plus Jakarta Sans'] leading-snug">Seperti Yang Dilihat Di</div>
    <img className="w-24 h-6" src={Asset1}alt="Placeholder" />
    <img className="w-36 h-6" src={Asset2} alt="Placeholder" />
    <img className="w-24 h-7" src={Asset3} alt="Placeholder" />
  </div>
</div>
  );
};

export default Hero;
