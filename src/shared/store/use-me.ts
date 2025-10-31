import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserInfo } from "@/entities/user/user.model";

type MeState = {
  me: UserInfo | null;
  setMe: (me: UserInfo | null) => void;
  clearMe: () => void;
};

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
