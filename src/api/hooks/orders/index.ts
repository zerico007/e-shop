import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { placeOrder } from "../../functions";
import { toaster } from "../../../utils";

export function usePlaceOrder(onSuccess?: (data?: any) => void) {
  const queryClient = useQueryClient();
  const { mutate: place, isLoading: isPlacingOrder } = useMutation(
    () => placeOrder(),
    {
      onError: (error: unknown) => console.log(error),
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
