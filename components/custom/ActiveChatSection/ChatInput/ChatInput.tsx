"use client";

// import modules
import { MdAddToPhotos, MdSend } from "react-icons/md";
import { useCallback, useState } from "react";

// import files
import "./ChatInput.scss";

import Input from "@/components/ui/Input/Input";

const ChatInput = () => {
  const [chatInput, setChatInput] = useState<string>();

  const handleChange = useCallback((value: string) => setChatInput(value), []);

  return (
    <div className="chat-input-container">
      <div className="chat-input-container-add-button" onClick={() => {}}>
        <MdAddToPhotos size={22} />
      </div>

      <div className="chat-input-container-input-area">
        <Input
          placeholder="Write a message"
          value={chatInput!}
          onChange={handleChange}
        />
      </div>

      <div className="chat-input-container-send-button" onClick={() => {}}>
        <MdSend size={18} />
      </div>
    </div>
  );
};

export default ChatInput;
