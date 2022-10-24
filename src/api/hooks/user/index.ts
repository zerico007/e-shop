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
  } = useMutation(
    (params: { email: string; username: string; password: string }) =>
      register(params),
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
    registerUser,
  };
}

export function useUpdatePassword() {
  const {
    isError,
    isLoading: isUpdatingPassword,
    isSuccess,
    mutate: updateUserPassword,
  } = useMutation(
    (params: {
      userId: string;
      currentPassword: string;
      newPassword: string;
    }) => {
      const { userId, currentPassword, newPassword } = params;
      return updatePassword(userId, newPassword, currentPassword);
    },
    {
      onError: (error: AxiosError) => {
        toaster.error(errorMessages[error.response?.status || 500]);
        console.log(error);
      },
      onSuccess: () => {
        toaster.success("Password updated");
      },
    }
  );
  return {
    isError,
    isUpdatingPassword,
    isSuccess,
    updateUserPassword,
  };
}
