"use client";

import React, { SetStateAction, Dispatch } from "react";
import { useRouter } from "next/navigation";

import { successToast } from "@components/toast";
import { projectApis } from "@apis/project/projectApis";
import { useProjectContext } from "@context/ProjectContext";

const DocumentUpload = ({
  filePath,
  setFilePath,
  projectId,
  setState,
}: {
  filePath: object[];
  setFilePath: Dispatch<SetStateAction<Object[]>>;
  projectId: string;
  setState: Dispatch<SetStateAction<Boolean>>;
}) => {
  const router = useRouter();
  const { setSelectedProject } = useProjectContext();
  const handleUploadImage = async (e: any) => {
    console.log("221");
    const files = e.target.files;
    Array.from(files).map(async (value: any) => {
      let formData = new FormData();
      formData.append("documents", value);
      try {
        const result: any = await projectApis.uploadProjectFiles(formData);
        const { data } = result.data;
        const response = await projectApis.addProjectFiles(
          { projectFiles: [data.path] },
          projectId
        );
        const { message } = result.data;
        successToast(message);
        setState(false);
        // addProjectDocuments(response.data.data);
        const respons = await projectApis.getProjectDetails(projectId);
        console.log("sssssssssssssssssssssssssss", respons);
        const dataResponse = await projectApis.getProjectDetails(projectId);
        let projectData = dataResponse.data;
        setSelectedProject(projectData.data);
        router.push(`/dashboard/chat-prompt/${projectId}`);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <>
      <label className="cursor-pointer text-3xl border-color flex-center">
        +
        <input
          multiple
          type="file"
          id={`UploadFileContainer`}
          accept={"txt/*"}
          onChange={(e) => handleUploadImage(e)}
          className="hidden w-full h-full"
        />
      </label>
    </>
  );
};

export default DocumentUpload;
