import Image from "next/image";

const ChatPrompt = () => {
  return (
    <div className="absolute bottom-0 rounded-lg z-50 bg-white shadow-inputField w-[75%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-between relative p-4">
        <input
          className="w-full outline-none"
          placeholder="Type your message here"
        />
        <Image
          className=""
          src="/assets/icons/MessageIcon.svg"
          alt=""
          width={21}
          height={21}
        />
      </div>
    </div>
  );
};

export default ChatPrompt;
