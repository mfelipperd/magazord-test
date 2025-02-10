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
    <div className="flex flex-col items-center text-center  min-[733px]:items-start min-[733px]:text-left min-[733px]:w-full">
      {/* Avatar */}
      <img
        src={avatarUrl}
        alt="User Avatar"
        className="w-20 h-20 min-[733px]:w-24 min-[733px]:h-24 rounded-full shadow-md"
      />

      {/* Nome e Cargo */}
      <h1 className="text-lg font-semibold mt-2 text-gray-900">{name}</h1>
      <p className="text-sm text-gray-600">{role}</p>
      <p className="text-sm text-gray-500">{company}</p>

      {/* 🔥 Modo Mobile: Botão para Expandir Informações */}
      <div className="block min-[733px]:hidden">
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-blue-500 mt-2 text-sm flex items-center gap-1 transition-all duration-300 ease-in-out"
        >
          Informações Adicionais{" "}
          {showMore ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {/* 🔥 Informações Extras - Apenas em Mobile quando Expandido */}
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

      {/* 🔥 Modo Tablet: Exibir Informações Diretamente */}
      <div className="hidden min-[733px]:block mt-3">
        {extraInfo?.map((info, index) => (
          <p key={index} className="text-sm text-gray-700">
            {info}
          </p>
        ))}
      </div>
    </div>
  );
}
