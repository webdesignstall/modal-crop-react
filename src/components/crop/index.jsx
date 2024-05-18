import { useEffect, useState } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 100;

const ImageCropper = ({ file, setError, crop, setCrop }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageUrl = reader?.result?.toString() || "";
      setImageSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  }, [file]);

  const onImageLoad = (e) => {
    const { width, height, naturalWidth, naturalHeight } = e.currentTarget;

    if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
      setError("Image must be at least 100 x 100 pixels");
      setImageSrc("");
      return;
    }

    const getCropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: getCropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <div>
      {imageSrc && (
        <div>
          <ReactCrop
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img src={imageSrc} onLoad={onImageLoad} alt="crop" />
          </ReactCrop>
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
