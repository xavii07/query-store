import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../services/actions";
import { Product } from "../../interfaces/product";

const useProductMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProduct,
    //TODO: invalidate queries
    /*onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["products", { filterKey: data.category }],
      });
    },*/

    //TODO: agregar al final de la lista
    onSuccess: (data) => {
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: data.category }],
        (old) => {
          if (!old) return [data];
          return [...old, data];
        }
      );
    },
  });

  return mutation;
};

export default useProductMutation;
