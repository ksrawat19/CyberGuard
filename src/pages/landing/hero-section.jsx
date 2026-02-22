import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import TiltedImage from "components/landing/tilt-image";

import { Link } from "react-router-dom";

export default function HeroSection() {
    return (
        <section className="flex flex-col items-center -mt-18">
            <motion.svg 
                className="absolute top-0 left-0 -z-10 w-full h-[820px] pointer-events-none" 
                xmlns="http://www.w3.org/2000/svg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <defs>
                    <radialGradient id="primary-pulse" cx="50%" cy="0%" r="70%">
                        <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.4" />
                        <stop offset="40%" stopColor="#0EA5E9" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
                    </radialGradient>

                    <radialGradient id="secondary-pulse" cx="20%" cy="-10%" r="60%">
                        <stop offset="0%" stopColor="#9333EA" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#9333EA" stopOpacity="0" />
                    </radialGradient>
                </defs>
                
                <motion.rect 
                    x="0" y="0" width="100%" height="100%" 
                    fill="url(#secondary-pulse)"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }} 
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />

                <motion.rect 
                    x="0" y="0" width="100%" height="100%" 
                    fill="url(#primary-pulse)"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: [0.5, 0.8, 0.5] }} 
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.svg>
            <motion.a className="flex items-center mt-48 gap-2 border border-slate-600 text-gray-50 rounded-full px-4 py-2"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
                <div className="size-2.5 bg-green-500 rounded-full animate-pulse"></div>
                <span>See What We’re Building</span>
            </motion.a>
            <motion.h1 className="text-center text-5xl leading-[68px] md:text-6xl md:leading-[70px] mt-4 font-semibold max-w-2xl"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
            >
                Let's break and build security
            </motion.h1>
            <motion.p className="text-center text-base max-w-lg mt-2"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
                Our platform helps you simulate, test, and defend faster — so you can focus on staying secure.
            </motion.p>
            <motion.div className="flex items-center gap-4 mt-8"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
                <Link to="/dashboard/home">
                    <button className="flex items-center gap-2 bg-[#78b3e2] hover:bg-[#5da0d3] text-[#333333] font-semibold transition-all active:scale-95 rounded-lg px-7 h-11">
                        Get started
                        <ArrowRight className="size-5" />
                    </button>
                </Link>

                <button className="border border-slate-400 active:scale-95 hover:bg-white/10 transition rounded-lg px-8 h-11">
                    Learn More
                </button>
            </motion.div>
            <TiltedImage />
        </section>
    );
}