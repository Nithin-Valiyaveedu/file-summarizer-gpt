"use client";
import { useRouter } from "next/navigation";
import { useUserContext } from "@context/UserContex";
import { useProjectContext } from "@context/ProjectContext";
import { authenticationApi } from "@apis/auth/googleAuth";

import { removeUserDataFromLS } from "@utils/crypto";

import { successToast } from "@components/toast";
import Navbar from "@components/navbar";
import Sidebar from "@components/sidebar";
import ConfirmModal from "@components/modal/ConfirmModal.jsx";
import ViewDocumentModal from "@components/modal/ViewDocument.jsx";
import ModalOuter from "@components/modal/ModalOuter";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { logoutModal, setLogoutModal } = useUserContext();
  const {
    deleteModal,
    setDeleteModal,
    deleteProject,
    deleteProjectFile,
    projectFilesModal,
    setProjectFilesModal,
    selectedProject,
    fileDeleteModal,
    setFileDeleteModal,
  } = useProjectContext();

  const handleLogout = async () => {
    try {
      const response = await authenticationApi.logout();
      console.log(response);
      successToast(response.data.message);
      setLogoutModal(false);
      router.push("/");
      removeUserDataFromLS();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(fileDeleteModal);

  return (
    <div className="min-h-screen mx-auto bg-dashboard">
      {logoutModal && (
        <ModalOuter
          heading="Logout"
          blockOutsideClick={false}
          state={logoutModal}
          setState={setLogoutModal}
          classNames="hideScrollbar">
          <ConfirmModal
            content={{
              title: "Are you sure you want to logout?",
              description: "Logout of cornerstone",
            }}
            setState={setLogoutModal}
            yesClick={handleLogout}
          />
        </ModalOuter>
      )}
      {fileDeleteModal && (
        <ModalOuter
          heading="Delete Document"
          blockOutsideClick={false}
          state={fileDeleteModal}
          setState={setFileDeleteModal}
          classNames="hideScrollbar">
          <ConfirmModal
            content={{
              title: "Are you sure wants to delete this Document?",
              description: "",
            }}
            setState={setFileDeleteModal}
            yesClick={() => deleteProjectFile()}
          />
        </ModalOuter>
      )}

      {deleteModal && (
        <ModalOuter
          heading="Delete Project"
          blockOutsideClick={false}
          state={deleteModal}
          setState={setDeleteModal}
          classNames="hideScrollbar">
          <ConfirmModal
            content={{
              title: "Are you sure you want to delete this project?",
              description: "",
            }}
            setState={setDeleteModal}
            yesClick={() => deleteProject()}
          />
        </ModalOuter>
      )}
      {projectFilesModal && (
        <ModalOuter
          heading="All Documents"
          blockOutsideClick={false}
          state={projectFilesModal}
          setState={setProjectFilesModal}
          classNames="hideScrollbar">
          <ViewDocumentModal
            selectedProject={selectedProject}
            setState={setProjectFilesModal}
          />
        </ModalOuter>
      )}
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full min-h-screen bg-dashboard relative">
          <Navbar />
          <div className="overflow-x-scroll">
            <div className="min-w-[500px]">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
