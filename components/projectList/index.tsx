import Loader from "@components/loader";
import Image from "next/image";

import { useRouter, usePathname } from "next/navigation";

const ProjectList = ({
  projectList,
  handleDelete,
}: {
  projectList: any;
  handleDelete: (id: string) => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  console.log(projectList);
  const projectId = pathname.split("/")[3] || "";

  return (
    <>
      {projectList ? (
        <>
          {projectList.length !== 0 ? (
            <div className="min-h-[70vh] ">
              <p
                className="mt-8 px-6 font-semibold mb-2"
                style={{ color: "#999999" }}>
                My Projects
              </p>

              {projectList.map(({ projectName, id }: any, index: any) => (
                <div
                  key={index}
                  className={`relative ${
                    projectId === id ? "bg-projectClicked opacity-[50%]" : "bg-white"
                  } flex w-full space-x-2 px-4 py-2 `}>
                  <Image
                    src="/assets/icons/FolderIcon.svg"
                    alt=""
                    width={13}
                    height={13}
                  />
                  {projectId === id && (
                    <div className="absolute w-[10px] bg-primary-button rounded-[15px] h-full top-0 -left-4" />
                  )}

                  <div
                    className="flex-between w-full cursor-pointer"
                    onClick={() => router.push(`/dashboard/chat-prompt/${id}`)}>
                    <p className="text-sm font-medium">{projectName}</p>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        handleDelete(id);
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
            </div>
          ) : (
            <div className="flex-center min-h-[500px] ">
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
      ) : (
        <Loader classNames="min-h-[500px]" />
      )}
    </>
  );
};

export default ProjectList;
