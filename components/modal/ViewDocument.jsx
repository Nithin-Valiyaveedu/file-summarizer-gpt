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
        <DocumentUpload
          filePath={filePath}
          setFilePath={setFilePath}
          projectId={projectId}
          setState={setState}
        />
        <div
          id="scrollableDiv"
          className="flex flex-col max-h-[500px] overflow-y-auto pr-2">
          {selectedProject.ProjectFiles.map(({ file, fileName, id }, index) => (
            <div
              key={index}
              className="cursor-pointer relative mt-2"
              onClick={() =>
                window.open(
                  process.env.BACKEND_API_URL +
                    "/common/get-file/?path=" +
                    file,
                  "_blank"
                )
              }>
              <div className="grid grid-cols-3 items-center">
                <Image
                  src="/assets/icons/TextFileIcon.svg"
                  alt=""
                  width={64}
                  height={64}
                />
                <p>{fileName}</p>
                <div
                  className="cursor-pointer bg-default rounded-xl z-50 absolute top-6 right-0 p-0.5 border border-b"
                  onClick={(e) => {
                    e.stopPropagation();
                    displayDeleteFileModal(id, fileName);
                  }}>
                  <Image
                    className=" "
                    src="/assets/icons/DeleteIcon.svg"
                    alt=""
                    width={20}
                    height={30}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewDocumentModal;
