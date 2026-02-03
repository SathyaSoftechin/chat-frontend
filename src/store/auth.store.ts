import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  email: string;
  role: string;
  avatar?: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: (user) =>
        set({
          isAuthenticated: true,
          user,
        }),

      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
        }),
    }),
    {
      name: "auth-storage",
      version: 1,
    }
  )
);
