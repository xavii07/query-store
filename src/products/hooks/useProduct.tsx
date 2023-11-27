import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../services/actions";

interface Options {
  id: number;
}

export const useProduct = ({ id }: Options) => {
  const {
    data: product,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    staleTime: 1000 * 60 * 60, //1 hour
  });

  return {
    product,
    isLoading,
    isError,
    error,
    isFetching,
  };
};
