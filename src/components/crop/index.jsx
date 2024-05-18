import { Button, Space } from "antd";
import { useEffect, useState } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { getCroppedImg } from "../../utils/cropImage";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 100;

const ImageCropper = ({ file, setError, setImageFile }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [crop, setCrop] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState("");

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

  const saveCroppedImage = async () => {
    const image = document.querySelector("img[alt='crop']");
    if (!image || !crop) {
      return;
    }
    const croppedImageUrl = await getCroppedImg(image, crop);
    setCroppedImageUrl(croppedImageUrl);
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

          <Space>
            <Button
              onClick={() => setImageFile(null)}
              className="bg-red-600 text-white"
              type="default"
            >
              Cancel
            </Button>
            <Button onClick={saveCroppedImage} type="primary">
              Crop Image
            </Button>
          </Space>
        </div>
      )}
      {croppedImageUrl && (
        <div className="border-2 p-5 rounded-md bg-slate-400 mt-5">
          <h3 className="text-2xl font-semibold">Cropped Image Preview:</h3>
          <img src={croppedImageUrl} alt="Cropped" />
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
