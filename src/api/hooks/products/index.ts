import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { AxiosRequestConfig } from "axios";
import { getProducts, updateProduct } from "../../functions";
import { toaster } from "../../../utils";

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

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { mutate: update, isLoading: isUpdating } = useMutation(
    (params: {
      id: string;
      productData: FormData;
      config?: AxiosRequestConfig;
    }) => updateProduct(params.id, params.productData, params.config),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
        toaster.success("Product updated successfully");
      },
    }
  );
  return {
    update,
    isUpdating,
  };
}
