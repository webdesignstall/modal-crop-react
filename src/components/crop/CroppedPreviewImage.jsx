import React from "react";

const CroppedPreviewImage = ({ croppedImage }) => {
  return (
    <div className="h-[450px]">
      <img
        className="object-fill h-full w-full rounded-lg"
        src={croppedImage}
        alt="Cropped"
      />
    </div>
  );
};

export default CroppedPreviewImage;
