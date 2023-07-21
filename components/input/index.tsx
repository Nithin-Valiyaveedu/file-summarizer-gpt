const Input = ({
  classNames,
  name,
  placeholder,
  onChange,
  limit,
}: {
  classNames: string;
  name: string;
  placeholder: string;
  onChange: Function;
  limit?: number;
}) => {
  return (
    <input
      maxLength={limit}
      name={name}
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
      className={`${classNames} w-full rounded-lg border border-inputField shadow-inputField px-4 py-2 text-xs outline-none focus:ring-gray-400 focus:ring-2 focus:shadow-xl`}
    />
  );
};

export default Input;
