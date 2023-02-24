import { defineStore } from "pinia";
import { getUser, register, login, logout } from "../apis/auth";
import { changeUser } from "../apis/user";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const users = ref(getUser() || {});

  function setUser(user) {
    users.value = user;
  }

  async function ayRegisterUser({ email, username, password }) {
    const user = await register(email, username, password);
    setUser(user);
  }
  async function ayLoginUser({ email, password }) {
    const user = await login(email, password);
    setUser(user);
  }
  async function ayUpdateUser(user) {
    const updatedUser = await changeUser(user);
    setUser(updatedUser);
  }
  async function ayLogoutUser() {
    logout();
    setUser({});
  }

  return {
    users,
    setUser,
    ayRegisterUser,
    ayLoginUser,
    ayUpdateUser,
    ayLogoutUser,
  };
});
