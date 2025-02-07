import { Repo } from "../../interfaces/IRepository";
import { useGithubApi } from "../../services/githubApi";

export default function Starred() {
  const {
    starredRepositories,
    getStarredRepositories,
    loading,
    error,
    username,
    setUsername,
  } = useGithubApi("facebook");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    getStarredRepositories();
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Favoritos de {username}</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite um usuário do GitHub"
          className="border p-2 rounded w-full mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Buscar Favoritos
        </button>
      </form>
      {loading && <p className="text-center text-gray-500">Carregando...</p>}
      {error && <p className="text-center text-red-500">{error.message}</p>}
      <ul>
        {starredRepositories.map((repo: Repo) => (
          <li key={repo.id} className="p-2 border-b">
            <a href={`/repo/${repo.name}`} className="text-blue-500">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
