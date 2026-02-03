import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket/socket";
import EmojiPicker from "emoji-picker-react";

/* ================= TYPES ================= */

type Chat = {
  id: number;
  name?: string;
};

type Message = {
  id: number;
  content: string;
  senderId: number;
};

type Employee = {
  id: number;
  username: string;
  role: string;
};

/* ================= COMPONENT ================= */

export default function Chats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [showEmoji, setShowEmoji] = useState(false);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  /* ================= FETCH CHATS + USERS ================= */
  useEffect(() => {
    if (!token) return;

    const fetchAll = async () => {
      try {
        const chatsRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/chats`,
          { headers }
        );
        setChats(Array.isArray(chatsRes.data) ? chatsRes.data : []);

        const usersRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/users`,
          { headers }
        );
        setEmployees(Array.isArray(usersRes.data) ? usersRes.data : []);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [token]);

  /* ================= CLICK EMPLOYEE → DM ================= */
  const startDM = async (userId: number) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/chats/dm`,
        { userId },
        { headers }
      );

      const chat = res.data;
      setChats((prev) =>
        prev.some((c) => c.id === chat.id) ? prev : [chat, ...prev]
      );
      setActiveChatId(chat.id);
    } catch (err) {
      console.error("DM ERROR:", err);
    }
  };

  /* ================= FETCH MESSAGES ================= */
  useEffect(() => {
    if (!activeChatId) return;

    axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}/api/chats/${activeChatId}/messages`,
        { headers }
      )
      .then((res) => setMessages(res.data || []));

    socket.emit("join-chat", activeChatId);

    socket.on("new-message", (msg) => {
      if (msg.conversationId === activeChatId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("new-message");
  }, [activeChatId]);

  /* ================= SEND MESSAGE ================= */
  const sendMessage = () => {
    if (!text.trim() || !activeChatId) return;

    socket.emit("send-message", {
      conversationId: activeChatId,
      content: text,
    });

    setText("");
  };

  if (loading) return <div className="p-4 text-white">Loading…</div>;

  /* ================= UI ================= */
  return (
    <div className="flex h-full text-white">
      {/* SIDEBAR */}
      <div className="w-72 bg-gray-800 p-4">
        <h3 className="mb-3 font-semibold">Chats</h3>

        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setActiveChatId(chat.id)}
            className={`p-2 rounded cursor-pointer ${
              chat.id === activeChatId ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            {chat.name || "Direct Message"}
          </div>
        ))}

        <h4 className="mt-4 text-sm text-gray-400">Employees</h4>

        {employees.map((emp) => (
          <div
            key={emp.id}
            onClick={() => startDM(emp.id)}
            className="p-2 cursor-pointer hover:bg-gray-700"
          >
            {emp.username}
          </div>
        ))}
      </div>

      {/* CHAT */}
      <div className="flex-1 flex flex-col bg-gray-900">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((m) => (
            <div key={m.id} className="bg-gray-700 p-2 rounded mb-2">
              {m.content}
            </div>
          ))}
        </div>

        <div className="h-14 flex items-center gap-2 px-4 border-t border-gray-700">
          <button onClick={() => setShowEmoji(!showEmoji)}>😊</button>

          {showEmoji && (
            <EmojiPicker
              onEmojiClick={(e) => {
                setText((t) => t + e.emoji);
                setShowEmoji(false);
              }}
            />
          )}

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 bg-gray-800 px-3 py-2 rounded"
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className="bg-blue-600 px-4 py-2 rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
