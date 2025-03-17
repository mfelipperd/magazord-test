import { useLocation } from "react-router-dom";

export const useGetURLParameters = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
};
