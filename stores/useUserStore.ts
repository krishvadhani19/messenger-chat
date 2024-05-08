import { getUserByEmail } from "@/server/controllers/user";
import { create } from "zustand";

type State = {
  user: any;
};

type Action = {
  fetchUser: (email: string) => Promise<void>;
};

export const useUserStore = create<State & Action>((set) => ({
  user: null,
  fetchUser: async (email: string) => {
    const user = await getUserByEmail(email);

    set({ user });
  },
}));

export const UserStore = useUserStore.getState;
