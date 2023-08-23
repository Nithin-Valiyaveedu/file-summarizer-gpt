import Image from "next/image";

import LoginCard from "@components/cards/LoginCard";
import GoogleAuth from "@components/GoogleAuth";
import CustomCarousal from "@components/carousal";

const Login = () => {
  return (
    <div className="flex flex-col 850px:flex-row min-h-screen w-full">
      <div className="w-full 850px:w-[80%] p-8">
        <Image
          className=""
          src="/assets/logos/SiteLogo.svg"
          alt=""
          width={65}
          height={36}
        />
        <GoogleAuth>
          <LoginCard
            header="Sign In"
            description="Let’s get you started with a simple sign in"
          />
        </GoogleAuth>
      </div>
      <div className=" text-white bg-login-gradient w-full 850px:rounded-l-[21px] p-10 min-h-[100%]">
        <CustomCarousal />
      </div>
    </div>
  );
};

export default Login;
