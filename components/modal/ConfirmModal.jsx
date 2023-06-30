import React from "react";

const ConfirmModal = ({ setState, content, yesClick }) => {
  return (
    <>
      <div className="text-center bg-white rounded-lg py-4 min-w-fit 500px:w-[400px] px-4 ">
        <h1 className="font-bold text-2xl w-full px-2 mx-auto mt-6">
          {content.title}
        </h1>
        <p className="text-grey2 text-base font-normal my-2 break-normal">
          {content.description}
        </p>
        <div className="flex-center w-full space-x-4 mt-12">
          <button
            className="decline-button"
            onClick={() => setState((state) => !state)}>
            No
          </button>
          <button
            className="confirm-button"
            onClick={yesClick}>
            Yes
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
