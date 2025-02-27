import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

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
      <img
        src={avatarUrl}
        alt="User Avatar"
        width={150}
        height={150}
        className=" min-[733px]:w-24 min-[733px]:h-24 rounded-full shadow-md"
      />

      <h1 className="text-lg font-semibold mt-2 text-gray-900">{name}</h1>
      <p className="text-sm text-gray-600">{role}</p>
      <p className="text-sm text-gray-500">{company}</p>

      <div className=" w-full  min-[733px]:hidden">
        <div className="w-full flex justify-center items-center">
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-sky-500  mt-2 text-sm flex items-center gap-1 transition-all duration-300 ease-in-out  "
          >
            Informações Adicionais{" "}
            <FaChevronDown
              className={`${showMore ? "rotate-180" : ""} transition-all duration-200`}
            />
          </button>
        </div>

        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            showMore ? "max-h-40 opacity-100 p-3" : "max-h-0 opacity-0"
          } bg-gray-100 rounded-md w-full mt-2`}
        >
          {extraInfo?.map((info, index) => (
            <p key={index} className="text-sm text-sky-600 text-start">
              {info}
            </p>
          ))}
        </div>
      </div>

      <div className="hidden min-[733px]:block mt-3">
        {extraInfo?.map((info, index) => (
          <p key={index} className="text-sm text-sky-600">
            {info}
          </p>
        ))}
      </div>
    </div>
  );
}
