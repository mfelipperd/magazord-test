import { useParams } from "react-router-dom";

export default function RepoDetails() {
  const { repoName } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">
        Detalhes do Repositório: {repoName}
      </h1>
      <p>🔍 Aqui serão exibidas informações detalhadas do repositório.</p>
    </div>
  );
}
