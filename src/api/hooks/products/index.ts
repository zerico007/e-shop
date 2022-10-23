import { useQuery } from "@tanstack/vue-query";
import { getProducts } from "../../functions";

export function useProducts(enabled = true) {
  const {
    data,
    isLoading,
    isFetching,
    isSuccess,
    refetch: fetchProducts,
  } = useQuery<Product[], Error>(["products"], getProducts, {
    refetchOnWindowFocus: false,
    retry: 1,
    onError: (error: unknown) => console.error(error),
    enabled,
  });
  return {
    data,
    isLoading,
    isFetching,
    isSuccess,
    fetchProducts,
  };
}
