import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

const AiPrompt = ({ content }: { content: any }) => {
  return (
    <>
      <div className="relative flex w-[70%] mx-auto mt-4">
        <ReactMarkdown
          className="bg-shadow p-2 bg-answerPrompt rounded-lg words w-full"
          remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>

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
