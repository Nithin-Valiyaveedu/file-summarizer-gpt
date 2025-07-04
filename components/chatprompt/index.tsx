"use client";

import { useRef, useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import InfiniteScroll from "react-infinite-scroll-component";

import Image from "next/image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { chatPromptApis } from "@apis/chatgpt/chatPrompt";

import AiPrompt from "@components/chatprompt/aiPrompt";
import UserPrompt from "@components/chatprompt/userPrompt";
import { useUserContext } from "@context/UserContex";
import { errorToast, infoToast } from "@components/toast";

const ChatPrompt = ({
  projectId,
  dashboardLoader,
  projectFiles,
}: {
  projectId: any;
  dashboardLoader: boolean;
  projectFiles: boolean;
}) => {
  let limit = 5;
  const { user } = useUserContext();
  const [chatPrompt, setChatPrompt] = useState("");
  const [loader, setLoader] = useState<any>();
  const [chatLog, setChatLog] = useState<any>("");
  const [offset, setOffset] = useState(0);
  const messageEl = useRef<any>(null);

  const scrollToBottom = () => {
    if (messageEl) {
      messageEl.current?.addEventListener("DOMNodeInserted", (event: any) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  };

  const getChatData = async (limit: any, offset: any) => {
    try {
      const response = await chatPromptApis.getChatHistory(
        projectId,
        limit,
        offset
      );
      const { data } = response.data;
      data.rows.forEach((value: any) => {
        let questionHistory = { chatUser: "me", message: value.question };
        let answerHistory = { chatUser: "gpt", message: value.answer };
        setChatLog((chatLog: any) => [
          questionHistory,
          answerHistory,
          ...chatLog,
        ]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChatData(limit, offset);
  }, []);

  const handleChange = (e: any) => {
    const { value } = e.target;
    setChatPrompt(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (chatPrompt.trim() === "") {
      infoToast("Please enter a prompt");
    } else {
      setChatPrompt("");
      setChatLog((chatLog: any) => [
        ...chatLog,
        { chatUser: "me", message: chatPrompt },
      ]);
      let payload = { promt: chatPrompt, history: [] };
      try {
        scrollToBottom();
        setLoader(true);
        const response = await chatPromptApis.getChatResponse(
          payload,
          projectId
        );
        let chatResponse = {
          chatUser: "gpt",
          message: response.data.data.text,
        };
        setChatLog((chatLog: any) => [...chatLog, chatResponse]);
      } catch (error: any) {
        errorToast(error.response.data.error.message);
      } finally {
        setLoader(false);
      }
    }
  };

  const fetchMoreData = async () => {
    getChatData(limit, limit + offset);
    setOffset((offset) => offset + limit);
  };

  return (
    <div>
      {dashboardLoader ? (
        <div className="flex-col flex-center min-h-[90vh]">
          <Skeleton
            circle
            duration={0.75}
            width={53}
            height={53}
          />
          <p className="px-4 py-2 w-1/4 mx-auto">
            <Skeleton
              duration={0.75}
              count={1}
              height={20}
            />
          </p>
        </div>
      ) : (
        <>
          {!projectFiles ? (
            <>
              <div
                id="scrollable"
                ref={messageEl}
                className={`flex ${
                  chatLog.length !== 0 && "overflow-y-auto h-[70vh] mt-6"
                } ${chatLog.length < 5 ? "flex-col" : "flex-col-reverse"}`}>
                {chatLog.length !== 0 ? (
                  <InfiniteScroll
                    inverse={true}
                    dataLength={chatLog.length}
                    next={fetchMoreData}
                    hasMore={true}
                    loader={<></>}
                    scrollableTarget="scrollable">
                    {chatLog.map(
                      ({ chatUser, message }: any, index: number) => (
                        <div
                          key={index}
                          className="mt-4 mb-2">
                          {chatUser === "me" ? (
                            <UserPrompt
                              picture={user.picture}
                              content={message}
                            />
                          ) : (
                            <AiPrompt content={message} />
                          )}
                        </div>
                      )
                    )}
                    {loader && (
                      <SkeletonTheme
                        baseColor="#F5E4DF"
                        highlightColor="#F9F9F9F9"
                        duration={0.75}>
                        <div className="mt-2 w-[70%] mx-auto">
                          <Skeleton height={100} />
                        </div>
                      </SkeletonTheme>
                    )}
                  </InfiniteScroll>
                ) : (
                  <div className="flex-col flex-center min-h-[90vh]">
                    <>
                      <Image
                        src="/assets/icons/PaperIcon.svg"
                        alt=""
                        width={53}
                        height={53}
                      />
                      <p className="text-2xl font-semibold w-1/4 text-center">
                        Your transcripts are ready, start prompting
                      </p>
                    </>
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 rounded-lg bg-white shadow-inputField w-[75%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-between relative p-4">
                  <TextareaAutosize
                    onKeyDown={(e) => {
                      if (e.keyCode == 13 && e.shiftKey == false) {
                        handleSubmit(e);
                      }
                    }}
                    className={`w-full outline-none bg-transparent text-xs overflow-hidden resize-none ${
                      loader && "hover:cursor-not-allowed"
                    }`}
                    placeholder="Type your message here"
                    minRows={1}
                    value={chatPrompt}
                    maxRows={10}
                    disabled={loader}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <div onClick={handleSubmit}>
                    <Image
                      className={`cursor-pointer ${
                        loader && "hover:cursor-not-allowed"
                      }`}
                      src="/assets/icons/MessageIcon.svg"
                      alt=""
                      width={21}
                      height={21}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-col flex-center min-h-[90vh]">
              <Image
                src="/assets/icons/PaperIcon.svg"
                alt=""
                width={53}
                height={53}
              />
              <p className="text-2xl font-semibold w-1/4 text-center">
                Please upload a document to start prompting
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatPrompt;
