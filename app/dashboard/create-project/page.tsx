"use client";
import { useState } from "react";

import { useUserContext } from "@context/UserContex";
import { useProjectContext } from "@context/ProjectContext";
import { useRouter } from "next/navigation";

import PrimaryButton from "@components/buttons/PrimaryButton";
import Input from "@components/input";
import UploadFile from "@components/upload";
import { projectApis } from "@apis/project/projectApis";
import { errorToast, successToast } from "@components/toast";
import { projectFormValidation } from "@utils/formValidation";

const CreateProject = () => {
  const router = useRouter();
  const { user } = useUserContext();
  const { projectList, addProject } = useProjectContext();
  const [formData, setFormData] = useState("");
  const [filePath, setFilePath] = useState<object[]>([]);

  const handleSubmit = async () => {
    let payload = {
      projectName: formData,
      projectFiles: filePath,
    };
    const formError: any = projectFormValidation(payload);
    if (formError !== "") {
      errorToast(formError);
    } else {
      try {
        const result: any = await projectApis.addProject(payload);
        const { data, message } = result.data;
        successToast(message);
        addProject(data);
        router.push("/dashboard/chat-prompt");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex justify-center mt-8 mb-2">
      <div className="w-full 850px:w-1/2 2xl:w-1/3 py-4 px-6 border border-primaryBorder shadow-createProject rounded-md bg-white">
        <p className="text-secondary">
          Hello, <b className="text-black font-medium">{user.fullName}</b>
        </p>
        <p className="mt-12 text-2xl font-semibold">
          <span className="text-primaryColor text-xl font-bold">+</span> New
          Project
        </p>
        <p className="text-sm opacity-[50%]">Start by uploading project file</p>
        <Input
          classNames={`mt-4`}
          name="projectName"
          placeholder="Project Name"
          onChange={(e: any) => setFormData(e.target.value)}
        />
        <UploadFile
          filePath={filePath}
          setFilePath={setFilePath}
        />
        <PrimaryButton
          text="Add Project"
          classNames="mt-4 mx-auto w-full bg-primary-button text-white"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateProject;
