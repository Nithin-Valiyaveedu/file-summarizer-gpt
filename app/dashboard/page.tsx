"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@context/UserContex";

import { removeUserDataFromLS } from "@utils/crypto";
// import ViewDocument from "@components/modal/ViewDocument";
import ConfirmModal from "@components/modal/ConfirmModal.jsx";
import ModalOuter from "@components/modal/ModalOuter";
import { authenticationApi } from "@apis/auth/googleAuth";

import { successToast } from "@components/toast";

const DashBoard = () => {
  const router = useRouter();
  const { logoutModal, setLogoutModal } = useUserContext();

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
  return (
    <>
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
    </>
  );
};

export default DashBoard;
