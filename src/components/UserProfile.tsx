import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface UserProfileProps {
  avatarUrl: string;
  name: string;
  role: string;
  company: string;
  extraInfo?: string[];
}

export default function UserProfile({
  avatarUrl,
  name,
  role,
  company,
  extraInfo,
}: UserProfileProps) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex flex-col items-center text-center p-4">
      <img
        src={avatarUrl}
        alt="User Avatar"
        className="w-20 h-20 rounded-full shadow-md"
      />
      <h1 className="text-lg font-semibold mt-2">{name}</h1>
      <p className="text-sm text-gray-600">{role}</p>
      <p className="text-sm text-gray-500">{company}</p>

      <button
        onClick={() => setShowMore(!showMore)}
        className="text-blue-500 mt-2 text-sm flex items-center gap-1 transition-all duration-300 ease-in-out"
      >
        Informações Adicionais {showMore ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showMore ? "max-h-40 opacity-100 p-3" : "max-h-0 opacity-0"
        } bg-gray-100 rounded-md w-full mt-2`}
      >
        {extraInfo?.map((info, index) => (
          <p key={index} className="text-sm text-gray-700">
            {info}
          </p>
        ))}
      </div>
    </div>
  );
}
