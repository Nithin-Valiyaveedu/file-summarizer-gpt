const UserPrompt = ({ type, content }: { type: String; content: String }) => {
  return (
    <>
      <div className="relative flex w-[70%] mx-auto mt-16 rounded-lg">
        <div className="absolute -left-12 w-10 h-10 flex-center bg-slate-500 rounded-full">A</div>
        <div className="bg-shadow w-full p-4 bg-white">{content}</div>
      </div>
    </>
  );
};

export default UserPrompt;
