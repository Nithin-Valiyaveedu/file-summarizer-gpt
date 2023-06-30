import React, { ReactElement, SetStateAction, Dispatch } from "react";
import Image from "next/image";

import { authenticationApi } from "../../apis/auth/googleAuth";

interface ButtonProps {
  cardType: "signup" | "login";
  header: string;
  description: string;
  setUserData: Dispatch<SetStateAction<Object>>;
}

import { useGoogleLogin } from "@react-oauth/google";

const LoginCard = ({
  cardType,
  header,
  description,
  setUserData,
}: ButtonProps): ReactElement => {
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      let payload = { idToken: response.access_token };
      try {
        // setIsLoading(true);
        const result: any = await authenticationApi.googleAuth(payload);
        setUserData(result.data);
        // setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        // setIsLoading(false);
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <div
      className={`mt-20 ${
        cardType === "signup" ? "bg-signupCard" : "bg-white"
      } w-[95%] p-6 rounded-2xl`}>
      <h1 className="font-medium text-4xl mb-2">{header}</h1>
      <p className="text-sm opacity-40">{description}</p>

      <button
        onClick={() => login()}
        className="bg-white shadow-loginButton p-4 flex-center space-x-2 w-full mt-24 850px:w-[55%] border rounded-md border-loginButton">
        <Image
          className="mx-2"
          src="/assets/icons/GoogleIcon.svg"
          alt=""
          width={30}
          height={30}
        />
        {cardType === "signup" ? "Sign up with Google" : "Login with Google"}
      </button>
    </div>
  );
};

export default LoginCard;
