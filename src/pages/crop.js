import CropContainer from "@/components/crop";
import CroppedPreviewImage from "@/components/crop/CroppedPreviewImage";
import DragAndDropImage from "@/components/dragAndDrop";
import RootLayout from "@/components/layout";
import React, { useState } from "react";

const Crop = () => {
  const [file, setFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  return (
    <div className="flex justify-center items-center my-5">
      <div>
        <h2 className="text-3xl font-bold text-center">
          Upload, Crop and Rotate Image
        </h2>
        {file && !croppedImage ? (
          <CropContainer
            croppedImage={croppedImage}
            setCroppedImage={setCroppedImage}
            file={file}
          />
        ) : (
          <div className="flex items-center gap-5 mt-6">
            <DragAndDropImage
              setCroppedImage={setCroppedImage}
              setFile={setFile}
            />
            {croppedImage && (
              <CroppedPreviewImage croppedImage={croppedImage} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Crop;

Crop.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
