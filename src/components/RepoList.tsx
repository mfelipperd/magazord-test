import { Repo } from "../interfaces/IRepository";
import { useRepoStore } from "../store/useRepoStore";
import RepoCard from "./RepoCard";

interface RepoListProps {
  repositories: Repo[];
  starred: boolean;
}

export default function RepoList({ repositories, starred }: RepoListProps) {
  const { currentPage, setCurrentPage } = useRepoStore();

  const prevPage = () => {
    if (currentPage >= 2) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  console.log(repositories[0]);

  return (
    <div>
      {!repositories ||
      repositories.length === 0 ||
      !Array.isArray(repositories) ? (
        <p className="text-center text-gray-500">
          Nenhum repositório encontrado.
        </p>
      ) : (
        repositories.map((repo) => (
          <RepoCard starred={starred} key={repo.id} repo={repo} />
        ))
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-white cursor-not-allowed hidden"
              : "bg-gray-300 "
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
