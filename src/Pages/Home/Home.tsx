import { useState } from "react";
import UserProfile from "../../components/UserProfile";
import Tabs from "../../components/Tabs";
import RepoList from "../../components/RepoList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useRepoStore } from "../../store/useRepoStore";
import { CIcon } from "@coreui/icons-react";
import { cilLocationPin } from "@coreui/icons";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Home() {
  const { githubUser, repositories, starredRepos, totalRepositories } =
    useRepoStore();

  const [activeTab, setActiveTab] = useState<"repositories" | "starred">(
    "repositories",
  );

  return (
    <div className="flex flex-col lg:gap-[60px] md:gap-4 min-[733px]:flex-row w-full">
      <div className="min-[733px]:w-[217px]">
        <UserProfile
          avatarUrl={githubUser?.avatar_url || ""}
          name={githubUser?.name || githubUser?.login || "Usuário Desconhecido"}
          role={githubUser?.bio || "Sem descrição disponível"}
          company={githubUser?.company || "Sem empresa cadastrada"}
          extraInfo={[
            {
              infoName: githubUser?.company || "",
              infoIcon: (
                <Icon
                  icon="carbon:enterprise"
                  className="h-4 w-4 text-custom-blue-100"
                />
              ),
            },
            {
              infoName: githubUser?.location || "",
              infoIcon: (
                <CIcon
                  icon={cilLocationPin}
                  className="h-4 w-4 text-custom-blue-100"
                />
              ),
            },
            {
              infoName: githubUser?.blog || "",
              infoIcon: (
                <Icon
                  width={4}
                  height={4}
                  icon="system-uicons:chain"
                  className="h-4 w-4 text-custom-blue-100"
                />
              ),
            },
            {
              infoName: githubUser?.twitter_username || "",
              infoIcon: <Icon icon="hugeicons:twitter" />,
            },
          ].filter(Boolean)}
        />
      </div>

      <div className="flex flex-col gap-10 md:gap-8 w-fit">
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          repoCount={totalRepositories}
          starredCount={starredRepos.length}
        />
        <SearchBar />

        {activeTab === "repositories" ? (
          <RepoList starred={false} repositories={repositories} />
        ) : (
          <RepoList starred={true} repositories={starredRepos} />
        )}
      </div>
    </div>
  );
}
