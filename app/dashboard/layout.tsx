"use client";

import Navbar from "@components/navbar";
import Sidebar from "@components/sidebar";

import ConfirmModal from "@components/modal/ConfirmModal.jsx";
import ModalOuter from "@components/modal/ModalOuter";
import { useUserContext } from "@context/UserContex";
import { useProjectContext } from "@context/ProjectContext";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logoutModal, setLogoutModal } = useUserContext();
  const { deleteModal, setDeleteModal, deleteProject } = useProjectContext();

  return (
    <div className="min-h-screen mx-auto bg-dashboard">
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
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full min-h-screen bg-dashboard relative">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
}
