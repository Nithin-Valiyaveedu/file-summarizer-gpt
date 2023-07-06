"use client"

import { useState, useEffect } from "react"
import { usePathname } from 'next/navigation'
import { ProjectContext } from "./ProjectContext"

import { projectApis } from "../apis/project/projectApis"
import { successToast } from "@components/toast"

const ProjectContextProvider = ({ children }) => {
  const pathname = usePathname()
  const [projectList, setProjectList] = useState()
  const [selectedProject, setSelectedProject] = useState("")
  const [deleteModal, setDeleteModal] = useState(false)
  const [fileDeleteModal, setFileDeleteModal] = useState(false)
  const [projectId, setProjectId] = useState("")
  const [fileId, setFileId] = useState("")
  const [projectFilesModal, setProjectFilesModal] = useState(false)

  const displayDeleteModal = (id) => {
    setProjectId(id)
    setDeleteModal(true);
  }
  const addProject = (data) => {
    setProjectList([data, ...projectList])
  }

  const addProjectDocuments = (data) => {
    setSelectedProject({
      ...selectedProject,
      ProjectFiles: [...data]
    })
  }

  const deleteProject = async () => {
    try {
      const response = await projectApis.deleteProject(projectId)
      const { message } = response.data
      successToast(message)
      const filteredData = projectList.filter(item => item.id !== projectId)
      setProjectList(filteredData)
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteModal(false);
    }
  }

  const displayDeleteFileModal = (id) => {
    setProjectFilesModal(false)
    setFileDeleteModal(true);
    setFileId(id)
  }

  const deleteProjectFile = async () => {
    try {
      const response = await projectApis.delteProjectFiles(fileId)
      const { message } = response.data
      console.log(response);
      successToast(message)
      console.log(selectedProject.ProjectFiles);
      let { ProjectFiles } = selectedProject
      const filteredData = ProjectFiles.filter(item => item.id !== fileId)
      setSelectedProject({
        ...selectedProject,
        ProjectFiles: filteredData
      })
    } catch (error) {
      console.log(error);
    } finally {
      setFileDeleteModal(false);
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


  return (<ProjectContext.Provider
    value={{
      projectList,
      setProjectList,
      addProject,
      deleteModal,
      setDeleteModal,
      displayDeleteModal,
      deleteProject,
      selectedProject,
      setSelectedProject,
      projectFilesModal,
      setProjectFilesModal,
      fileDeleteModal,
      setFileDeleteModal,
      displayDeleteFileModal,
      deleteProjectFile,
      addProjectDocuments
    }}>
    {children}
  </ProjectContext.Provider>)
}

export default ProjectContextProvider;