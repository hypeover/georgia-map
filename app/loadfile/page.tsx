import React from "react";
import FileInput from "./file-input";

const LoadFile = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center ">
      <div className=" flex flex-column justify-center items-center place-items-center">
        <FileInput />
      </div>
    </div>
  );
};

export default LoadFile;
