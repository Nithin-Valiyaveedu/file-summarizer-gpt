"use client";

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const ProjectList = ({
  projectList,
  handleDelete,
  getProjectList,
  projectCount,
}: {
  projectList: any;
  handleDelete: (id: string, name: string) => void;
  getProjectList: (limit: number, offset: number, type: string) => void;
  projectCount: number;
}) => {
  let limit = 13;
  const router = useRouter();
  const pathname = usePathname();
  const projectId = pathname.split("/")[3] || "";
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (projectList.length === projectCount) {
      setHasMore(false);
      return;
    }
  }, [projectList]);

  const fetchMoreData = async () => {
    getProjectList(limit, limit + offset, "scroll");
    setOffset((offset) => offset + limit);
  };

  return (
    <>
      {projectList.length !== 0 ? (
        <div
          id="scrollableDiv"
          className="h-[370px] overflow-y-auto">
          <InfiniteScroll
            dataLength={projectCount}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
            scrollableTarget="scrollableDiv">
            {projectList.map(({ projectName, id }: any, index: any) => (
              <div
                key={index}
                className={`relative ${
                  projectId === id ? "bg-gray-300" : "bg-white"
                } flex w-full space-x-2 px-6 py-2 `}>
                <Image
                  src="/assets/icons/FolderIcon.svg"
                  alt=""
                  width={13}
                  height={13}
                />
                {projectId === id && (
                  <div className="absolute w-[10px] bg-primary-button rounded-[15px] h-full top-0 -left-3" />
                )}

                <div
                  className="flex-between w-full cursor-pointer"
                  onClick={() => router.push(`/dashboard/chat-prompt/${id}`)}>
                  <p className="text-sm font-medium oneLineContent w-[90%]">{projectName}</p>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      handleDelete(id, projectName);
                    }}>
                    <Image
                      src="/assets/icons/DeleteIcon.svg"
                      alt=""
                      width={14}
                      height={15}
                    />
                  </div>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      ) : (
        <div className="flex-center min-h-[370px]">
          <div className="flex flex-col justify-center items-center">
            <Image
              src="/assets/icons/PaperIcon.svg"
              alt=""
              width={65}
              height={36}
            />
            <p className="font-semibold w-2/3 text-center">
              Created projects will appear here
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectList;
