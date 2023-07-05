import { createContext, useContext } from "react";

export const ProjectContext = createContext();

export const useProjectContext = () => useContext(ProjectContext)