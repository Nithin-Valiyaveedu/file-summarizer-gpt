import { ReactElement, SetStateAction, Dispatch } from "react";
import Image from "next/image";

import { authenticationApi } from "../../apis/auth/googleAuth";

interface ButtonProps {
  header: string;
  description: string;
  setUserData: Dispatch<SetStateAction<Object>>;
  setLoader: Dispatch<SetStateAction<boolean>>;
}

import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { errorToast } from "@components/toast";

const LoginCard = ({
  header,
  description,
  setUserData,
  setLoader,
}: ButtonProps): ReactElement => {
  const router = useRouter();
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      let payload = { idToken: response.access_token };
      try {
        setLoader(true);
        const result: any = await authenticationApi.googleAuth(payload);
        router.replace("/dashboard");
        setUserData(result.data);
      } catch (error: any) {
        errorToast(error.response.data.error.message);
      } finally {
        setLoader(false);
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
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
  );
};

export default LoginCard;
