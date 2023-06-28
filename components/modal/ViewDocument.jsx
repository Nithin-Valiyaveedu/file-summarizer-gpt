"use client";

import Image from "next/image";

const ViewDocumentModal = ({ setState }) => {
  return (
    <>
      <div className="text-center bg-white rounded-lg py-4 min-w-fit 500px:w-[400px] px-4 ">
        <div className="flex space-x-4">
          <button
            // style={{borderColor:"#BE7627"}}
            className="text-3xl border-color flex-center">
            +
          </button>
          <div className="relative">
            <Image
              src="/assets/icons/TextFileIcon.svg"
              alt=""
              width={64}
              height={64}
            />
            <div className="cursor-pointer bg-default rounded-xl z-50 absolute -bottom-1 -right-2 p-0.5 border border-b">
              <Image
                className=" "
                src="/assets/icons/DeleteIcon.svg"
                alt=""
                width={15}
                height={20}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDocumentModal;
