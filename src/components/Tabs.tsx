import { useState } from "react";
import { BxBookBookmark } from "./icons/BookBookmark";
import { Star } from "akar-icons";

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
        className={`absolute bottom-2 left-0 w-1/2 h-[2px] bg-red-500 transition-transform duration-500 ease-in-out ${indicatorStyle}`}
      ></div>

      <button
        className={`flex-1 relative flex justify-center items-center gap-4 pb-2 cursor-pointer ${
          activeTab === "repositories"
            ? "text-black font-semibold"
            : "text-gray-400"
        }`}
        onClick={() => handleTabClick("repositories")}
      >
        <BxBookBookmark className=" w-6 h-6 " />
        <p className="text-lg font-normal ">Repositories</p>
        <span className="text-sm bg-custom-gray-100 text-custom-gray-300 w-[40px] border border-custom-gray-200 py-0.5 rounded-full">
          {repoCount}
        </span>
      </button>

      <button
        className={`flex-1 relative flex justify-center items-center gap-4 pb-2 cursor-pointer ${
          activeTab === "starred" ? "text-black font-semibold" : "text-gray-400"
        }`}
        onClick={() => handleTabClick("starred")}
      >
        <Star strokeWidth={2} size={24} />
        <p className="text-lg font-normal ">Starred</p>
        <span className="text-sm bg-custom-gray-100 text-custom-gray-300 w-[40px] border border-custom-gray-200 py-0.5 rounded-full">
          {starredCount}
        </span>
      </button>
    </div>
  );
}
