const Banner1 = () => {
  return (
    <div className="relative flex w-full flex-col overflow-hidden rounded-2xl bg-[#0a0b14] px-8 py-10 border border-white/5">
      
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(at 0% 0%, hsla(207, 68%, 68%, 1) 0px, transparent 50%),
            radial-gradient(at 100% 100%, #4F46E5 0px, transparent 50%)
          `
        }}
      />

      <div className="relative z-10">
        <h4 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          Monitor & Secure<br />
          <span className="text-[#78B3E2]">Digital Perimeters</span>
        </h4>
        
        <p className="mt-3 mb-8 max-w-md text-sm font-medium text-gray-400">
          Explore the latest exploits and secure your systems against evolving digital threats.
        </p>

        <button className="group relative flex items-center justify-center rounded-lg bg-[#78B3E2] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-[#0a0b14] transition-all hover:bg-[#90c6f0] hover:shadow-[0_0_15px_rgba(120,179,226,0.4)]">
          Discover Now
        </button>
      </div>

      {/* Subtle corner accent */}
      <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-[#78B3E2] opacity-10 blur-3xl" />
    </div>
  );
};

export default Banner1;