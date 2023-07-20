"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const CustomCarousal = () => {
  // const [selected, setSelected] = useState<number>(0);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [loader, setLoader] = useState<boolean>(true);
  const [sliderValues, setSliderValues] = useState<object[]>([
    {
      name: "How to Start a Business",
      desc: "Find all the details about reengineering you business",
      src: "https://www.youtube.com/embed/awnn-bqV_Tw?fs=0&color=white&controls=0&disablekb=1",
    },
    {
      name: "Business Process Reengineering",
      desc: "Find all the details about reengineering you business",
      src: "https://www.youtube.com/embed/awnn-bqV_Tw?fs=0&color=white&controls=0&disablekb=1",
    },
    {
      name: "Business Process Reengineering",
      desc: "Find all the details about reengineering you business",
      src: "https://www.youtube.com/embed/awnn-bqV_Tw?fs=0&color=white&controls=0&disablekb=1",
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 500);
  });

  useEffect(() => {
    const slide: any = document.querySelectorAll("#slide");
    slide.forEach((slid: any, indx: any) => {
      slid.style.transform = `translateX(${(indx - activeIndex) * 100}%)`;
    });
  }, [activeIndex]);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      <div className="relative text-left h-[80vh] w-full">
        <div className="slides ">
          <div className="flex">
            {sliderValues.map((item: any, index) => {
              let watchOnYoutube = item.src.split("/")[4].split("?")[0];
              return (
                <>
                  <div
                    className={`slide ${
                      activeIndex !== index ? "md:opacity-50 md:ml-10" : ""
                    }
                ${loader && activeIndex !== index && "hidden"}`}
                    key={index}
                    id="slide">
                    <div className="bg-youtubCard w-full p-2 rounded-lg mt-8 h-1/2">
                      <iframe
                        height="100%"
                        width="100%"
                        src={item.src}
                        title="A YouTube video"></iframe>
                    </div>
                    <div className="flex items-center space-x-2 mt-8 hover:underline cursor-pointer w-fit">
                      <div>
                        <Image
                          src="/assets/icons/YoutubeIcon.svg"
                          alt=""
                          width={38}
                          height={28}
                        />
                      </div>
                      <a
                        href={`https://youtube.com/watch?v=${watchOnYoutube}`}
                        target="_blank"
                        className="font-normal">
                        Watch on Youtube
                      </a>
                    </div>
                    <h1 className="font-medium text-4xl mt-4 w-2/3">
                      {item.name}
                    </h1>
                    <p className="mt-4 opacity-50">{item.desc}</p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex space-x-4">
        {sliderValues.map((_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`cursor-pointer w-11 h-11 p-2 text-sm rounded-full ${
              activeIndex === index
                ? "border border-white text-white"
                : "border border-gray-500 text-gray-500"
            }`}
            id={`next${index}`}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default CustomCarousal;
