"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useUserContext } from "@context/UserContex";
import { useProjectContext } from "@context/ProjectContext";

import PrimaryButton from "@components/buttons/PrimaryButton";
import ProjectList from "@components/projectList";
import { infoToast } from "@components/toast";

const Sidebar = () => {
  const router = useRouter();

  const { user, displayLogoutModal } = useUserContext();
  const { projectList, displayDeleteModal, getProjectList, projectCount } =
    useProjectContext();

  useEffect(() => {
    getProjectList(13, 0, "normal");
  }, []);

  const handleClick = () => {
    router?.push("/dashboard/create-project");
  };
  const handleLogout = () => {
    displayLogoutModal();
  };

  const handleDelete = (id: string, projectName: string) => {
    displayDeleteModal(id, projectName);
  };

  return (
    <div className="relative bg-white admin-leftside-bar">
      <div className="flex flex-col justify-start">
        <Link
          href="/dashboard"
          className="p-6 w-fit">
          <Image
            src="/assets/logos/SiteLogo.svg"
            alt=""
            width={38}
            height={20}
          />
        </Link>
        <Link href="/dashboard/create-project">
          <div className="flex flex-col px-6 ">
            <PrimaryButton
              classNames="bg-primary-button text-white"
              text="+ Add new project"
              onClick={handleClick}
            />
          </div>
        </Link>
        <p
          className="mt-8 px-6 font-semibold mb-2"
          style={{ color: "#999999" }}>
          My Projects
        </p>
        {projectList ? (
          <>
            <ProjectList
              projectList={projectList}
              handleDelete={handleDelete}
              getProjectList={getProjectList}
              projectCount={projectCount}
            />
          </>
        ) : (
          <SkeletonTheme
            duration={0.75}
            highlightColor="#F9F9F9F9">
            <p className="px-4 py-2">
              <Skeleton
                count={6}
                height={20}
              />
            </p>
          </SkeletonTheme>
        )}
      </div>
      <div className="absolute bottom-0 w-full">
        <Link
          href="/dashboard/example-prompt"
          className="px-6 mb-2 hover:underline cursor-pointer hover:text-primaryColor font-medium">
          <p className="px-6 mb-2 hover:underline cursor-pointer hover:text-primaryColor font-medium">
            Example Prompt
          </p>
        </Link>

        <div className="flex-between px-6">
          <div className="flex-center space-x-2 items-center">
            <Image
              className="mt-1"
              src="/assets/icons/TutorialIcon.svg"
              alt=""
              width={16}
              height={15}
            />
            <p className="font-medium">Tutorials</p>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              infoToast("Coming Soon");
            }}>
            <Image
              className=""
              src="/assets/icons/RightArrow.svg"
              alt=""
              width={16.25}
              height={15}
            />
          </div>
        </div>

        <div className="border border-b my-4 "></div>

        <div className="flex-between px-6 py-2 my-3">
          <div className="flex-center space-x-2 items-center">
            {user && (
              <img
                className="rounded-full"
                src={user.picture}
                alt="profile-photo"
                width={40}
                height={40}
              />
            )}

            <p className="font-medium">{user.fullName}</p>
          </div>

          <div
            onClick={handleLogout}
            className="cursor-pointer">
            <Image
              src="/assets/icons/LogoutIcon.svg"
              alt="logout-icon"
              width={20}
              height={16.25}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
