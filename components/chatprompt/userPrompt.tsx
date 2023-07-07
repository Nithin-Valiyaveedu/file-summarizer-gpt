import Image from "next/image";

const UserPrompt = ({
  picture,
  content,
}: {
  picture: any;
  content: String;
}) => {
  return (
    <>
      <div className="relative flex w-[70%] mx-auto rounded-lg">
        <Image
          className="absolute -left-12 w-10 h-10  rounded-full"
          src={picture}
          alt="profile-photo"
          width={100}
          height={100}
        />

        <div className="bg-shadow w-full p-4 bg-white">{content}</div>
      </div>
    </>
  );
};

export default UserPrompt;
