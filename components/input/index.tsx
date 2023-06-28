const Input = ({ classNames }: { classNames: String }) => {
  return (
    <input
      className={`${classNames} w-full rounded-lg border border-inputField shadow-inputField px-4 py-2 outline-none focus:ring-gray-400 focus:ring-2 focus:shadow-xl`}
      placeholder="Project Name"
      type="text"
    />
  );
};

export default Input;
