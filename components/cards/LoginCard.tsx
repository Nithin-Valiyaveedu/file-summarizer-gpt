import React, { ReactElement } from "react";

interface ButtonProps {
  cardType: "signup" | "login";
  header: string;
  description: string;
}

const LoginCard = ({
  cardType,
  header,
  description,
}: ButtonProps): ReactElement => {
  return (
    <div
      className={`mt-20 ${
        cardType === "signup" ? "bg-signupCard" : "bg-white"
      } w-[95%] p-6 rounded-2xl`}>
      <h1 className="font-medium text-4xl mb-2">{header}</h1>
      <p className="text-sm opacity-40">{description}</p>
      <button className="bg-white shadow-loginButton p-4 w-full mt-24 850px:w-[55%] border rounded-md border-loginButton">
        {cardType === "signup" ? "Sign up with Google" : "Login with Google"}
      </button>
    </div>
  );
};

export default LoginCard;
