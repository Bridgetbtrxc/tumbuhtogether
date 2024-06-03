import React from 'react';

const DonationCard = ({ imageUrl, organizationType, isVerified, title, description, currentDonation, targetDonation }) => {
  const progressPercentage = (currentDonation / targetDonation) * 100;

  return (
    <div className="w-full sm:w-80 md:h-40 md:w-80 lg:w-96 h-auto bg-white rounded-3xl shadow p-6 mb-8 ">
      <img className="w-full h-48 sm:h-48 md:h-48 lg:h-56 rounded-3xl mb-6 object-cover" src={imageUrl} alt="Donation" />
      <div className="flex items-center mb-4">
        <div className="px-2.5 py-1.5 bg-green-200 rounded-md mr-2">
          <div className="text-green-800 text-sm font-medium font-['Inter'] leading-normal">{organizationType}</div>
        </div>
        {isVerified && (
          <div className="px-2.5 py-1.5 bg-green-100 rounded-md">
            <div className="text-green-800 text-sm font-medium font-['Inter'] leading-normal">Verified</div>
          </div>
        )}
      </div>
      <div className="text-gray-900 text-xl sm:text-xl md:text-xl lg:text-2xl font-semibold font-['Plus Jakarta Sans'] mb-2">{title}</div>
      <div className="text-gray-600 text-sm sm:text-sm md:text-sm lg:text-base font-normal font-['Inter'] mb-4">{description}</div>
      <div className="flex justify-between mb-4">
        <div>
          <span className="text-gray-600 text-xs sm:text-xs md:text-xs lg:text-sm font-normal font-['Inter']">Tercapai</span>
          <span className="text-yellow-500 text-xs sm:text-xs md:text-xs lg:text-sm font-bold font-['Inter']"> {currentDonation}Juta</span>
        </div>
        <div>
          <span className="text-gray-600 text-xs sm:text-xs md:text-xs lg:text-sm font-normal font-['Inter']">Tujuan</span>
          <span className="text-gray-800 text-xs sm:text-xs md:text-xs lg:text-sm font-bold font-['Inter']"> {targetDonation}Juta</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
        <div className="bg-gray-800 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
      </div>
      <div className="text-gray-600 text-xs sm:text-xs md:text-xs lg:text-sm font-normal font-['Inter'] mb-6">{progressPercentage}%</div>
      <button className="w-full bg-green-600 text-white px-4 py-3 rounded-xl font-bold font-['Inter'] text-sm sm:text-sm md:text-sm lg:text-base">
        Donasi
      </button>
    </div>
  );
};

export default DonationCard;
