"use client";

import { useState, Fragment } from "react";

import SimpleImageSlider from "react-simple-image-slider";
import useResizeObserver from "use-resize-observer";

import { Transition } from "@headlessui/react";

import { ExpandIcon, XIcon } from "lucide-react";
import Image from "next/image";

const ImageGallery = ({ images }) => {
  const [current, setCurrent] = useState(images?.graveImage[0]);
  const [isShowing, setIsShowing] = useState(false);

  const closeModal = (e) => {
    if (e.target.tagName.toLowerCase() === "div") {
      setIsShowing(false);
    }
  };

  const { ref, width = 1, height = 1 } = useResizeObserver();

  const sliderImages = images?.graveImage?.map((item) => {
    return item;
  });

  const getCurrentImage = (index) => setCurrent(sliderImages[index]);

  return (
    <div ref={ref} className="md:max-w-md w-full h-[450px] relative">
      <Transition
        as={Fragment}
        show={isShowing}
        enter="transform transition duration-[500ms]"
        enterFrom="opacity-0 scale-50"
        enterTo="opacity-100 scale-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 scale-100 "
        leaveTo="opacity-0 scale-95 "
      >
        <div
          className="h-full w-full fixed top-0 left-0 overflow-auto z-50 bg-gray-600 bg-opacity-70"
          onClick={(e) => closeModal(e)}
        >
          <button
            onClick={() => setIsShowing(false)}
            className="absolute right-4 top-4 transition-all text-gray-200"
          >
            <XIcon size={34} />
          </button>
          <div className="h-full flex items-center justify-center">
            <Image
              src={current?.url}
              width={750}
              height={750}
              alt="test"
              placeholder="blur"
              blurDataURL="loading..."
              className="object-contain max-h-[95vh]"
            />
          </div>
        </div>
      </Transition>
      <button
        onClick={() => setIsShowing(!isShowing)}
        className="absolute z-10 top-4 right-4 bg-gray-200 hover:bg-gray-300 rounded-full p-4 transition-all dark:text-gray-900"
      >
        <ExpandIcon />
      </button>
      <SimpleImageSlider
        width={width}
        height={height}
        images={images?.graveImage}
        showBullets={false}
        showNavs={images?.graveImage?.length > 1}
        onCompleteSlide={(idx) => getCurrentImage(idx - 1)}
      />
    </div>
  );
};
export default ImageGallery;
