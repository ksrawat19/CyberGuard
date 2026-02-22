import React from "react";
import { FiAlignJustify, FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";

const Navbar = (props) => {
  const { onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = React.useState(false);

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-2xl bg-white/5 p-3 backdrop-blur-xl border border-white/10 mx-2 mb-4">
      
      <div className="ml-2">
        <div className="h-6 w-full pt-1">
          <a className="text-sm font-normal text-gray-400 hover:underline" href=" ">
            Pages <span className="mx-1 text-white">/</span> {brandText}
          </a>
        </div>
        <p className="text-[28px] capitalize font-bold text-white tracking-tight">
          {brandText}
        </p>
      </div>

      <div className="flex h-12 items-center gap-3 rounded-full bg-[#0a0b14]/60 px-4 py-2 border border-white/5 shadow-2xl backdrop-blur-md">
        
        <div className="flex h-full items-center rounded-full bg-white/5 px-3 py-1 text-white transition-all focus-within:border-[#78B3E2] border border-transparent">
          <FiSearch className="h-4 w-4 text-[#78B3E2]" />
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 bg-transparent text-sm font-medium text-white outline-none placeholder:text-gray-500 w-32 md:w-48"
          />
        </div>

        <div className="h-4 w-[1px] bg-white/10" />

        {/* Dark Mode Toggle */}
        <button
          className="flex items-center justify-center p-2 rounded-full transition-colors hover:bg-white/10"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove("dark");
              setDarkmode(false);
            } else {
              document.body.classList.add("dark");
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-5 w-5 text-[#78B3E2]" />
          ) : (
            <RiMoonFill className="h-5 w-5 text-gray-400" />
          )}
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="flex cursor-pointer p-2 rounded-full hover:bg-white/10 xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5 text-white" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;