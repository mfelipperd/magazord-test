/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  FaCodeBranch,
  FaStar,
  FaEye,
  FaLink,
  FaBug,
  FaComments,
} from "react-icons/fa";
import {
  useRepositoryDetails,
  useRepositoryIssues,
} from "../../services/githubApi";
import { IssueComments } from "../../components/IssueComments";

export default function RepositoryDetails() {
  const { owner, repoName } = useParams();

  const { repoDetails, error, isLoading } = useRepositoryDetails(
    owner!,
    repoName!,
  );
  const { issues } = useRepositoryIssues(owner!, repoName!);
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null);

  if (isLoading)
    return <p className="text-center text-gray-500">Carregando...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        Erro ao carregar o repositório.
      </p>
    );
  if (!repoDetails)
    return <p className="text-center text-gray-500">Nenhum dado encontrado.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-900">
        {repoDetails.full_name}
      </h1>
      <p className="text-gray-600 mt-2">
        {repoDetails.description || "Sem descrição disponível"}
      </p>

      <div className="flex items-center gap-6 mt-4 text-gray-700">
        <span className="flex items-center gap-2">
          <FaStar className="text-yellow-500" /> {repoDetails.stargazers_count}
        </span>
        <span className="flex items-center gap-2">
          <FaCodeBranch className="text-gray-500" /> {repoDetails.forks_count}
        </span>
        <span className="flex items-center gap-2">
          <FaEye className="text-gray-500" /> {repoDetails.watchers_count}
        </span>
      </div>

      <div className="mt-6">
        <a
          href={repoDetails.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-500 hover:underline"
        >
          <FaLink /> Acessar no GitHub
        </a>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-900">Issues Abertas</h2>
        <ul className="mt-2 text-gray-700">
          {issues.length === 0 ? (
            <p className="text-gray-500">Nenhuma issue encontrada.</p>
          ) : (
            issues.slice(0, 5).map((issue: any) => (
              <li
                key={issue.id}
                className="py-2 flex flex-col border-b border-gray-200"
              >
                <div className="flex items-center gap-2">
                  <FaBug className="text-red-500" />
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {issue.title}
                  </a>
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                  <img
                    src={issue.user.avatar_url}
                    alt={issue.user.login}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{issue.user.login}</span>
                  <span>({issue.comments} comentários)</span>
                  <button
                    className="ml-auto text-xs text-blue-500 hover:underline flex items-center"
                    onClick={() => setSelectedIssue(issue.number)}
                  >
                    <FaComments className="mr-1" />
                    Ver Comentários
                  </button>
                </div>

                {selectedIssue === issue.number && (
                  <IssueComments
                    owner={owner!}
                    repoName={repoName!}
                    issueNumber={issue.number}
                  />
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
