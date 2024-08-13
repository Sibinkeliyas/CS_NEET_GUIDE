import React from "react";
import LoadingSpinner from "../icons/LoadingSpinner";

const Loading = () => {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 left-2/4 top-2/4 z-50 backdrop-filter backdrop-blur-[5px] flex justify-center items-center w-full h-full">
      <LoadingSpinner />
    </div>
  );
};

export default Loading;
