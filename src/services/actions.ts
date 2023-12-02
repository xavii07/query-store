import { type Product } from "../interfaces/product";
import { productApi } from "../products/api/productsApi";

interface GetProductsOptions {
  filterKey?: string;
}

interface ProductLike {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
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

export const createProduct = async (product: ProductLike): Promise<Product> => {
  throw new Error("Error al crear el producto");
  const { data } = await productApi.post<Product>("/products", product);
  return data;
};
