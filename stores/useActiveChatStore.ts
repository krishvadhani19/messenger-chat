import { User } from "@prisma/client";
import { create } from "zustand";

type State = {
  activeChat: User | null;
};

type Action = {
  setActiveChat: (user: User) => void;
};

export const useActiveChatStore = create<State & Action>((set) => ({
  activeChat: null,
  setActiveChat: (user: User) => {
    set({ activeChat: user });
  },
}));

export const ActiveChatStore = useActiveChatStore.getState;
