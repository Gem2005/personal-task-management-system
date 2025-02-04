import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const loginUser = async (email: string, password: string) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }

  return res.json();
};

const registerUser = async (email: string, password: string, name: string) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }

  return res.json();
};

const logoutUser = async () => {
  await fetch("/api/auth/logout", { method: "POST" });
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      login: async (email, password) => {
        const { user } = await loginUser(email, password);
        set({ user });
      },
      register: async (email, password, name) => {
        const { user } = await registerUser(email, password, name);
        set({ user });
      },
      logout: async () => {
        await logoutUser();
        set({ user: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
