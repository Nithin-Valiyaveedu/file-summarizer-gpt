import Image from "next/image";

const AiPrompt = ({ type, content }: { type: String; content: String }) => {
  return (
    <>
      <div className="relative flex w-[70%] mx-auto mt-4">
        <div className="bg-shadow w-full p-2 bg-answerPrompt rounded-lg">{content}</div>
        <div className="absolute -right-12 flex-center p-2 w-10 h-10 bg-white rounded-full">
          <Image
            src="/assets/logos/SiteLogo.svg"
            alt=""
            width={26}
            height={14}
          />
        </div>
      </div>
    </>
  );
};

export default AiPrompt;
