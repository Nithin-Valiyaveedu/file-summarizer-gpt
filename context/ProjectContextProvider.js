"use client"

import { useState, useEffect } from "react"
import { usePathname } from 'next/navigation'
import { ProjectContext } from "./ProjectContext"

import { projectApis } from "../apis/project/projectApis"
import { successToast } from "@components/toast"

const ProjectContextProvider = ({ children }) => {
  const pathname = usePathname()
  const [projectList, setProjectList] = useState([])
  const [deleteModal, setDeleteModal] = useState(false)
  const [projectId, setProjectId] = useState("")

  const displayDeleteModal = (id) => {
    setProjectId(id)
    setDeleteModal(true);
  }
  const addProject = (data) => {
    setProjectList([data, ...projectList])
  }

  const deleteProject = async () => {
    try {
      const response = await projectApis.deleteProject(projectId)
      const { message } = response.data
      successToast(message)
      const filteredData = projectList.filter(item => item.id !== projectId)
      console.log(filteredData);
      setProjectList(filteredData)
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteModal(false);
    }
  }

  useEffect(() => {
    if (pathname !== '/') {
      const getProjectList = async () => {
        const response = await projectApis.viewProjects();
        const { data } = response.data;
        setProjectList(data.rows);
      };
      getProjectList();
    }
  }, [pathname]);


  return (<ProjectContext.Provider value={{ projectList, addProject, deleteModal, setDeleteModal, displayDeleteModal, deleteProject }}>{children}</ProjectContext.Provider>)
}

export default ProjectContextProvider;