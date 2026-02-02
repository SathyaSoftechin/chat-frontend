import { create } from "zustand";

type Message = {
  id: string;
  sender: "me" | "other";
  text: string;
};

type Chat = {
  id: string;
  name: string;
  messages: Message[];
};

type ChatState = {
  chats: Chat[];
  activeChatId: string;
  setActiveChat: (id: string) => void;
  sendMessage: (text: string) => void;
};

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [
    {
      id: "1",
      name: "Alice",
      messages: [
        { id: "m1", sender: "other", text: "Hi" },
        { id: "m2", sender: "me", text: "Hello" },
      ],
    },
    {
      id: "2",
      name: "Dev Team",
      messages: [
        { id: "m3", sender: "other", text: "Standup at 10?" },
      ],
    },
  ],
  activeChatId: "1",

  setActiveChat: (id) => set({ activeChatId: id }),

  sendMessage: (text) => {
    const { chats, activeChatId } = get();
    set({
      chats: chats.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: Date.now().toString(),
                  sender: "me",
                  text,
                },
              ],
            }
          : chat
      ),
    });
  },
}));
