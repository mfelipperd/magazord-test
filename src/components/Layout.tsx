import { Outlet } from "react-router-dom";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useRepoStore } from "../store/useRepoStore";

export default function Layout() {
  const { setUserNameStore } = useRepoStore();

  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    if (!searchInput.trim()) return;

    setUserNameStore(searchInput);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const handleFocus = (param: boolean) => {
    setIsExpanded(param);
    console.log(searchInput);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white font-roboto">
      <header
        className={"w-full bg-custom-gray-950 flex flex-col items-center "}
      >
        <div className="w-full max-w-[1345px] px-4 bg-custom-gray-950 h-[72px] text-white py-3 flex items-center justify-between ">
          <div
            className={` flex items-center gap-4  transition-all duration-700  ease-in-out overflow-hidden ${isExpanded ? " h-0 w-0" : "h-6"}`}
          >
            <img src="/gbLogo.png" alt="GitHub" className="h-[30px]" />{" "}
            <span className="text-2xl font-normal">/</span>
            <p className="text-white text-base font-light"> Profile</p>
          </div>

          <div
            onClick={() => setIsExpanded(true)}
            className={`relative transition-all duration-700 flex items-center border-b border-gray-500  bg-custom-gray-950 rounded-md ${
              isExpanded
                ? "w-full fixed top-0 left-0 right-0  px-5 z-50"
                : "w-10 sm:w-72"
            }`}
          >
            <input
              type="text"
              placeholder="Search GitHub user..."
              className="w-full  outline-none bg-transparent text-white pl-8 pr-2 z-20"
              value={searchInput}
              onFocus={() => handleFocus(true)}
              onBlur={() => handleFocus(false)}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                  console.log("Pesquisar:", searchInput);
                }
              }}
            />
            <BiSearch
              size={20}
              className="absolute left-3 text-gray-400 cursor-pointer z-10"
              onClick={() => setIsExpanded(true)}
            />
          </div>
        </div>
      </header>

      <main className="w-full max-w-[1320px] px-4 p-10 bg-white">
        <Outlet />
      </main>
    </div>
  );
}
