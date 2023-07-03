const PrimaryButton = ({
  text,
  onClick,
  classNames,
}: {
  text: String;
  onClick?: (e: any) => void;
  classNames: String;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-center border border-buttonBorder p-2 rounded-3xl ${classNames}`}>
      {text}
    </button>
  );
};

export default PrimaryButton;
