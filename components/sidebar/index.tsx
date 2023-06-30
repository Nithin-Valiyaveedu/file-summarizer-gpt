"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUserContext } from "@context/UserContex";

import PrimaryButton from "@components/buttons/PrimaryButton";
import { getUserDetails } from "@utils/crypto";

const Sidebar = () => {
  const router = useRouter();
  const { user, displayLogoutModal } = useUserContext();
  // const userData = getUserDetails();
  const handleClick = () => {
    router.push("/dashboard/create-project");
  };
  const handleLogout = () => {
    displayLogoutModal();
  };

  console.log(user);
  

  return (
    <>
      {user && (
        <div className="relative bg-white admin-leftside-bar">
          <div className="flex flex-col justify-start min-h-[100%]">
            <div className="p-6">
              <Image
                src="/assets/logos/SiteLogo.svg"
                alt=""
                width={65}
                height={36}
              />
            </div>
            <div className="flex flex-col px-6 ">
              <PrimaryButton
                classNames="bg-primary-button text-white"
                text="+ Add new project"
                onClick={handleClick}
              />
              <p
                className="mt-8"
                style={{ color: "#999999" }}>
                My Projects
              </p>
              <div className="flex-center min-h-[430px] ">
                <div className="flex flex-col justify-center items-center">
                  <Image
                    src="/assets/icons/PaperIcon.svg"
                    alt=""
                    width={65}
                    height={36}
                  />
                  <p className="font-semibold w-2/3 text-center">
                    Created projects will appear here
                  </p>
                </div>
              </div>
              <div className="flex-between">
                <div className="flex-center space-x-2 items-center">
                  <Image
                    className="mt-1"
                    src="/assets/icons/TutorialIcon.svg"
                    alt=""
                    width={16}
                    height={15}
                  />
                  <p className="my-0 font-medium">Tutorials</p>
                </div>
                <div className="cursor-pointer">
                  <Image
                    className=""
                    src="/assets/icons/RightArrow.svg"
                    alt=""
                    width={16.25}
                    height={15}
                  />
                </div>
              </div>
            </div>
            <div className="border border-b my-4"></div>
            <div className="flex-between px-6 py-1">
              <div className="flex-center space-x-2 items-center">
                <div className="w-10 h-10 flex-center rounded-full bg-gray-500 p-2">
                  {/* {user.fullName.toUpperCase().charAt(0)} */}
                </div>
                <p>{user.fullName}</p>
              </div>
              <div
                onClick={handleLogout}
                className="cursor-pointer">
                <Image
                  src="/assets/icons/LogoutIcon.svg"
                  alt="logout-icon"
                  width={16.25}
                  height={15}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
