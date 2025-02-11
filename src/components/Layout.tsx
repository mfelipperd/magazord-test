import { Outlet } from "react-router-dom";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useRepoStore } from "../store/useRepoStore";

export default function Layout() {
  const { setGithubUser } = useRepoStore();

  const [searchInput, setSearchInput] = useState(""); // Estado local para controlar input

  const handleSearch = () => {
    if (!searchInput.trim()) return;

    setGithubUser(searchInput); // 🔹 Atualiza username no Zustand
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <header className="w-full bg-gray-900 flex flex-col items-center">
        <div className="w-full max-w-[1200px] px-4 bg-gray-900 text-white py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <img src="/gbLogo.png" alt="GitHub" className="h-6" />
            GitHub <span className="text-gray-400">/ Profile</span>
          </h1>

          <div className="relative flex items-center border-b border-gray-500 py-1 px-3 bg-gray-800 rounded-md w-72">
            <BiSearch
              size={20}
              className="absolute left-3 text-gray-400 cursor-pointer"
              onClick={handleSearch}
            />
            <input
              type="text"
              placeholder="Search GitHub user..."
              className="w-full bg-transparent outline-none text-white pl-8 pr-2"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
        </div>
      </header>

      <main className="w-full max-w-[1200px] px-4 py-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
}
