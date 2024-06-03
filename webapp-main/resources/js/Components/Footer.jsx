import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-8 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="text-[#446747] text-lg font-semibold mb-4 hover:text-[#344e35] transition duration-300">Reach us</div>
          <div className="flex items-center mb-4">
            <FaPhone className="w-4 h-4 mr-4 text-[#446747]" />
            <div className="text-[#446747] text-base font-normal hover:text-[#344e35] transition duration-300">+1012 3456 789</div>
          </div>
          <div className="flex items-center mb-4">
            <FaEnvelope className="w-4 h-4 mr-4 text-[#446747]" />
            <div className="text-[#446747] text-base font-normal hover:text-[#344e35] transition duration-300">demo@gmail.com</div>
          </div>
          <div className="flex items-start">
            <FaMapMarkerAlt className="w-6 h-6 mr-4 text-[#446747]" />
            <div className="text-[#446747] text-base font-normal hover:text-[#344e35] transition duration-300">
              132 Dartmouth Street Boston, Massachusetts 02156 United States
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="text-[#446747] text-lg font-semibold mb-4 hover:text-[#344e35] transition duration-300">Company</div>
            <div className="text-[#446747] text-base font-normal mb-2 hover:text-[#344e35] transition duration-300">About</div>
            <div className="text-[#446747] text-base font-normal mb-2 hover:text-[#344e35] transition duration-300">Contact</div>
            <div className="text-[#446747] text-base font-normal hover:text-[#344e35] transition duration-300">Blogs</div>
          </div>
          <div>
            <div className="text-[#446747] text-lg font-semibold mb-4 hover:text-[#344e35] transition duration-300">Legal</div>
            <div className="text-[#446747] text-base font-normal mb-2 hover:text-[#344e35] transition duration-300">Privacy Policy</div>
            <div className="text-[#446747] text-base font-normal mb-2 hover:text-[#344e35] transition duration-300">Terms & Services</div>
            <div className="text-[#446747] text-base font-normal mb-2 hover:text-[#344e35] transition duration-300">Terms of Use</div>
            <div className="text-[#446747] text-base font-normal hover:text-[#344e35] transition duration-300">Refund Policy</div>
          </div>
        </div>
        <div>
          <div className="text-[#446747] text-lg font-semibold mb-4 hover:text-[#344e35] transition duration-300">Quick Links</div>
          <div className="text-[#446747] text-base font-normal mb-2 hover:text-[#344e35] transition duration-300">Home</div>
          <div className="text-[#446747] text-base font-normal hover:text-[#344e35] transition duration-300">Project Gallery</div>
        </div>
        <div className="bg-[#446747] rounded-lg p-6">
          <div className="text-white text-lg font-semibold mb-4">Join Our Newsletter</div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full bg-white rounded px-4 py-2 text-[#446747] text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#344e35]"
            />
          </div>
          <button className="bg-white text-[#446747] text-sm font-bold px-4 py-2 rounded hover:bg-[#344e35] hover:text-white transition duration-300">
            Subscribe
          </button>
          <div className="text-white text-xs font-medium mt-4 opacity-75">
            * Will send you weekly updates for every new project
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
