"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import ChatPrompt from "@components/chatprompt";
import AiPrompt from "@components/chatprompt/aiPrompt";
import UserPrompt from "@components/chatprompt/userPrompt";
import { useProjectContext } from "@context/ProjectContext";
import { projectApis } from "@apis/project/projectApis";
import { usePathname, useRouter } from "next/navigation";

const PromptPage = () => {
  const { setSelectedProject } = useProjectContext();
  const pathName = usePathname();
  const [promptData, setPromptData] = useState(false);
  const [prompt, setPrompt] = useState<String>("");
  const projectId = pathName.split("/")[3];
  console.log(pathName.split("/")[3]);

  useEffect(() => {
    const getProjectDetails = async () => {
      const result = await projectApis.getProjectDetails(projectId);
      const { data } = result.data;
      setSelectedProject(data);
    };
    try {
      getProjectDetails();
    } catch (error) {}
  }, []);

  return (
    <>
      {prompt ? (
        <div className="overflow-y-scroll h-[75vh]">
          <UserPrompt
            type="sss"
            content={prompt}
          />
          <AiPrompt
            type=""
            content="
        When embarking on an Enterprise Resource Planning (ERP) implementation project, organizations should consider several key factors to ensure a successful implementation. These considerations include:
Requirements Analysis: It is crucial to thoroughly analyze and document the organization's requirements, including functional, technical, and operational needs. This helps in selecting the right ERP system and ensures alignment with the organization's goals and processes.
Vendor Selection: Careful evaluation and selection of an ERP vendor is essential. Organizations should assess the vendor's reputation, industry experience, product capabilities, support services, and long-term viability. Additionally, considering factors such as scalability, integration capabilities, and customization options is vital.
Change Management: ERP implementation often involves significant changes in workflows and processes. Adequate change management strategies should be in place to manage employee resistance, ensure effective communication, and provide sufficient training and support throughout the implementation process.
Data Migration and Integration: Smooth data migration from existing systems to the new ERP is critical. Organizations should plan and execute a comprehensive data migration strategy, considering data mapping, cleansing, and validation. Additionally, integration with other systems (such as CRM, HR, or supply chain) should be carefully planned to ensure seamless data flow.
Customization vs. Configuration: Balancing customization and configuration is essential. Organizations should evaluate whether the ERP system can meet their requirements through configuration (utilizing standard features) or if customizations are necessary. Customizations should be limited to critical business needs to minimize complexity and potential issues during upgrades.
        "
          />
        </div>
      ) : (
        <div className="flex-col flex-center min-h-[90vh]">
          <Image
            src="/assets/icons/PaperIcon.svg"
            alt=""
            width={53}
            height={53}
          />
          <p className="text-sm font-semibold w-1/6 text-center">
            Your transcripts are ready, start prompting
          </p>
        </div>
      )}

      <ChatPrompt setPrompt={setPrompt} />
    </>
  );
};

export default PromptPage;
