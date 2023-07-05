export const projectFormValidation = (payload) => {
  const { projectName, projectFiles } = payload
  if (projectName.trim() === "" && projectFiles.length === 0) {
    return "Please fill all fields";
  }
  else if (projectFiles.length !== 0 && projectName.trim() === "") {
    return "Please enter project name";
  }
  else if (projectFiles.length === 0 && projectName.trim() !== "") {
    return "Please upload project files";
  }
  else {
    return ""
  }
}