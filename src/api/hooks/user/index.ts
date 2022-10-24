import { useMutation } from "@tanstack/vue-query";
import { AxiosError } from "axios";
import { login, register, updatePassword } from "../../functions";
import { toaster } from "../../../utils";

const errorMessages: Record<number, string> = {
  401: "Invalid credentials",
  404: "User not found",
  409: "User already exists",
  500: "Internal server error",
};

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
      onError: (error: AxiosError) => {
        toaster.error(errorMessages[error.response?.status || 500]);
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
