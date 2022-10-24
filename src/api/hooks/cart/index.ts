import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { getCart, addToCart, deleteFromCart } from "../../functions";
import { toaster } from "../../../utils";

export function useCart(enabled = true) {
  const {
    data: cart,
    isLoading,
    isFetching,
    isSuccess,
    refetch: fetchCart,
  } = useQuery<Cart, Error>(["cart"], getCart, {
    refetchOnWindowFocus: false,
    retry: 1,
    onError: (error: unknown) => console.error(error),
    enabled,
  });
  return {
    cart,
    isLoading,
    isFetching,
    isSuccess,
    fetchCart,
  };
}

export function useAddToCart(onSuccess?: (data?: any) => void) {
  const queryClient = useQueryClient();

  const { mutate: add, isLoading: isAddingToCart } = useMutation(
    (params: { productId: string; quantity: number }) =>
      addToCart(params.productId, params.quantity),
    {
      onError: (error: unknown) => console.log(error),
      onSuccess: (data: any) => {
        queryClient.invalidateQueries(["cart"]);
        toaster.success("Product added to cart");
        onSuccess?.(data);
      },
    }
  );

  return {
    add,
    isAddingToCart,
  };
}

export function useDeleteFromCart(onSuccess?: (data?: any) => void) {
  const queryClient = useQueryClient();

  const { mutate: remove, isLoading: isRemovingFromCart } = useMutation(
    (productId: string) => deleteFromCart(productId),
    {
      onError: (error: unknown) => console.log(error),
      onSuccess: (data: any) => {
        queryClient.invalidateQueries(["cart"]);
        toaster.success("Product removed from cart");
        onSuccess?.(data);
      },
    }
  );

  return {
    remove,
    isRemovingFromCart,
  };
}
