import { FaStar, FaCodeBranch, FaExternalLinkAlt } from "react-icons/fa";

interface RepoCardProps {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
}

export default function RepoCard({
  name,
  description,
  url,
  stars,
  forks,
}: RepoCardProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm mb-4">
      <h2 className="text-lg font-semibold mb-2">{name}</h2>
      <p className="text-gray-600 text-sm mb-2">
        {description || "Sem descrição"}
      </p>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <FaStar /> {stars}
        </span>
        <span className="flex items-center gap-1">
          <FaCodeBranch /> {forks}
        </span>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 flex items-center gap-1 mt-2"
      >
        Ver no GitHub <FaExternalLinkAlt />
      </a>
    </div>
  );
}
