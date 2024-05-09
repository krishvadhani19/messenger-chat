import { useActiveChatStore } from "@/stores/useActiveChatStore";

const ActiveChat = () => {
  const activeChat = useActiveChatStore((s) => s.activeChat);
  return <div>{activeChat?.email}</div>;
};

export default ActiveChat;
