"use client";

import { useRef, useEffect, useState } from "react";

import Image from "next/image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { chatPromptApis } from "@apis/chatgpt/chatPrompt";

import AiPrompt from "@components/chatprompt/aiPrompt";
import UserPrompt from "@components/chatprompt/userPrompt";

const ChatPrompt = ({ projectId }: { projectId: string }) => {
  const [chatPrompt, setChatPrompt] = useState("");
  const [loader, setLoader] = useState<any>();
  const [chatLog, setChatLog] = useState<any[]>([]);
  const bottomRef = useRef<any>(null);

  const handleChange = (e: any) => {
    const { value } = e.target;
    setChatPrompt(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setChatPrompt("");
    setChatLog((chatLog) => [...chatLog, { user: "me", message: chatPrompt }]);
    let payload = { promt: chatPrompt, history: [] };
    try {
      setLoader(true);
      const response = await chatPromptApis.getChatResponse(payload, projectId);
      let chatResponse = { user: "gpt", message: response.data.data.text };
      setChatLog((chatLog) => [...chatLog, chatResponse]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="">
      {chatLog.length !== 0 ? (
        <div className="overflow-y-scroll h-[75vh] mt-6">
          {chatLog.map(({ user, message }, index) => (
            <div
              key={index}
              className="mt-4 mb-2">
              {user === "me" ? (
                <UserPrompt content={message} />
              ) : (
                <AiPrompt content={message} />
              )}
            </div>
          ))}
          {loader && (
            <SkeletonTheme
              baseColor="#F5E4DF"
              highlightColor="#F9F9F9F9">
              <div className="mt-2 w-[70%] mx-auto">
                <Skeleton height={100} />
              </div>
            </SkeletonTheme>
          )}
        </div>
      ) : (
        <div className="flex-col flex-center min-h-[90vh]">
          <Image
            src="/assets/icons/PaperIcon.svg"
            alt=""
            width={53}
            height={53}
          />
          <p className="text-sm font-semibold w-1/6 text-center">
            Your transcripts are ready, start prompting
          </p>
        </div>
      )}
      <div className="absolute bottom-0 rounded-lg bg-white shadow-inputField w-[75%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-between relative p-4">
            <input
              disabled={loader}
              className="w-full outline-none bg-transparent"
              placeholder="Type your message here"
              value={chatPrompt}
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
        </form>
      </div>
    </div>
  );
};

export default ChatPrompt;
