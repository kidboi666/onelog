import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IUserInfo } from "@/entities/auth/model/types";

interface MeState {
  me: IUserInfo | null;
  setMe: (me: IUserInfo | null) => void;
  clearMe: () => void;
}

export const useMe = create<MeState>()(
  persist(
    (set) => ({
      me: null,
      setMe: (me) => set({ me }),
      clearMe: () => set({ me: null }),
    }),
    { name: "auth-storage" },
  ),
);
