"use client";

import React, { useEffect, useState } from "react";
import { useUserContext } from "@context/UserContex";
import { storeUserDetails } from "@utils/crypto";

import { ReactElement, SetStateAction, Dispatch } from "react";
import Image from "next/image";

import { authenticationApi } from "../../apis/auth/googleAuth";

import { successToast } from "@components/toast";
import Loader from "@components/loader";

interface ButtonProps {
  header: string;
  description: string;
  // setUserData: Dispatch<SetStateAction<Object>>;
  // setLoader: Dispatch<SetStateAction<boolean>>;
}

import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { errorToast } from "@components/toast";

const LoginCard = ({ header, description }: ButtonProps): ReactElement => {
  const router = useRouter();
  // const [userData, setUserData] = useState<any>("");
  const [loader, setLoader] = useState<boolean>(false);
  const { setUser } = useUserContext();
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      let payload = { idToken: response.access_token };
      try {
        setLoader(true);
        const result: any = await authenticationApi.googleAuth(payload);
        storeUserDetails(result.data.data);
        setUser(result.data.data);
        successToast(result.data.message);
        router?.push("/dashboard");
      } catch (error: any) {
        errorToast(error.response.data.error.message);
      } finally {
        setLoader(false);
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <>
      {loader && <Loader />}
      <div className="text-center mt-20 bg-signupCard w-full 2xl:w-[85%] p-6 rounded-2xl">
        <h1 className="font-medium text-4xl mt-2 mb-2">{header}</h1>
        <p className="text-sm opacity-40 mt-4">{description}</p>

        <button
          onClick={() => login()}
          className="bg-white shadow-loginButton mx-auto p-4 flex-center space-x-2 w-full mt-20 xl:w-[55%] border rounded-md border-loginButton">
          <Image
            className="mx-2"
            src="/assets/icons/GoogleIcon.svg"
            alt=""
            width={30}
            height={30}
          />
          Login with Google
        </button>
      </div>
    </>
  );
};

export default LoginCard;
