import { FaCodeBranch, FaStar } from "react-icons/fa";
import { Repo } from "../interfaces/IRepository";

interface RepoCardProps {
  repo: Repo;
  starred: boolean;
}

export default function RepoCard({ repo, starred }: RepoCardProps) {
  return (
    <div className="p-4 border-b border-gray-200">
      <h2 className="text-lg font-medium text-gray-900">
        {repo.language ? `${repo.language} / ` : ""}
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-500 font-semibold hover:underline"
        >
          {repo.name}
        </a>
      </h2>
      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
        {repo.description || "Sem descrição disponível"}
      </p>
      <div className="flex items-center gap-4 mt-2 text-gray-700">
        {starred ? (
          <span className="flex items-center gap-1">
            <FaStar className="text-xs text-gray-800" />
            {repo.stargazers_count.toLocaleString()}
          </span>
        ) : (
          <p className="flex items-center gap-1 font-medium">{repo.language}</p>
        )}
        <span className="flex items-center gap-1">
          <FaCodeBranch className="text-xs text-gray-500" />
          {repo.forks_count.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
