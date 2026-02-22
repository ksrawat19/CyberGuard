import React from "react";
import { IoShieldCheckmarkOutline, IoCodeWorkingOutline } from "react-icons/io5";
import Card from "components/card";

const Banner = () => {
  return (
    <Card extra={"items-center w-full h-full p-6 !bg-[#202127] border border-white/5"}>
      <div
        className="relative flex h-32 w-full justify-center rounded-xl overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, #0a0b14 0%, #1a1b26 100%)` 
        }}
      >
        <div className="absolute top-0 left-1/4 h-full w-1/2 bg-[#78B3E2] opacity-5 blur-[100px]" />
        
        <div className="absolute bottom-4 flex -space-x-3">
          {["K", "R", "V"].map((letter, i) => (
            <div 
              key={i}
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#78B3E2]/30 bg-[#202127] text-[#78B3E2] shadow-xl transition-transform hover:scale-110 hover:border-[#78B3E2] cursor-default"
            >
              <span className="text-sm font-black">{letter}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center text-center">
        <h4 className="text-xl font-black tracking-tight text-white uppercase">
          Our <span className="text-[#78B3E2]">Workspace</span>
        </h4>
        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
          Developed by <span className="text-gray-200">Khem</span> • <span className="text-gray-200">Rishav</span> • <span className="text-gray-200">Vansh</span>
        </p>
      </div>

      <div className="my-6 h-[1px] w-12 bg-gradient-to-r from-transparent via-[#78B3E2]/40 to-transparent" />

      <div className="flex w-full justify-around px-2">
        <div className="flex flex-col items-center">
          <IoShieldCheckmarkOutline className="mb-1 text-[#78B3E2] opacity-70 h-5 w-5" />
          <p className="text-lg font-bold text-white">3+</p>
          <p className="text-[9px] font-black uppercase text-gray-600 tracking-wider">Tools</p>
        </div>
        <div className="flex flex-col items-center">
          <IoCodeWorkingOutline className="mb-1 text-[#78B3E2] opacity-70 h-5 w-5" />
          <p className="text-lg font-bold text-white">2026</p>
          <p className="text-[9px] font-black uppercase text-gray-600 tracking-wider">Build</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="mb-3 mt-2 h-1 w-6 rounded-full bg-[#78B3E2]/20">
             <div className="h-full w-4 bg-[#78B3E2] rounded-full" />
          </div>
          <p className="text-lg font-bold text-white">100%</p>
          <p className="text-[9px] font-black uppercase text-gray-600 tracking-wider">Secure</p>
        </div>
      </div>
    </Card>
  );
};

export default Banner;