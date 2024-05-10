import { useActiveChatStore } from "@/stores/useActiveChatStore";

const ActiveChat = () => {
  const activeChat = useActiveChatStore((s) => s.activeChat);
  return <div>{activeChat?.id}</div>;
};

export default ActiveChat;
