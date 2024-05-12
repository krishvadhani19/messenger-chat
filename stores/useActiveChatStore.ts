import { Conversation } from "@prisma/client";
import { create } from "zustand";

type State = {
  activeChat: Conversation | null;
};

type Action = {
  setActiveChat: (conversation: Conversation | null) => void;
};

export const useActiveChatStore = create<State & Action>((set) => ({
  activeChat: null,
  setActiveChat: (conversation: Conversation | null) => {
    set({ activeChat: conversation });
  },
}));

export const ActiveChatStore = useActiveChatStore.getState;
