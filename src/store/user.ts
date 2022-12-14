import { ref, watch, onBeforeMount, Ref } from "vue";
import { defineStore } from "pinia";
import jwt_decode from "jwt-decode";
import { setBearerToken } from "../api";

interface User {
  userId: string;
  email: string;
  username: string;
  role: "administrator" | "customer";
  token: string;
  isLoggedIn: boolean;
}

export const useUserStore = defineStore("user", () => {
  const user: Ref<User> = ref({
    userId: "",
    email: "",
    username: "",
    role: "" as "administrator" | "customer",
    token: "",
    isLoggedIn: false,
  });

  const setUser = (token: string) => {
    const decodedUser: any = jwt_decode(token);
    const { username, email, role, userId } = decodedUser;
    const loggedInUser: User = {
      username,
      email,
      role,
      userId,
      token,
      isLoggedIn: true,
    };
    user.value = loggedInUser;
  };

  const logout = () => {
    user.value = {
      userId: "",
      email: "",
      username: "",
      role: "" as "administrator" | "customer",
      token: "",
      isLoggedIn: false,
    };
  };

  watch(user, (newUser) => {
    sessionStorage.setItem("user", JSON.stringify(newUser));
  });

  onBeforeMount(() => {
    const userInStorage = sessionStorage.getItem("user");
    if (userInStorage) {
      user.value = JSON.parse(userInStorage);
      setBearerToken(user.value.token);
    }
  });

  return {
    user,
    setUser,
    logout,
  };
});
