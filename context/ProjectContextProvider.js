"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { ProjectContext } from "./ProjectContext"

import { projectApis } from "../apis/project/projectApis"
import { errorToast, infoToast, successToast } from "@components/toast"

const ProjectContextProvider = ({ children }) => {
  const router = useRouter()
  const [projectList, setProjectList] = useState("")
  const [projectCount, setTotalProjectCount] = useState()
  const [selectedProject, setSelectedProject] = useState("")
  const [deleteModal, setDeleteModal] = useState({ display: false, name: "" })
  const [fileDeleteModal, setFileDeleteModal] = useState({ display: false, name: "" })
  const [projectId, setProjectId] = useState("")
  const [fileId, setFileId] = useState("")
  const [projectFilesModal, setProjectFilesModal] = useState(false)
  const [commonLoader, setCommonLoader] = useState(false)
  const [filesNotPresent, setFilesNotPresent] = useState(false)

  const displayDeleteModal = (id, projectName) => {
    setProjectId(id)
    setDeleteModal({ display: true, name: projectName });
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
      errorToast(error.response.data.error.message)
    } finally {
      setDeleteModal(false);
      router?.push("/dashboard")
    }
  }

  const displayDeleteFileModal = (id, fileName) => {
    setProjectFilesModal(false)
    setFileDeleteModal({ display: true, name: fileName });
    setFileId(id)
  }

  const deleteProjectFile = async () => {
    try {
      const response = await projectApis.delteProjectFiles(fileId)
      const { message } = response.data
      successToast(message)
      let { ProjectFiles } = selectedProject
      const filteredData = ProjectFiles.filter(item => item.id !== fileId)
      setSelectedProject({
        ...selectedProject,
        ProjectFiles: filteredData
      })

      setFileDeleteModal(false);
      if (filteredData.length === 0) {
        setFilesNotPresent(true)
        setProjectFilesModal(false)
      }
      else {
        setProjectFilesModal(true)
      }
    } catch (error) {
      errorToast(error.response.data.error.message)
    }
  }

  const getProjectList = async (limit, offset, type = "normal") => {
    const response = await projectApis.viewProjects(limit, offset);
    const { data } = response.data;
    setTotalProjectCount(data.count)
    if (type === "scroll") {
      setProjectList((projectList) => [...projectList, ...data.rows]);
    }
    else {
      setProjectList(data.rows);
    }
  };



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
      addProjectDocuments,
      getProjectList,
      projectCount,
      commonLoader,
      setCommonLoader,
      filesNotPresent,
      setFilesNotPresent,
    }}>
    {children}
  </ProjectContext.Provider>)
}

export default ProjectContextProvider;