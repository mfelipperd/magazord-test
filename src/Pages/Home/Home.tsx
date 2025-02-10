import { useState, useEffect } from "react";
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
    currentPage,
    nextPage,
    prevPage,
  } = useGithubApi("facebook");

  const [activeTab, setActiveTab] = useState<"repositories" | "starred">(
    "repositories",
  );

  useEffect(() => {
    getRepositories();
    getStarredRepositories();
  }, [username, currentPage]);

  const handleSearch = (newUsername: string) => {
    setUsername(newUsername);
    getRepositories();
    getStarredRepositories();
  };

  return (
    <Layout>
      <div className="flex flex-col min-[733px]:flex-row w-full max-w-5xl mx-auto p-4">
        <div className="min-[733px]:w-[217px]">
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
        </div>

        <div className="min-[733px]:w-3/5 flex flex-col">
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            repoCount={repositories.length}
            starredCount={starredRepositories.length}
          />
          <SearchBar onSearch={handleSearch} />

          {loading && (
            <p className="text-center text-gray-500">Carregando...</p>
          )}
          {error && <p className="text-center text-red-500">{error.message}</p>}

          {activeTab === "repositories" ? (
            <RepoList
              repositories={repositories}
              currentPage={currentPage}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          ) : (
            <RepoList
              repositories={starredRepositories}
              currentPage={currentPage}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
