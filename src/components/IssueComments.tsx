/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGithubApi } from "../services/githubApi";

export function IssueComments({
  owner,
  repoName,
  issueNumber,
}: {
  owner: string;
  repoName: string;
  issueNumber: number;
}) {
  const { getIssueComments } = useGithubApi(owner);
  const { comments, isLoading } = getIssueComments(
    owner,
    repoName,
    issueNumber,
  );

  if (isLoading)
    return (
      <p className="text-gray-500 text-sm mt-2">Carregando comentários...</p>
    );
  if (!comments.length)
    return (
      <p className="text-gray-500 text-sm mt-2">
        Nenhum comentário disponível.
      </p>
    );

  return (
    <div className="mt-2 border-l-2 border-gray-300 pl-4 text-gray-700">
      {comments.slice(0, 3).map((comment: any) => (
        <div key={comment.id} className="mb-2">
          <div className="flex items-center gap-2 text-sm">
            <img
              src={comment.user.avatar_url}
              alt={comment.user.login}
              className="w-5 h-5 rounded-full"
            />
            <span className="font-semibold">{comment.user.login}</span>
          </div>
          <p className="text-xs text-gray-600">{comment.body}</p>
        </div>
      ))}
    </div>
  );
}
