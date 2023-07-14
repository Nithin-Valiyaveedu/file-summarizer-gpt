"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

import DocumentUpload from "@components/upload/fileUpload";

import Image from "next/image";
import { useProjectContext } from "@context/ProjectContext";

const ViewDocumentModal = ({ selectedProject, setState }) => {
  const pathname = usePathname();
  const projectId = pathname.split("/")[3] || "";
  const [filePath, setFilePath] = useState([]);
  const { displayDeleteFileModal } = useProjectContext();

  return (
    <>
      <div className="text-center bg-white rounded-lg py-4 min-w-fit 500px:w-[400px] px-4 ">
        <div className="grid grid-cols-4 gap-2">
          <DocumentUpload
            filePath={filePath}
            setFilePath={setFilePath}
            projectId={projectId}
            setState={setState}
          />
          {selectedProject.ProjectFiles.map(({ file, fileName, id }, index) => (
            <div
              key={index}
              className="cursor-pointer relative"
              onClick={() =>
                window.open(
                  process.env.BACKEND_API_URL +
                    "/common/get-file/?path=" +
                    file,
                  "_blank"
                )
              }>
              <Image
                src="/assets/icons/TextFileIcon.svg"
                alt=""
                width={64}
                height={64}
              />

              <div
                className="cursor-pointer bg-default rounded-xl z-50 absolute -bottom-1 right-2 p-0.5 border border-b"
                onClick={(e) => {
                  e.stopPropagation();
                  displayDeleteFileModal(id, fileName);
                }}>
                <Image
                  className=" "
                  src="/assets/icons/DeleteIcon.svg"
                  alt=""
                  width={15}
                  height={20}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewDocumentModal;
