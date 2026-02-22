import React from "react";
import { IoCodeWorkingOutline, IoServerOutline, IoLayersOutline } from "react-icons/io5";
import Card from "components/card";

const Project = () => {
  const projectData = [
    {
      id: 1,
      title: "Phising Demonstration",
      subtitle: "Simulated Attack",
      icon: <IoLayersOutline className="h-6 w-6" />,
      link: "#",
    },
    {
      id: 2,
      title: "Password Analyser",
      subtitle: "Security Tool",
      icon: <IoServerOutline className="h-6 w-6" />,
      link: "#",
    },
    {
      id: 3,
      title: "Encryption Demonstration",
      subtitle: "Data Protection",
      icon: <IoCodeWorkingOutline className="h-6 w-6" />,
      link: "#",
    },
  ];

  return (
    <Card extra={"w-full p-6 h-full !bg-[#202127] border border-white/5 shadow-none"}>
      <div className="mb-8 w-full">
        <h4 className="text-xl font-black uppercase tracking-tight text-white">
          Active <span className="text-[#78B3E2]">Projects</span>
        </h4>
        <p className="mt-1 text-xs font-medium text-gray-500 uppercase tracking-widest">
          Managing {projectData.length} secure cybersecurity projects
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {projectData.map((project) => (
          <div
            key={project.id}
            className="group flex w-full items-center justify-between rounded-xl bg-white/5 p-4 border border-transparent transition-all duration-300 hover:border-[#78B3E2]/30 hover:bg-white/[0.08]"
          >
            <div className="flex items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#0a0b14] text-[#78B3E2] border border-white/5 group-hover:shadow-[0_0_15px_rgba(120,179,226,0.2)] transition-all">
                {project.icon}
              </div>

              <div className="ml-4">
                <p className="text-base font-bold text-white tracking-tight">
                  {project.title}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                    {project.subtitle}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-gray-700"></span>
                  <a
                    className="text-[10px] font-bold text-[#78B3E2] hover:underline uppercase tracking-tighter"
                    href={project.link}
                  >
                    View Logs
                  </a>
                </div>
              </div>
            </div>

            <button className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-all hover:bg-[#78B3E2]/10 hover:text-[#78B3E2]">
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Project;