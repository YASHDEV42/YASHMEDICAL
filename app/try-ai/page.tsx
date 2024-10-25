"use client";
import { useChat } from "ai/react";
export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col justify-center items-center lg:w-[80vw] w-[90vw] min-h-screen py-24 mx-auto text-right">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap mb-5 ">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="w-full h-full">
        <input
          className="fixed bottom-0 left-1/4 w-[50vw]  p-2 mb-8 border border-gray-300 rounded shadow-xl text-right"
          value={input}
          placeholder="كيف يمكنني المساعدة؟"
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
