import React, { SetStateAction, useState, Dispatch } from "react";

import Image from "next/image";

const ChatPrompt = ({
  setPrompt,
}: {
  setPrompt: Dispatch<SetStateAction<String>>;
}) => {
  const [chatPrompt, setChatPrompt] = useState("");

  const handleChange = (e: any) => {
    const { value } = e.target;
    setChatPrompt(value);
  };

  const handleSubmit = () => {
    setPrompt(chatPrompt);
  };

  return (
    <div className="absolute bottom-0 rounded-lg z-50 bg-white shadow-inputField w-[75%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-between relative p-4">
        <input
          className="w-full outline-none"
          placeholder="Type your message here"
          onChange={(e) => handleChange(e)}
        />
        <div onClick={handleSubmit}>
          <Image
            className="cursor-pointer"
            src="/assets/icons/MessageIcon.svg"
            alt=""
            width={21}
            height={21}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPrompt;
