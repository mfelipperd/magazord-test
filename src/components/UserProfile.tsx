import { ReactNode, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface UserProfileProps {
  avatarUrl: string;
  name: string;
  role: string;
  company: string;
  extraInfo?: {
    infoName: string;
    infoIcon: ReactNode;
  }[];
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
    <div className="flex flex-col gap-2  justify-center items-center text-center  min-[733px]:items-center min-[733px]:text-left min-[733px]:w-full">
      <img
        src={avatarUrl}
        alt="User Avatar"
        width={150}
        height={150}
        className=" lg:w-[150px] lg:h-[150px] w-[104px] md:h-[104px] rounded-full shadow-md "
      />

      <div className="w-full flex flex-col items-center ">
        <h1 className="lg:text-2xl md:text-xl font-bold mt-2 text-custom-gray-900 text-center ">
          {name}{" "}
        </h1>
        <p className="lg:text-base md:text-xs text-sm font-normal text-custom-gray-300 text-center md:w-[217px]">
          {role}
        </p>
        <p className="lg:text-base md:text-xs text-sm font-normal text-custom-gray-300">
          {company}
        </p>
      </div>

      <div className=" w-full  min-[733px]:hidden">
        <div className="w-full flex justify-center items-center">
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-custom-blue-100  mt-2 text-sm flex flex-col items-center gap-1 transition-all duration-300 ease-in-out"
          >
            Informações Adicionais{" "}
            <FaChevronDown
              className={`${showMore ? "rotate-180" : ""} transition-all duration-200`}
            />
          </button>
        </div>

        <div
          className={`transition-all duration-500 ease-in-out flex flex-col  items-start ${
            showMore ? "max-h-40 opacity-100 p-3 mt-3" : "max-h-0 opacity-0"
          } bg-custom-gray-100 rounded-2xl w-full `}
        >
          {extraInfo?.map((info, index) => (
            <div
              key={index + info.infoName}
              className="flex items-center gap-3 mt-4"
            >
              {info.infoIcon}
              <p className="text-sm font-normal text-custom-blue-100  truncate max-w-40">
                {info.infoName}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden min-[733px]:block mt-3  w-full justify-self-start align-baseline">
        {extraInfo?.map(
          (info, index) =>
            info.infoName && (
              <div
                key={index + info.infoName}
                className="flex items-center gap-3 mt-3 overflow-hidden max-w-[169px]"
              >
                {info.infoIcon}
                <p className="text-sm text-custom-blue-100  truncate max-w-40">
                  {info.infoName.includes("http")
                    ? info.infoName.split("//")[1]
                    : info.infoName}
                </p>
              </div>
            ),
        )}
      </div>
    </div>
  );
}
