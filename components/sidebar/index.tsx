"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useUserContext } from "@context/UserContex";
import { useProjectContext } from "@context/ProjectContext";

import PrimaryButton from "@components/buttons/PrimaryButton";
import ProjectList from "@components/projectList";

const Sidebar = () => {
  const router = useRouter();
  const { user, displayLogoutModal } = useUserContext();
  const { projectList, displayDeleteModal } = useProjectContext();

  const handleClick = () => {
    router.push("/dashboard/create-project");
  };
  const handleLogout = () => {
    displayLogoutModal();
  };

  const handleDelete = (id: string) => {
    console.log(id);
    displayDeleteModal(id);
  };

  console.log(user);

  return (
    <div className="relative bg-white admin-leftside-bar">
      <div className="flex flex-col justify-start">
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
        </div>
        <p
          className="mt-8 px-6 font-semibold mb-2"
          style={{ color: "#999999" }}>
          My Projects
        </p>
        {user ? (
          <>
            <ProjectList
              projectList={projectList}
              handleDelete={handleDelete}
            />
            <div className="absolute bottom-0 w-full">
              <div className="flex-between px-6">
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

              <div className="border border-b my-4"></div>

              <div className="flex-between px-6 py-1">
                <div className="flex-center space-x-2 items-center">
                  <Image
                    className="rounded-full"
                    src={user.picture}
                    alt="profile-photo"
                    width={40}
                    height={40}
                  />
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
          </>
        ) : (
          <SkeletonTheme highlightColor="#F9F9F9F9">
            <p className="px-4 py-2">
              <Skeleton
                count={6}
                height={20}
              />
            </p>
          </SkeletonTheme>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
