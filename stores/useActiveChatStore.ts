import { Conversation } from "@prisma/client";
import { create } from "zustand";

type State = {
  activeChat: Conversation | null;
};

type Action = {
  setActiveChat: (user: Conversation) => void;
};

export const useActiveChatStore = create<State & Action>((set) => ({
  activeChat: null,
  setActiveChat: (conversation: Conversation) => {
    set({ activeChat: conversation });
  },
}));

export const ActiveChatStore = useActiveChatStore.getState;
