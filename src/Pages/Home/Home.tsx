import { useState } from "react";
import UserProfile from "../../components/UserProfile";
import Tabs from "../../components/Tabs";
import RepoList from "../../components/RepoList";
import SearchBar from "../../components/SearchBar";
import { useRepoStore } from "../../store/useRepoStore";

export default function Home() {
  const { githubUser, repositories, starredRepos, currentPage } =
    useRepoStore();

  const [activeTab, setActiveTab] = useState<"repositories" | "starred">(
    "repositories",
  );

  return (
    <div className="flex flex-col min-[733px]:flex-row w-full px-0">
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

      <div className="flex-1 flex flex-col">
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          repoCount={repositories.length}
          starredCount={starredRepos.length}
        />
        <SearchBar />

        {activeTab === "repositories" ? (
          <RepoList
            starred={false}
            repositories={repositories}
            currentPage={currentPage}
            nextPage={() => {}}
            prevPage={() => {}}
          />
        ) : (
          <RepoList
            starred={true}
            repositories={starredRepos}
            currentPage={currentPage}
            nextPage={() => {}}
            prevPage={() => {}}
          />
        )}
      </div>
    </div>
  );
}
