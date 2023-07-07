
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (<>
    <div className={`fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 opacity-70 inset-0 bg-black flex-col flex-center`}>
      <ClipLoader color="#BE7627" />
    </div>
    <div className="opacity-30 fixed inset-0 z-40 bg-black" />

  </>)
}

export default Loader