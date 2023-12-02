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

    onMutate: (product) => {
      console.log("onMutate", product);
      //todo: crear un producto optimista
      const optimisticProduct = { id: Math.random(), ...product };

      //alacenar el producto optimista en la cache
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: product.category }],
        (old) => {
          if (!old) return [optimisticProduct];
          return [...old, optimisticProduct];
        }
      );

      //retornar el producto optimista para que se muestre en la lista context
      return { optimisticProduct };
    },

    //TODO: agregar al final de la lista
    onSuccess: (data, variables, context) => {
      console.log({ data, variables, context });

      //TODO: remover el producto optimista de la cache
      queryClient.removeQueries({
        queryKey: ["products", { filterKey: context?.optimisticProduct.id }],
      });

      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: data.category }],
        (old) => {
          if (!old) return [data];
          return old.map((cacheProduct) => {
            return cacheProduct.id === context?.optimisticProduct.id
              ? data
              : cacheProduct;
          });
        }
      );
    },
  });

  return mutation;
};

export default useProductMutation;
