"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import ChatPrompt from "@components/chatprompt";
import { useProjectContext } from "@context/ProjectContext";
import { projectApis } from "@apis/project/projectApis";
import Loader from "@components/loader";
import { errorToast, infoToast } from "@components/toast";

const PromptPage = () => {
  const {
    commonLoader,
    setSelectedProject,
    setFilesNotPresent,
    filesNotPresent,
  } = useProjectContext();
  const pathName = usePathname();
  const projectId = pathName.split("/")[3];
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getProjectDetails = async () => {
      try {
        const result = await projectApis.getProjectDetails(projectId);
        const { data } = result.data;
        if (data.ProjectFiles.length === 0) {
          setFilesNotPresent(true);
        }
        setSelectedProject(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    try {
      getProjectDetails();
    } catch (error: any) {
      errorToast(error.response.data.error.message);
    }
  }, [filesNotPresent]);

  return (
    <>
      {commonLoader && <Loader text="Intiatiation..." />}
      <ChatPrompt
        projectFiles={filesNotPresent}
        dashboardLoader={loader}
        projectId={projectId}
      />
    </>
  );
};

export default PromptPage;
