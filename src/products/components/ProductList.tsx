import { ProductCard } from "..";
import { Product } from "../../interfaces/product";
import usePrefetchProduct from "../hooks/usePrefetchProduct";

interface PropsProductList {
  products: Product[];
}

export const ProductList = ({ products }: PropsProductList) => {
  const prefetchProduct = usePrefetchProduct();

  return (
    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 justify-center max-w-max">
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          prefetchProduct={prefetchProduct.prefetchProduct}
        />
      ))}
    </div>
  );
};
