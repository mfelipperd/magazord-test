import { FaCodeBranch, FaStar } from "react-icons/fa";
import { Repo } from "../interfaces/IRepository";

interface RepoCardProps {
  repo: Repo;
}

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <div className="p-4 border-b border-[var(--gray-200)]">
      {/* Nome e Linguagem */}
      <h2 className="text-sm font-medium text-[var(--gray-300)]">
        {repo.language ? `${repo.language} / ` : ""}
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--blue-500)] font-semibold hover:underline"
        >
          {repo.name}
        </a>
      </h2>

      {/* Descrição */}
      <p className="text-xs text-[var(--gray-300)] mt-1 leading-relaxed">
        {repo.description || "Sem descrição disponível"}
      </p>

      {/* Estrelas e Forks */}
      <div className="flex items-center gap-4 mt-2 text-[var(--gray-300)]">
        <span className="flex items-center gap-1">
          <FaStar className="text-xs text-[var(--blue-100)]" />
          {repo.stargazers_count.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <FaCodeBranch className="text-xs text-[var(--blue-100)]" />
          {repo.forks_count.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
