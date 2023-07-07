"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import ChatPrompt from "@components/chatprompt";
import { useProjectContext } from "@context/ProjectContext";
import { projectApis } from "@apis/project/projectApis";

const PromptPage = () => {
  const { setSelectedProject } = useProjectContext();
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
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <ChatPrompt projectId={projectId} />
    </>
  );
};

export default PromptPage;
