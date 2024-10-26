"use client";
import { useChat } from "ai/react";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  // const handleToothacheSubmit = async (
  //   e: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   e.preventDefault();
  //   console.log(e);
  //   setInput("كيف اخفف الم تسوس الاسنان بشكل مؤقت");
  //   handleSubmit();
  // };

  return (
    <div className="flex flex-col justify-center items-end lg:w-[80vw] w-[90vw] min-h-screen py-24 mx-auto text-right">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap mb-5 flex flex-col">
          <span className="font-semibold  p-1 m-1">
            {m.role === "user" ? "المستخدم : " : "المساعد : "}
          </span>
          {m.content}
          <hr />
        </div>
      ))}

      <form onSubmit={handleSubmit} className="w-full h-full">
        <input
          className="fixed bottom-0 left-1/4 w-[50vw] p-2 mb-8 border border-gray-300 rounded shadow-xl text-right"
          value={input}
          placeholder="كيف يمكنني المساعدة؟"
          onChange={handleInputChange}
        />
      </form>
      {/* <form onSubmit={handleSubmit}>
        <input
          className="hidden fixed bottom-0 left-1/4 w-[50vw] p-2 mb-8 border border-gray-300 rounded shadow-xl text-right"
          value={input}
          placeholder="كيف يمكنني المساعدة؟"
          onChange={handleInputChange}
        />
        <button
          type="submit"
          onClick={handleToothacheSubmit}
          className="fixed bottom-0 right-1/4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          كيف أخفف ألم التسوس؟
        </button>
      </form> */}
    </div>
  );
}
