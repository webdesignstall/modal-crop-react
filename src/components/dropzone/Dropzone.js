import "./Dropzone.css";
import { IoPersonAddOutline } from "react-icons/io5";
import { forwardRef, useState } from "react";
import { Link } from "react-router-dom";
import ImageCropper from "../crop";
import { Modal } from "antd";
import { getCroppedImg } from "../../utils/cropImage";
import { createNewImageFile } from "../../utils/createNewImage";

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

        {!imageFile && (
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
        )}

        {croppedImageUrl && (
          <div
            style={{ border: "4px dashed gray" }}
            className="p-2 flex justify-center items-center  mt-24"
          >
            <div>
              <h4 className="text-lg font-semibold">Cropped image preview</h4>
              <img className="mt-3" src={croppedImageUrl} alt="Cropped" />
            </div>
          </div>
        )}
      </div>
    </>
  );
});

export default DropZone;
