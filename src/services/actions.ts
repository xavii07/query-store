import { type Product } from "../interfaces/product";
import { productApi } from "../products/api/productsApi";

interface GetProductsOptions {
  filterKey?: string;
}

export const getProducts = async ({
  filterKey,
}: GetProductsOptions): Promise<Product[]> => {
  const filterUrl = filterKey ? `category=${filterKey}` : "";

  const { data } = await productApi.get<Product[]>(`/products?${filterUrl}`);
  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await productApi.get<Product>(`/products/${id}`);
  return data;
};
