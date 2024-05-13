import { FullConversationType } from "@/types";
import { create } from "zustand";

type State = {
  activeChat: FullConversationType | null;
};

type Action = {
  setActiveChat: (conversation: FullConversationType | null) => void;
};

export const useActiveChatStore = create<State & Action>((set) => ({
  activeChat: null,
  setActiveChat: (conversation: FullConversationType | null) => {
    set({ activeChat: conversation });
  },
}));

export const ActiveChatStore = useActiveChatStore.getState;
