import Image from "next/image";

import { useProjectContext } from "@context/ProjectContext";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const { selectedProject, setProjectFilesModal } = useProjectContext();
  let pathLength = pathname.split("/");

  return (
    <>
      <div
        className="bg-white relative w-full h-[70px] flex items-center justify-between"
        style={{ border: "1px solid #E6E6E6" }}>
        <div className="flex ml-8 space-x-2">
          {pathLength.length > 3 && (
            <>
              <Image
                src="/assets/icons/YellowFileIcon.svg"
                alt=""
                width={13}
                height={11}
              />
              <p className="text-sm font-medium">
                {selectedProject.projectName}
              </p>
            </>
          )}
        </div>

        <div className="flex items-center space-x-4 justify-end mr-4">
          {pathLength.length > 3 && (
            <button
              onClick={() => setProjectFilesModal(true)}
              className="rounded-xl bg-default">
              <p className="gradient-text px-3 cursor-pointer py-1 text-xs font-medium">
                View Documents
              </p>
            </button>
          )}
          <p className="text-xs underline cursor-pointer">Need Help?</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
