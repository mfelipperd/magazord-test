import { useState } from "react";
import { FaBook, FaStar } from "react-icons/fa";

interface TabsProps {
  setActiveTab: React.Dispatch<
    React.SetStateAction<"repositories" | "starred">
  >;
  activeTab: "repositories" | "starred";
  repoCount: number;
  starredCount: number;
}

export default function Tabs({
  setActiveTab,
  activeTab,
  repoCount,
  starredCount,
}: TabsProps) {
  const [indicatorStyle, setIndicatorStyle] = useState(
    activeTab === "repositories" ? "translate-x-0" : "translate-x-full",
  );

  const handleTabClick = (tab: "repositories" | "starred") => {
    setActiveTab(tab);
    setIndicatorStyle(
      tab === "repositories" ? "translate-x-0" : "translate-x-full",
    );
  };

  return (
    <div className="relative flex space-x-6 pb-2 max-w-[25rem] mb-12 ">
      <div
        className={`absolute bottom-0 left-0 w-1/2 h-[2px] bg-red-500 transition-transform duration-500 ease-in-out ${indicatorStyle}`}
      ></div>

      <button
        className={`flex-1 relative flex justify-center items-center gap-3 pb-2 cursor-pointer ${
          activeTab === "repositories"
            ? "text-black font-semibold"
            : "text-gray-400"
        }`}
        onClick={() => handleTabClick("repositories")}
      >
        <FaBook className="text-lg" />
        <span>Repositories</span>
        <span className="text-sm bg-neutral-100 text-gray-500 w-[40px] border border-gray-300 py-0.5 rounded-full">
          {repoCount}
        </span>
      </button>

      <button
        className={`flex-1 relative flex justify-center items-center gap-3 pb-2 cursor-pointer ${
          activeTab === "starred" ? "text-black font-semibold" : "text-gray-400"
        }`}
        onClick={() => handleTabClick("starred")}
      >
        <FaStar className="text-lg" />
        <span>Starred</span>
        <span className="text-sm bg-neutral-100 text-gray-500 w-[40px] border border-gray-300 py-0.5 rounded-full">
          {starredCount}
        </span>
      </button>
    </div>
  );
}
