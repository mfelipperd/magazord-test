import { Repo } from "../interfaces/IRepository";
import RepoCard from "./RepoCard";

interface RepoListProps {
  repositories: Repo[];
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  starred: boolean;
}

export default function RepoList({
  repositories,
  currentPage,
  nextPage,
  prevPage,
  starred,
}: RepoListProps) {
  return (
    <div>
      {repositories.length === 0 ? (
        <p className="text-center text-gray-500">
          Nenhum repositório encontrado.
        </p>
      ) : (
        repositories.map((repo) => (
          <RepoCard starred={starred} key={repo.id} repo={repo} />
        ))
      )}

      {/* Paginação */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blueCustom-500 text-white"
          }`}
        >
          Anterior
        </button>
        <span className="text-gray-700">Página {currentPage}</span>
        <button onClick={nextPage} className="px-4 py-2 bg-gray-300  rounded">
          Próxima
        </button>
      </div>
    </div>
  );
}
