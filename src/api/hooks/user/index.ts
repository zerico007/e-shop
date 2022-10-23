import { useMutation } from "@tanstack/vue-query";
import { login, register, updatePassword } from "../../functions";

export function useLogin(onSuccess?: (data: any) => void) {
  const {
    isError,
    isLoading,
    isSuccess,
    mutate: loginUser,
  } = useMutation(
    (params: { email: string; password: string }) => login(params),
    {
      onSuccess,
      onError: (error: unknown) => {
        console.log(error);
      },
    }
  );
  return {
    isError,
    isLoading,
    isSuccess,
    loginUser,
  };
}

export function useRegister(onSuccess?: (data: any) => void) {
  const {
    isError,
    isLoading,
    isSuccess,
    mutate: registerUser,
  } = useMutation((params: any) => register(params), {
    onSuccess,
  });
  return {
    isError,
    isLoading,
    isSuccess,
    registerUser,
  };
}

export function useUpdatePassword(
  userId: string,
  oldPassword: string,
  newPassword: string
) {
  const {
    isError,
    isLoading,
    isSuccess,
    mutate: updateUserPassword,
  } = useMutation(() => updatePassword(userId, oldPassword, newPassword));
  return {
    isError,
    isLoading,
    isSuccess,
    updateUserPassword,
  };
}
