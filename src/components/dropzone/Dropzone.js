import "./Dropzone.css";
import { IoPersonAddOutline } from "react-icons/io5";
import { forwardRef, useState } from "react";
import { Link } from "react-router-dom";
import ImageCropper from "../crop";
import { Modal } from "antd";
import { getCroppedImg } from "../../utils/cropImage";
import { createNewImageFile } from "../../utils/createNewImage";
import { RiDeleteBin6Line } from "react-icons/ri";

const DropZone = forwardRef(function DropZoneFunction(
  { previewMaxWidth, onChange, value, sizeLimit },
  ref
) {
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [crop, setCrop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [croppedImageUrl, setCroppedImageUrl] = useState("");

  const handleCancel = () => {
    setIsModalOpen(false);
    setImageFile(null);
  };

  function onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    ref.current.classList.add("active");
  }

  function onDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    ref.current.classList.remove("active");
  }

  function onClickButton(e) {
    e.preventDefault();
    let input = document.getElementById("file");
    input.click();
  }

  function handleFileChange(e) {
    e.preventDefault();
    e.stopPropagation();
    const file = e.target.files[0];
    if (file) {
      onChange(file);
      setImageFile(file);
      setIsModalOpen(true);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    ref.current.classList.remove("active");
    const file = e.dataTransfer.files[0];
    if (file) {
      onChange(file);
      setImageFile(file);
      setIsModalOpen(true);
    }
  }

  const saveCroppedImage = async () => {
    const image = document.querySelector("img[alt='crop']");
    if (!image || !crop) {
      return;
    }
    const croppedImageUrl = await getCroppedImg(image, crop);

    // create new image file after cropped
    // upload the cropped file to server if needed
    const newFIle = await createNewImageFile(croppedImageUrl);
    console.log({ file: newFIle });
    setCroppedImageUrl(croppedImageUrl);
    setImageFile(null);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setCroppedImageUrl("");
  };

  return (
    <>
      {error && <p className="error">{error}</p>}
      <div ref={ref} className="dropzone" style={{ maxWidth: previewMaxWidth }}>
        {imageFile && isModalOpen && (
          <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            okText={"Crop Image"}
            onOk={saveCroppedImage}
          >
            <ImageCropper
              setImageFile={setImageFile}
              setError={setError}
              file={imageFile}
              crop={crop}
              setCrop={setCrop}
              setCroppedImageUrl={setCroppedImageUrl}
            />
          </Modal>
        )}

        {!imageFile && !croppedImageUrl ? (
          <div
            className="inner"
            onDrop={handleDrop}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
          >
            <input
              id="file"
              type="file"
              accept="image/*"
              multiple={false}
              onChange={handleFileChange}
              value={value}
            />
            <Link onClick={onClickButton}>
              <div>
                <IoPersonAddOutline size={50} className="icon" />
                <p>Adicionar imagem de perfil</p>
              </div>
            </Link>
            <p>
              <small>Drag a file inside or click the link to upload</small>
            </p>
          </div>
        ) : (
          <div className="relative group mt-3 w-full h-full">
            <img
              src={croppedImageUrl}
              alt="Cropped"
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute top-0 left-0 w-full rounded-md h-full flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleRemoveImage}
                className="bg-white text-black p-2 rounded-full"
              >
                <RiDeleteBin6Line size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
});

export default DropZone;
