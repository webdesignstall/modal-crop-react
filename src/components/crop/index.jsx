import getCroppedImg from "@/utils/cropImage";
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { FaPlus, FaMinus, FaRotateLeft, FaRotateRight } from "react-icons/fa6";

const CropContainer = ({ file, croppedImage, setCroppedImage }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [image, setImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  if (file && !image) {
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
  }

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleZoomChange = (zoomValue) => {
    setZoom(zoomValue);
  };

  const handleRotationChange = (rotationValue) => {
    setRotation(rotationValue);
  };

  const saveCroppedImage = useCallback(async () => {
    try {
      const croppedImg = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImg);
    } catch (e) {
      console.error(e);
    }
  }, [image, croppedAreaPixels, rotation]);

  return (
    <div>
      <div className="h-[60vh] w-[60vw] border rounded-[4px] mt-[22px] flex flex-col justify-center items-center bg-blue-50 hover:bg-blue-100 relative">
        {image && (
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={4 / 4}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            cropShape="round"
            style={{ containerStyle: { width: "100%", height: "100%" } }}
          />
        )}
      </div>
      <div className="flex items-center gap-5 my-3">
        <button
          onClick={() => handleZoomChange(Math.max(zoom - 0.1, 1))}
          className="bg-green-500 p-4 rounded-full cursor-pointer"
        >
          <FaMinus className="text-white  text-3xl " />
        </button>
        <input
          type="range"
          className="w-full"
          min={1}
          max={10}
          step={0.1}
          value={zoom}
          onChange={(e) => handleZoomChange(e.target.value)}
        />
        <button
          onClick={() => handleZoomChange(Math.min(zoom + 0.1, 10))}
          className="bg-green-500 p-4 rounded-full cursor-pointer"
        >
          <FaPlus className="text-white  text-3xl " />
        </button>
      </div>
      <div className="flex items-center gap-5 my-3">
        <button
          onClick={() => handleRotationChange((rotation - 10 + 360) % 360)}
          className="bg-purple-800 p-4 rounded-full cursor-pointer"
        >
          <FaRotateLeft className="text-white  text-3xl " />
        </button>
        <input
          type="range"
          className="w-full mt-[8px]"
          min={0}
          max={360}
          step={1}
          value={rotation}
          onChange={(e) => handleRotationChange(e.target.value)}
        />
        <button
          onClick={() => handleRotationChange((rotation + 10) % 360)}
          className="bg-purple-800 p-4 rounded-full cursor-pointer"
        >
          <FaRotateRight className="text-white  text-3xl " />
        </button>
      </div>
      <div className="flex justify-end my-3">
        <button
          className="bg-blue-600 w-full rounded-lg text-center  py-3 text-white "
          onClick={saveCroppedImage}
        >
          Crop Image
        </button>
      </div>
    </div>
  );
};

export default CropContainer;
