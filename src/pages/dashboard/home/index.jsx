import React from "react";
import Banner from "./components/Banner";
import ToolCards from "components/card/ToolCards";

const Home = () => {
  return (
    <div className="mt-3 h-full grid-cols-1 gap-5">
      <div className="col-span-1 h-fit w-full">
        <Banner />

        <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            Dashboard Overview
          </h4>
          <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
            <li>
              <a className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white" href=" ">
                General
              </a>
            </li>
            <li>
              <a className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white" href=" ">
                Favorites
              </a>
            </li>
          </ul>
        </div>

        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          <ToolCards
            title="Phising Demonstration"
            author="Khem Singh Rawat"
          />
          <ToolCards
            title="Password Analyser"
            author="Rishav Pathania"
          />
          <ToolCards
            title="Encryption Demonstration"
            author="Vansh Gill"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;