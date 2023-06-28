"use client";

import React, { useState } from "react";

import ViewDocument from "@components/modal/ViewDocument";
import ConfirmModal from "@components/modal/ConfirmModal.jsx";
import ModalOuter from "@components/modal/ModalOuter";
import ViewDocumentModal from "@components/modal/ViewDocument";

const DashBoard = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(true);

  return (
    <>
      {showLogoutModal && (
        <ModalOuter
          heading="Delete Project"
          blockOutsideClick={false}
          state={showLogoutModal}
          setState={setShowLogoutModal}
          classNames="hideScrollbar">
          <ViewDocumentModal setState={setShowLogoutModal} />
        </ModalOuter>
      )}
    </>
  );
};

export default DashBoard;
