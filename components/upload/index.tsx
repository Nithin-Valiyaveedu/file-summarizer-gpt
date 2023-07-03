"use client";

import React, { SetStateAction, Dispatch } from "react";

import { useState } from "react";
import { projectApis } from "@apis/project/projectApis";

import Image from "next/image";

const UploadFile = ({
  filePath,
  setFilePath,
}: {
  filePath: object[];
  setFilePath: Dispatch<SetStateAction<Object[]>>;
}) => {
  const [thumbnailUploadedName, setThumbnailUploadedName] = useState<object[]>(
    []
  );

  const handleUploadImage = async (e: any) => {
    if (e.target.files.length === 1) {
      let formData = new FormData();
      const file = e.target.files[0];
      setThumbnailUploadedName((thumbnailUploadedName) => [
        ...thumbnailUploadedName,
        file.name,
      ]);
      formData.append("documents", file);
      try {
        const result: any = await projectApis.uploadProjectFiles(formData);
        const { data } = result.data;
        setFilePath((filePath) => [...filePath, data.path]);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("221");
      const files = e.target.files;
      Array.from(files).map(async (value: any) => {
        setThumbnailUploadedName((thumbnailUploadedName) => [
          ...thumbnailUploadedName,
          value.name,
        ]);
        let formData = new FormData();
        formData.append("documents", value);
        try {
          const result: any = await projectApis.uploadProjectFiles(formData);
          const { data } = result.data;
          setFilePath((filePath) => [...filePath, data.path]);
        } catch (error) {
          console.log(error);
        }
      });
    }
  };

  return (
    <>
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
        <label className="cursor-pointer flex-center border border-buttonBorder p-2 rounded-3xl mt-2 mx-auto w-1/2 text-primaryColor font-medium">
          <p>Upload File</p>
          <input
            multiple
            type="file"
            id={`UploadFileContainer`}
            accept={"txt/*"}
            onChange={(e) => handleUploadImage(e)}
            className="hidden w-full h-full"
          />
        </label>
        {thumbnailUploadedName.length !== 0 && (
          <>
            <p className="my-1 text-green-500">Uploaded Files</p>
            <div className="text-green-500  w-full flex-center space-x-2">
              {thumbnailUploadedName.map((value: any, index) => (
                <p key={index}>{value}</p>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UploadFile;
