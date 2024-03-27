import { axiosInstance } from "./axios";
import { User } from "./entity";
import { AuthBindings } from "./types";

const token_key = "bookstore-auth";

export const authProvider = (): AuthBindings => ({
  login: async (email) => {
    const result = await axiosInstance.post(`/authenticate/login`, {
      email,
    });
    const user: User = result.data;
    if (!user) {
      return {
        success: false,
      };
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(token_key, JSON.stringify(user));
    }

    return {
      success: true,
      user,
    };
  },
  logout: () => {
    localStorage.removeItem(token_key);
  },

  check: () => {
    let user: User | undefined = undefined;
    try {
      user = JSON.parse(localStorage.getItem(token_key) || "");
    } catch (error) {
      return {
        success: false,
      };
    }
    
    if (!user)
      return {
        success: false,
      };

    return {
      success: true,
      user,
    };
  },
});
