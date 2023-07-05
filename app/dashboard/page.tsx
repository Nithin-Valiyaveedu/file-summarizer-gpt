"use client";

import { useEffect } from "react";

import { projectApis } from "@apis/project/projectApis";
import { useProjectContext } from "@context/ProjectContext";

const DashBoard = () => {
  const { setProjectList } = useProjectContext();

  useEffect(() => {
    const getProjectList = async () => {
      const response = await projectApis.viewProjects();
      const { data } = response.data;
      setProjectList(data.rows);
    };
    getProjectList();
  }, []);
  return <>{/* <Loader classNames="min-h-[90vh]" /> */}</>;
};

export default DashBoard;
