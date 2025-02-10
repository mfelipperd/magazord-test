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
  return (
    <div className=" flex space-x-6 pb-2 transition-all duration-700 ease-in-out">
      {/* Aba de Repositórios */}
      <button
        className={`flex-1 relative flex justify-center items-center gap-3 pb-2 cursor-pointer ${
          activeTab === "repositories"
            ? "text-black font-semibold"
            : "text-gray-400"
        }`}
        onClick={() => setActiveTab("repositories")}
      >
        <FaBook className="text-lg" />
        <span>Repositories</span>
        <span className="text-sm bg-neutral-100 text-grayCustom-300 w-[40px] border border-gray-300 py-0.5 rounded-full">
          {repoCount}
        </span>
        {activeTab === "repositories" && (
          <div className="absolute left-0 bottom-0 w-full h-[2px] bg-red-400"></div>
        )}
      </button>

      {/* Aba de Favoritos */}
      <button
        className={`flex-1 justify-center relative flex items-center gap-3 pb-2 cursor-pointer ${
          activeTab === "starred" ? "text-black font-semibold" : "text-gray-400"
        }`}
        onClick={() => setActiveTab("starred")}
      >
        <FaStar className="text-lg" />
        <span>Starred</span>
        <span className="text-sm bg-neutral-100 text-grayCustom-300 w-[40px] border border-gray-300 py-0.5 rounded-full">
          {starredCount}
        </span>
        {activeTab === "starred" && (
          <div className="absolute left-0 bottom-0 w-full h-[2px] bg-red-400"></div>
        )}
      </button>
    </div>
  );
}
