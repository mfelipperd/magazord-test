import { FaBook, FaStar } from "react-icons/fa";

interface TabsProps {
  activeTab: "repositories" | "starred";
  setActiveTab: (tab: "repositories" | "starred") => void;
  repoCount: number;
  starredCount: number;
}

export default function Tabs({
  activeTab,
  setActiveTab,
  repoCount,
  starredCount,
}: TabsProps) {
  return (
    <div className="flex justify-center items-center border-b">
      <div className="flex space-x-8">
        {/* Aba de Repositórios */}
        <button
          className="relative flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-500 transition-all hover:text-black"
          onClick={() => setActiveTab("repositories")}
        >
          <FaBook className="text-lg" />
          Repositories
          <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
            {repoCount}
          </span>
          {activeTab === "repositories" && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-400"></div>
          )}
        </button>

        {/* Aba de Starred */}
        <button
          className="relative flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-500 transition-all hover:text-black"
          onClick={() => setActiveTab("starred")}
        >
          <FaStar className="text-lg" />
          Starred
          <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
            {starredCount}
          </span>
          {activeTab === "starred" && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-400"></div>
          )}
        </button>
      </div>
    </div>
  );
}
