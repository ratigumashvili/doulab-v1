"use client";

import { useRef } from "react";

import { ToastContainer } from "react-toastify";

import ImageGallery from "./ImageGallery";
import MetaData from "./MetaData";
import DropDown from "../../DropDown";
import GoBack from "../../GoBack";

const PersonPage = ({ data: person, images }) => {
  const componentRef = useRef(null);

  return (
    <section>
      <ToastContainer />
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">
          {person?.name} {person?.patronym} {person?.surname}
        </h2>

        <div className="flex items-center gap-4">
          <GoBack />

          <DropDown
            title={`${person?.name}-${person?.patronym}-${person?.surname}`}
            ref={componentRef}
          />
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-4">
        {images?.graveImage?.length !== 0 && <ImageGallery images={images} />}
        <MetaData ref={componentRef} {...person} />
      </div>
    </section>
  );
};

export default PersonPage;
