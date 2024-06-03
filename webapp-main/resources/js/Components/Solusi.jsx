import React, { useState } from 'react';
import '../../css/app.css';

import asset2 from '../../../public/Assets/Asset2.svg';
import asset1 from '../../../public/Assets/Asset1.svg';

const Solusi = () => {
    // ...

    return (
      <div className="bg-white  py-8 md:py-16 ">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="text-neutral-600 text-2xl font-normal font-['Geist']">Mulai dari sini</h2>
            <h3 className="text-neutral-800 text-5xl font-bold font-['Geist']">
              Pilih solusi yang tepat <br />untuk anda
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-black text-2xl font-bold font-['Geist'] mb-4">Melalui Bisnis</h4>
              <p className="text-zinc-500 text-2xl font-normal font-['Geist']">
                Kami akan menarik biaya 1% dari setiap keuntungan transaksi anda, dibayarkan setiap minggu.
              </p>
              <img className="w-48 h-48 mt-8" src={asset2} alt="Asset 2" />
            </div>
            <div>
              <h4 className="text-black text-2xl font-bold font-['Geist'] mb-4">Melalui Konsumen</h4>
              <p className="text-zinc-500 text-2xl font-normal font-['Geist']">
                Konsumen anda dapat memberikan donasi mereka ke penggalangan dana terpercaya, mudah dan aman.
              </p>
              <img className="w-48 h-48 mt-8" src={asset1} alt="Asset 1" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Solusi
