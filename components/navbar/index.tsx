const Navbar = () => {
  return (
    <>
      <div
        className="bg-white relative w-full h-[70px]"
        style={{ border: "1px solid #E6E6E6" }}>
        <div className="pt-5 md:pt-9 pb-3 xl:pb-7  relative">
          <div className="flex justify-end mr-4">
            <p className="text-xs underline cursor-pointer">Need Help?</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
