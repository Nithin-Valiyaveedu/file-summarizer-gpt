"use client";

import React, { SetStateAction, Dispatch } from "react";
import { useRouter } from "next/navigation";

import { successToast, errorToast } from "@components/toast";
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
  const { setSelectedProject, setCommonLoader } = useProjectContext();
  const handleUploadImage = async (e: any) => {
    const files = e.target.files;
    Array.from(files).map(async (value: any) => {
      let formData = new FormData();
      formData.append("documents", value);
      try {
        setCommonLoader(true);
        const result: any = await projectApis.uploadProjectFiles(formData);
        const { data } = result.data;
        await projectApis.addProjectFiles(
          { projectFiles: [data.path] },
          projectId
        );
        const { message } = result.data;
        successToast(message);
        setState(false);
        await projectApis.getProjectDetails(projectId);
        const dataResponse = await projectApis.getProjectDetails(projectId);
        let projectData = dataResponse.data;
        setSelectedProject(projectData.data);
        router.push(`/dashboard/chat-prompt/${projectId}`);
      } catch (error: any) {
        errorToast(error.response.data.error.message);
      } finally {
        setCommonLoader(false);
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
