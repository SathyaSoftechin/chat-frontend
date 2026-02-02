import { useChatStore } from "../store/chat.store";
import { useState } from "react";

export default function Chats() {
  const { chats, activeChatId, setActiveChat, sendMessage } =
    useChatStore();
  const activeChat = chats.find((c) => c.id === activeChatId);
  const [text, setText] = useState("");

  return (
    <div className="flex h-full">
      {/* Chat List */}
      <div className="w-72 bg-gray-800 border-r border-gray-700 p-4">
        <h3 className="text-lg font-semibold mb-4">Chats</h3>

        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`p-3 rounded cursor-pointer ${
                chat.id === activeChatId
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              {chat.name}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-gray-900">
        {/* Header */}
        <div className="h-14 border-b border-gray-700 flex items-center px-4">
          <span className="font-semibold">{activeChat?.name}</span>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {activeChat?.messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 rounded max-w-xs ${
                msg.sender === "me"
                  ? "ml-auto bg-blue-600"
                  : "bg-gray-700"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="h-14 border-t border-gray-700 flex items-center px-4 gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-800 px-3 py-2 rounded text-white focus:outline-none"
          />
          <button
            onClick={() => {
              if (text.trim()) {
                sendMessage(text);
                setText("");
              }
            }}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
