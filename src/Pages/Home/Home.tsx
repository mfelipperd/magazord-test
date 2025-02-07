import { useState } from "react";
import Layout from "../../components/Layout";
import UserProfile from "../../components/UserProfile";
import Tabs from "../../components/Tabs";
import RepoList from "../../components/RepoList";
import SearchBar from "../../components/SearchBar";
import { useGithubApi } from "../../services/githubApi";

export default function Home() {
  const {
    repositories,
    starredRepositories,
    getRepositories,
    getStarredRepositories,
    loading,
    error,
    username,
    setUsername,
  } = useGithubApi("facebook");
  const [activeTab, setActiveTab] = useState<"repositories" | "starred">(
    "repositories",
  );

  const handleSearch = (newUsername: string) => {
    setUsername(newUsername);
    getRepositories();
    getStarredRepositories();
  };

  return (
    <Layout>
      <UserProfile
        avatarUrl={`https://github.com/${username}.png`}
        name="Gabriel Cordeiro"
        role="Head Development Team"
        company="Magazord"
        extraInfo={[
          "Magazord - plataforma",
          "Rio do Sul - SC",
          "Cordas.hub.uok",
          "Gabriel.s.cordeiro",
        ]}
      />
      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        repoCount={repositories.length}
        starredCount={starredRepositories.length}
      />
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="text-center text-gray-500">Carregando...</p>}
      {error && <p className="text-center text-red-500">{error.message}</p>}
      {activeTab === "repositories" ? (
        <RepoList repositories={repositories} />
      ) : (
        <RepoList repositories={starredRepositories} />
      )}
    </Layout>
  );
}
