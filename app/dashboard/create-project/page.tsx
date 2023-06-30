"use client";
import Image from "next/image";

import PrimaryButton from "@components/buttons/PrimaryButton";
import Input from "@components/input";
import { useUserContext } from "@context/UserContex";

const CreateProject = () => {
  const { user } = useUserContext();

  const handleClick = () => {
    console.log("hello");
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
        <Input classNames={`mt-4`} />
        <div className="mt-4 border rounded-lg border-dotted border-uploadField  flex-center flex-col shadow-uploadField p-4 min-h-[350px]">
          <Image
            className="mb-4"
            src="/assets/icons/FileIcon.svg"
            alt="Upload Icon"
            width={48}
            height={56}
          />
          <p className="text-base font-medium">Click to upload</p>
          <p className="opacity-60">Supported file type .txt</p>
          <PrimaryButton
            text="Upload"
            classNames="mt-2 mx-auto w-1/2 text-primaryColor font-medium"
            onClick={handleClick}
          />
        </div>
        <PrimaryButton
          text="Add Project"
          classNames="mt-4 mx-auto w-full bg-primary-button text-white"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default CreateProject;
