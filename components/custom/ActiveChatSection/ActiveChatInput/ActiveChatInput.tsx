"use client";

// import modules
import { MdAddToPhotos, MdSend } from "react-icons/md";
import { useCallback, useState } from "react";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";

// import files
import "./ActiveChatInput.scss";
import Input from "@/components/ui/Input/Input";
import { ActiveChatStore } from "@/stores/useActiveChatStore";

const ChatInput = () => {
  const [chatInput, setChatInput] = useState<string>();

  const handleChange = useCallback((value: string) => setChatInput(value), []);

  const handleSendMessage = useCallback(async () => {
    if (!chatInput?.trim()) {
      return;
    }

    await axios.post("/api/messages", {
      message: chatInput,
      conversationId: ActiveChatStore()?.activeChat?.id,
    });

    setChatInput("");
  }, [chatInput]);

  const handleUpload = useCallback(async (imageData: any) => {
    if (!imageData) {
      return;
    }

    await axios.post("/api/messages", {
      image: imageData?.info?.secure_url,
      conversationId: ActiveChatStore()?.activeChat?.id,
    });
  }, []);

  return (
    <div className="chat-input-container">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onSuccess={handleUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        className="chat-input-container-add-button"
      >
        <MdAddToPhotos size={22} />
      </CldUploadButton>

      <div className="chat-input-container-input-area">
        <Input
          placeholder="Write a message"
          value={chatInput!}
          onChange={handleChange}
        />
      </div>

      <div
        className="chat-input-container-send-button"
        onClick={handleSendMessage}
      >
        <MdSend size={18} />
      </div>
    </div>
  );
};

export default ChatInput;
