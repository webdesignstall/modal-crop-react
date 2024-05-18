import React, { useCallback } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useDropzone } from "react-dropzone";

const DragAndDropImage = ({ setFile, setCroppedImage }) => {
  const onDrop = useCallback((acceptedFiles) => {
    setCroppedImage(null);
    setFile(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="h-[450px] border border-dashed border-fr-primary rounded-md  flex flex-col justify-center items-center bg-blue-50 hover:bg-blue-100 p-20"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <FiUploadCloud className="w-[51px] h-[51px] text-fr-black-60" />
      <p className="text-[16px] font-[400] space-[0.15px] text-fr-black-80 mt-[6px]">
        <button className="text-[#3267B1] underline">Click to upload</button> or
        drag and drop
      </p>
      <p className="mt-[6px] text-fr-black-60 text-[14px]">
        SVG, PNG, JPG or GIF (Recommended size 500*500)
      </p>
    </div>
  );
};

export default DragAndDropImage;
