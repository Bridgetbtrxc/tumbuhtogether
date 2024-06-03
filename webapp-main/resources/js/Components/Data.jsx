import React from 'react';
import '../../css/app.css';
import asset2 from '../../../public/Assets/Asset2.svg';
import asset1 from '../../../public/Assets/Asset1.svg';
import Data1 from '../../../public/Assets/Data.svg';
import Filantropi from '../../../public/Assets/Filantropi.svg';

const Data = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-neutral-600 text-2xl font-normal font-geist mb-4">
          Tumbuh bersama, dampak besar
        </div>
        <div className="text-neutral-800 text-4xl md:text-5xl font-bold font-geist mb-8">
          Level Darurat Untuk Pendanaan <br></br>Proyek Hijau Masih Terjadi
        </div>
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 md:pr-8">
            <div className="text-zinc-500 text-xl md:text-2xl font-normal font-geist mb-8">
              <p>
                Ada beberapa alasan mengapa orang malas menyumbang untuk proyek hijau, antara lain:
              </p>
              <p className="font-bold mt-4">Prioritas lain:</p>
              <p>
                Orang mungkin memiliki prioritas lain yang lebih penting untuk mereka, seperti kebutuhan sehari-hari atau tabungan untuk masa depan.
              </p>
              <p className="font-bold mt-4">Kurangnya kemudahan:</p>
              <p>
                Menyumbang untuk proyek hijau mungkin tidak mudah atau nyaman bagi semua orang.
              </p>
            </div>
            <div className="text-neutral-600 text-xs font-normal font-geist flex items-center mt-8">
              <span className="mr-2">Dilansir dari</span>
              <img className="w-24 h-9" src={Filantropi} alt={Filantropi} />
            </div>
          </div>
          <div className="md:w-1/2">
            <img className="w-full h-auto mb-4 md:mb-0" src={Data1} alt="Placeholder" />
            <div className="text-zinc-500 text-xs md:text-2xl font-normal font-geist mb-4">
              Dilansir dari
            </div>
            <img className="w-36 h-12 mb-4" src={asset1} alt="Asset 1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
