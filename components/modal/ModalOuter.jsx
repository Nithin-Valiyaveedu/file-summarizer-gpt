"use-client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

// Used for add click outside, closing functionality of modals
const ModalOuter = ({
  heading,
  state,
  setState,
  children,
  classNames,
  blockOutsideClick,
}) => {
  const [clickedOutside, setClickedOutside] = useState(false);
  const modalRef = useRef();
  const handleClickInside = () => setClickedOutside(false);

  const handleClickOutside = (e) => {
    if (!modalRef.current?.contains(e.target)) {
      if (!blockOutsideClick) {
        setClickedOutside(true);
      }
    }
  };

  useEffect(() => {
    if (clickedOutside) {
      setState(false);
    }
  }, [clickedOutside, setState]);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <>
      {state ? (
        <>
          <div className="flex-center overflow-y-auto rounded-lg fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto rounded-lg">
              <div
                ref={modalRef}
                onClick={handleClickInside}
                className={`${classNames} animate-TopToBottom overflow-y-scroll text-black border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none`}
                style={{
                  maxHeight: "90vh",
                  boxShadow: "0px 3.29846px 12.3692px rgba(0, 0, 0, 0.18)",
                }}>
                <div className="flex-between p-4">
                  <p>{heading}</p>
                  <div
                    className="cursor-pointer flex-center rounded-full p-2 bg-closeCross"
                    onClick={() => setState(false)}>
                    <Image
                      src="/assets/icons/CrossIcon.svg"
                      alt=""
                      width={14}
                      height={14}
                    />
                  </div>
                </div>

                {children}
              </div>
            </div>
          </div>

          <div className="opacity-30 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </>
  );
};

export default ModalOuter;
