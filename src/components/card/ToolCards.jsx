import { IoHeart, IoHeartOutline, IoSettingsOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import { useState } from "react";
import Card from "components/card";

const ToolsCard = ({ title, price, extra }) => {
  const [heart, setHeart] = useState(true);

  return (
    <Card
      extra={`flex flex-col w-full h-full p-5 border border-white/5 ${extra}`}
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-[#78B3E2]">
            <IoShieldCheckmarkOutline className="h-6 w-6" />
          </div>
          <button
            onClick={() => setHeart(!heart)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white/5 hover:text-[#78B3E2]"
          >
            {heart ? <IoHeartOutline className="h-5 w-5" /> : <IoHeart className="h-5 w-5 text-[#78B3E2]" />}
          </button>
        </div>

        <div className="mt-6">
          <p className="text-xl font-bold tracking-tight text-white">
            {title}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">
              Active System
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 rounded-xl bg-black/20 p-3 border border-white/5">
          <div>
            <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Latency</p>
            <p className="text-sm font-bold text-white">19ms</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Uptime</p>
            <p className="text-sm font-bold text-[#78B3E2]">99.9%</p>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-6">
          <div>
            <p className="text-[10px] font-bold uppercase text-gray-500">Usage Fee</p>
            <p className="text-lg font-bold text-white">
              {price} <span className="text-xs font-medium text-[#78B3E2]">Free</span>
            </p>
          </div>
          
          <button className="flex items-center gap-2 rounded-lg bg-[#78B3E2] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#111c44] transition-all hover:bg-[#90c6f0] hover:shadow-[0_0_15px_rgba(120,179,226,0.3)]">
            Launch
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ToolsCard;