import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { getOrders, placeOrder } from "../../functions";
import { toaster } from "../../../utils";

export function usePlaceOrder(onSuccess?: (data?: any) => void) {
  const queryClient = useQueryClient();
  const { mutate: place, isLoading: isPlacingOrder } = useMutation(
    () => placeOrder(),
    {
      onError: (error: unknown) => {
        console.log(error);
        toaster.error("Failed to place order");
      },
      onSuccess: (data: any) => {
        queryClient.invalidateQueries(["cart"]);
        queryClient.invalidateQueries(["orders"]);
        toaster.success("Order placed!");
        onSuccess?.(data);
      },
    }
  );

  return {
    place,
    isPlacingOrder,
  };
}

export function useGetOrders(
  role: "administrator" | "customer",
  onSuccess?: (data?: any) => void
) {
  const { data: orders, isLoading: isGettingOrders } = useQuery<Order[], Error>(
    ["orders", role],
    () => getOrders(role),
    {
      onError: (error: unknown) => {
        console.log(error);
        toaster.error("Failed to fetch orders");
      },
      onSuccess,
    }
  );

  return {
    orders,
    isGettingOrders,
  };
}
