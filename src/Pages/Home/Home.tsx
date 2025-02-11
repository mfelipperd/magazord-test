import { useState, useEffect } from "react";
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
    githubUser,
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
    <div className="flex flex-col min-[733px]:flex-row w-full px-0 ">
      <div className="min-[733px]:w-[217px]">
        <UserProfile
          avatarUrl={githubUser?.avatar_url || ""}
          name={githubUser?.name || githubUser?.login || "Usuário Desconhecido"}
          role={githubUser?.bio || "Sem descrição disponível"}
          company={githubUser?.company || "Sem empresa cadastrada"}
          extraInfo={[
            githubUser?.location ? `🌍 ${githubUser.location}` : "",
            githubUser?.blog ? `🔗 ${githubUser.blog}` : "",
            githubUser?.twitter_username
              ? `🐦 Twitter: @${githubUser.twitter_username}`
              : "",
            githubUser?.html_url ? `💻 GitHub: ${githubUser.html_url}` : "",
          ].filter(Boolean)}
        />
      </div>

      <div className="flex-1 flex flex-col ">
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
          <RepoList
            starred={true}
            repositories={repositories}
            currentPage={currentPage}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        ) : (
          <RepoList
            starred={false}
            repositories={starredRepositories}
            currentPage={currentPage}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        )}
      </div>
    </div>
  );
}
