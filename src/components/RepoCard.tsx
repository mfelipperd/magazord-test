import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Repo } from "../interfaces/IRepository";
import { Icon } from "@iconify/react/dist/iconify.js";

interface RepoCardProps {
  repo: Repo;
  starred: boolean;
}

export default function RepoCard({ repo, starred }: RepoCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/repository/${repo.owner.login}/${repo.name}`);
  };

  const name = repo.full_name.split("/");

  return (
    <div
      className="p-4 pl-0 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition"
      onClick={handleClick}
    >
      <div className="flex gap-1 text-lg  text-gray-900 capitalize">
        <p className="font-light">{`${name[0]}  `}</p>
        <p className="text-xl font-normal">/</p>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-custom-blue-100 font-semibold hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {name[1]}
        </a>
      </div>
      <p className="text-sm text-custom-gray-300 mt-1 leading-relaxed">
        {repo.description || "Sem descrição disponível"}
      </p>
      <div className="flex items-center justify-between mt-2 text-gray-700 w-[140px] min-w-fit gap-8 capitalize">
        {!starred ? (
          <span className="flex items-center gap-2  text-sm w-[70px]  font-normal">
            <FaStar className="text-base" />
            {repo.stargazers_count.toLocaleString()}
          </span>
        ) : (
          repo.language && (
            <p className="flex items-center gap-1 text-sm font-normal w-[70px]">
              {repo.language}
            </p>
          )
        )}
        <span className="flex items-center gap-2  text-sm w-[70px] ">
          <Icon
            icon="fluent:branch-fork-32-regular"
            className="h-5 w-5 stroke-2"
          />
          {repo.forks_count.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
