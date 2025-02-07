import { FaGithub } from "react-icons/fa";

interface HeaderProps {
  avatarUrl: string;
  username: string;
  profileUrl: string;
}

export default function Header({
  avatarUrl,
  username,
  profileUrl,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white rounded-b-lg">
      <div className="flex items-center space-x-3">
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-12 h-12 rounded-full"
        />
        <h1 className="text-lg font-semibold">{username}</h1>
      </div>
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white"
      >
        <FaGithub size={24} />
      </a>
    </header>
  );
}
