import ReactMarkdown from "react-markdown";
import Image from "next/image";

import remarkBreaks from "remark-breaks";

const AiPrompt = ({ content }: { content: any }) => {
  const source = content.replace(/\n/gi, "\n &nbsp;");
  return (
    <>
      <div className="relative flex w-[70%] mx-auto mt-4">
        <ReactMarkdown
          className="bg-shadow p-2 bg-answerPrompt rounded-lg words w-full "
          remarkPlugins={[remarkBreaks]}>
          {source}
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
