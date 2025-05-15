import React, { useState } from "react";
import axios from "axios";
import { MessageSquare } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI assistant. Ask me anything about admissions, courses, or events!", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post("/api/chat/ask", { message: input });
      const botMsg = { text: res.data.reply, sender: "bot" };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [...prev, { text: "Sorry, I couldn't process that.", sender: "bot" }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-xl hover:bg-blue-700"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
      {isOpen && (
        <div className="bg-white w-80 max-h-[500px] rounded-xl shadow-xl flex flex-col">
          <div className="bg-blue-600 text-white p-3 rounded-t-xl flex justify-between items-center">
            <span className="font-semibold">AI Assistant</span>
            <button onClick={() => setIsOpen(false)} className="text-white font-bold text-lg">×</button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg ${
                  msg.sender === "bot" ? "bg-blue-100 text-blue-900 self-start" : "bg-gray-200 self-end"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex items-center p-2 border-t">
            <input
              className="flex-1 p-2 text-sm border rounded-l-lg outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask your question..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-3 py-2 rounded-r-lg hover:bg-blue-700 text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
