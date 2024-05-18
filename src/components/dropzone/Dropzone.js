import "./Dropzone.css";
import { IoPersonAddOutline } from "react-icons/io5";
import { forwardRef, useState } from "react";
import { Link } from "react-router-dom";
import ImageCropper from "../crop";

const DropZone = forwardRef(function DropZoneFunction(
  { previewMaxWidth, onChange, value, sizeLimit },
  ref
) {
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");

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

  return (
    <>
      {error && <p className="error">{error}</p>}
      <div ref={ref} className="dropzone" style={{ maxWidth: previewMaxWidth }}>
        {imageFile && (
          <ImageCropper
            setImageFile={setImageFile}
            setError={setError}
            file={imageFile}
          />
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
      </div>
    </>
  );
});

export default DropZone;
