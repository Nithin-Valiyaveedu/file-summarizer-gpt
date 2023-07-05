
import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({classNames}) => {
  return (
    <div className={`flex-center ${classNames}`}>
      <ClipLoader color="#BE7627" />
    </div>
  )
}

export default Loader