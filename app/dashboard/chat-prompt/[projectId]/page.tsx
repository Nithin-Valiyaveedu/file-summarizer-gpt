"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import ChatPrompt from "@components/chatprompt";
import { useProjectContext } from "@context/ProjectContext";
import { projectApis } from "@apis/project/projectApis";
import Loader from "@components/loader";
import { errorToast } from "@components/toast";

const PromptPage = () => {
  const { commonLoader, setSelectedProject } = useProjectContext();
  const pathName = usePathname();
  const projectId = pathName.split("/")[3];

  useEffect(() => {
    const getProjectDetails = async () => {
      const result = await projectApis.getProjectDetails(projectId);
      const { data } = result.data;
      setSelectedProject(data);
    };
    try {
      getProjectDetails();
    } catch (error: any) {
      errorToast(error.response.data.error.message);
    }
  }, []);

  return (
    <>
      {commonLoader && <Loader />}
      <ChatPrompt projectId={projectId} />
    </>
  );
};

export default PromptPage;
