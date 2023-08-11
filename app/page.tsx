"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import LoginCard from "@components/cards/LoginCard";
import Image from "next/image";

import { storeUserDetails } from "@utils/crypto";
import { useUserContext } from "../context/UserContex";
import { successToast } from "@components/toast";
import Loader from "@components/loader";
import CustomCarousal from "@components/carousal";
import { getUserDetails } from "@utils/crypto";

const Login = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>("");
  const [loader, setLoader] = useState<boolean>(false);
  const { setUser } = useUserContext();

  useEffect(() => {
    const { authToken } = getUserDetails();
    if (authToken) router.replace("/dashboard");
  }, []);

  useEffect(() => {
    if (userData) {
      storeUserDetails(userData.data);
      setUser(userData.data);
      successToast(userData.message);
    }
  }, [userData]);

  return (
    <>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
        <div className="flex flex-col 850px:flex-row min-h-screen w-full">
          {loader && <Loader />}
          <div className="w-full 850px:w-[80%] p-8">
            <Image
              className=""
              src="/assets/logos/SiteLogo.svg"
              alt=""
              width={65}
              height={36}
            />
            <LoginCard
              setUserData={setUserData}
              header="Sign In"
              description="Let’s get you started with a simple sign in"
              setLoader={setLoader}
            />
          </div>
          <div className=" text-white bg-login-gradient w-full 850px:rounded-l-[21px] p-10 min-h-[100%]">
            <CustomCarousal />
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
};

export default Login;
