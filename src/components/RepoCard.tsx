import { FaCodeBranch, FaStar } from "react-icons/fa";
import { Repo } from "../interfaces/IRepository";

interface RepoCardProps {
  repo: Repo;
}

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <div className="p-4 border-b border-gray-200">
      <h2 className="text-sm font-medium text-gray-900">
        {repo.language ? `${repo.language} / ` : ""}
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-semibold hover:underline"
        >
          {repo.name}
        </a>
      </h2>
      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
        {repo.description || "Sem descrição disponível"}
      </p>
      <div className="flex items-center gap-4 mt-2 text-gray-700">
        <span className="flex items-center gap-1">
          <FaStar className="text-xs text-yellow-500" />
          {repo.stargazers_count.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <FaCodeBranch className="text-xs text-gray-500" />
          {repo.forks_count.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
