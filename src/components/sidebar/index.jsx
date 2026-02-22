import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import routes from "routes.jsx";

const Sidebar = ({ open, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed !z-50 flex min-h-full w-72 flex-col border-r border-white/5 
        /* SET BACKGROUND TO #1a1a1a FOR MOBILE */
        bg-[#1a1a1a] xl:bg-transparent 
        backdrop-blur-xl transition-all duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} xl:translate-x-0`}
      >
        <button
          className="absolute top-6 right-6 cursor-pointer text-gray-500 hover:text-white xl:hidden p-2"
          onClick={onClose}
        >
          <HiX className="h-6 w-6" />
        </button>

        {/* Logo Section */}
        <div className="mt-10 flex w-full items-center justify-center px-4">
          <div className="font-poppins text-xl font-black tracking-tight text-white text-center">
            CYBER <span className="font-light text-[#78B3E2] drop-shadow-[0_0_10px_rgba(120,179,226,0.3)]">GUARD</span>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="mt-8 mb-6 h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="mb-auto px-4 overflow-y-auto scrollbar-hide">
          <ul className="space-y-2 pt-1">
            <Links routes={routes} />
          </ul>
        </div>

        <div className="p-4">
          <div className="rounded-xl bg-white/[0.03] p-4 text-center border border-white/5">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
              System Secure
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;