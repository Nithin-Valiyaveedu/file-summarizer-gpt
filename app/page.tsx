"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import LoginCard from "@components/cards/LoginCard";
import Image from "next/image";

const Login = () => {
  return (
    <>
      <div className="flex flex-col 850px:flex-row min-h-screen w-full">
        <div className="w-full p-8">
          <Image
            className="my-8"
            src="/assets/logos/SiteLogo.svg"
            alt=""
            width={65}
            height={36}
          />
          <LoginCard
            cardType="signup"
            header="Sign Up"
            description="Let’s get you started with a simple sign up"
          />
        </div>
        <div className="text-white bg-login-gradient 850px:w-[50%] xl:w-[70%] 850px:rounded-l-[21px] p-10">
          <Carousel
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            autoPlay={false}
            infiniteLoop={true}
            renderIndicator={(onClickHandler, isSelected, index, label) => {
              return (
                <span
                  className={`mr-4 px-3 py-2 rounded-full ${
                    isSelected
                      ? "border border-white text-white"
                      : "border border-gray-500 text-gray-500"
                  }`}
                  onClick={onClickHandler}
                  onKeyDown={onClickHandler}
                  key={index}
                  role="button"
                  tabIndex={0}
                  aria-label={`${label} ${index + 1}`}>
                  {index}
                </span>
              );
            }}>
            <div className="text-left h-[85vh] ">
              <div className="bg-youtubCard w-full xl:w-[60%] p-2 rounded-lg mt-8 h-1/2">
                <iframe
                  height="100%"
                  width="100%"
                  src="https://www.youtube.com/embed/QH2-TGUlwu4?fs=0&color=white&controls=0&disablekb=1"
                  title="A YouTube video"></iframe>
              </div>
              <div className="flex items-center space-x-2 mt-2 hover:underline cursor-pointer ">
                <div>
                  <Image
                    src="/assets/icons/YoutubeIcon.svg"
                    alt=""
                    width={38}
                    height={28}
                  />
                </div>
                <p>Watch on Youtube</p>
              </div>

              <h1 className="text-3xl mt-4 w-2/5">
                Business Process Reengineering
              </h1>
              <p className="mt-4 opacity-50">
                Find all the details about reengineering you business
              </p>
            </div>
            <div className="text-left h-[85vh] ">
              <div className="bg-youtubCard w-[60%] p-2 rounded-lg mt-8 h-1/2">
                <iframe
                  height="100%"
                  width="100%"
                  src="https://www.youtube.com/embed/QH2-TGUlwu4?fs=0&color=white&controls=0&disablekb=1"
                  title="A YouTube video"></iframe>
              </div>
              <div className="flex items-center space-x-2 mt-2 hover:underline cursor-pointer ">
                <div>
                  <Image
                    src="/assets/icons/YoutubeIcon.svg"
                    alt=""
                    width={38}
                    height={28}
                  />
                </div>
                <p>Watch on Youtube</p>
              </div>

              <h1 className="text-3xl mt-4 w-2/5">
                Business Process Reengineering
              </h1>
              <p className="mt-4 opacity-50">
                Find all the details about reengineering you business
              </p>
            </div>
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Login;
