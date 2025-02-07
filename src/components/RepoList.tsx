import { FaStar, FaCodeBranch } from "react-icons/fa";

interface RepoListProps {
  repositories: {
    id: number;
    name: string;
    description: string;
    language?: string;
    stars: number;
    forks: number;
    url: string;
  }[];
}

export default function RepoList({ repositories }: RepoListProps) {
  return (
    <div className="p-4">
      {repositories.map((repo) => (
        <div key={repo.id} className="border-b pb-4 mb-4">
          <h2 className="text-blue-500 font-semibold">
            <a href={repo.url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </h2>
          <p className="text-gray-600 text-sm">
            {repo.description || "Sem descrição disponível"}
          </p>
          {repo.language && (
            <p className="text-sm text-gray-500 mt-1">{repo.language}</p>
          )}
          <div className="flex gap-4 text-sm text-gray-500 mt-2">
            <span className="flex items-center gap-1">
              <FaStar /> {repo.stars}
            </span>
            <span className="flex items-center gap-1">
              <FaCodeBranch /> {repo.forks}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
