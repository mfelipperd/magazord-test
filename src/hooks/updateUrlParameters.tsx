import { useLocation, useNavigate } from "react-router-dom";

export const useUpdateURLParams = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (newParams: Record<string, string>) => {
    const searchParams = new URLSearchParams(location.search);

    Object.entries(newParams).forEach(([key, value]) => {
      searchParams.set(key, value);
    });

    navigate({ search: searchParams.toString() }, { replace: true });
  };
};
