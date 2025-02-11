import { useParams, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaCodeBranch,
  FaExclamationCircle,
  FaArrowLeft,
} from "react-icons/fa";
import {
  useRepositoryDetails,
  useRepositoryIssues,
} from "../../services/githubApi";
import { IIssue } from "../../interfaces/IRepository";

export default function RepositoryDetails() {
  const { owner, repoName } = useParams();
  const navigate = useNavigate();
  const { repoDetails, isLoading, error } = useRepositoryDetails(
    owner!,
    repoName!,
  );
  const { issues } = useRepositoryIssues(owner!, repoName!);

  if (isLoading)
    return <p className="text-center text-gray-500">Carregando...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        Erro ao carregar o repositório.
      </p>
    );

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-black flex items-center gap-2"
        >
          <FaArrowLeft />
          <span>Voltar</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-md mt-4">
        <div className="flex items-center gap-4">
          <img
            src={`https://github.com/${owner}.png`}
            alt={repoDetails.full_name}
            className="w-14 h-14 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {repoDetails.full_name}
            </h1>
            <p className="text-gray-600">
              {repoDetails.description || "Sem descrição disponível"}
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-4 text-gray-700 text-lg font-semibold">
          <div className="flex flex-col items-center">
            <FaStar className="text-yellow-500" />
            <span>{repoDetails.stargazers_count.toLocaleString()} Stars</span>
          </div>
          <div className="flex flex-col items-center">
            <FaCodeBranch className="text-gray-500" />
            <span>{repoDetails.forks_count.toLocaleString()} Forks</span>
          </div>
          <div className="flex flex-col items-center">
            <FaExclamationCircle className="text-red-500" />
            <span>{issues.length} Issues abertas</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-6">
        {issues.length === 0 ? (
          <p className="text-center text-gray-500">Nenhuma issue aberta.</p>
        ) : (
          issues.slice(0, 5).map((issue: IIssue) => (
            <div
              key={issue.id}
              className="bg-white p-4  rounded-md mt-4 cursor-pointer hover:bg-gray-50 hover:translate-x-1.5 transition-all duration-300"
              onClick={() => window.open(issue.html_url, "_blank")}
            >
              <h2 className="text-md font-semibold text-gray-800">
                {issue.title}
              </h2>
              <p className="text-gray-500 text-sm mt-1">{issue.user.login}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
