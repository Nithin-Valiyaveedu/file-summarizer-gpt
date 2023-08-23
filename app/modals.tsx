"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@context/UserContex";
import { useProjectContext } from "@context/ProjectContext";
import { authenticationApi } from "@apis/auth/googleAuth";

import { removeUserDataFromLS } from "@utils/crypto";
import ConfirmModal from "@components/modal/ConfirmModal.jsx";
import ViewDocumentModal from "@components/modal/ViewDocument.jsx";
import ModalOuter from "@components/modal/ModalOuter";
import { successToast, errorToast } from "@components/toast";

const Modals = () => {
  const router = useRouter();
  const { logoutModal, setLogoutModal } = useUserContext();
  const [loader, setLoader] = useState(false);
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
      setLoader(true);
      const response = await authenticationApi.logout();
      console.log(response);
      successToast(response.data.message);
      setLogoutModal(false);
      router?.push("/");
      removeUserDataFromLS();
    } catch (error: any) {
      errorToast(error.response.data.error.message);
    } finally {
      setLoader(false);
    }
  };
  return (
    <div>
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
              description: "Logout of Cornerstone",
            }}
            setState={setLogoutModal}
            yesClick={handleLogout}
            loader={loader}
          />
        </ModalOuter>
      )}
      {fileDeleteModal.display && (
        <ModalOuter
          heading="Delete Document"
          blockOutsideClick={false}
          state={fileDeleteModal}
          setState={setFileDeleteModal}
          classNames="hideScrollbar">
          <ConfirmModal
            content={{
              title: "Are you sure you want to delete this Document?",
              description: `Delete ${fileDeleteModal.name}`,
            }}
            setState={setFileDeleteModal}
            yesClick={() => deleteProjectFile()}
          />
        </ModalOuter>
      )}

      {deleteModal.display && (
        <ModalOuter
          heading="Delete Project"
          blockOutsideClick={false}
          state={deleteModal}
          setState={setDeleteModal}
          classNames="hideScrollbar">
          <ConfirmModal
            content={{
              title: "Are you sure you want to delete this project?",
              description: `Delete ${deleteModal.name}`,
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
    </div>
  );
};

export default Modals