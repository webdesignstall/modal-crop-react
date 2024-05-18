import "./Dropzone.css";
import { IoPersonAddOutline } from "react-icons/io5";
import { forwardRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageCropper from "../crop";

const DropZone = forwardRef(function DropZoneFunction(
  { previewMaxWidth, onChange, value, sizeLimit },
  ref
) {
  const [error, setError] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imgPreview, setImgPreview] = useState("");

  useEffect(() => {}, [imgPreview, error]);

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

  function displayPreview(file) {
    setImgPreview(null);
    let fileSize = Number(file.size / 1024);
    fileSize = Number(fileSize.toFixed(2));

    if (fileSize > sizeLimit) {
      setError("Imagens não maiores que " + sizeLimit + " KB");
      return;
    }
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/png"
    ) {
      setError("Imagens devem ser ficheiros do tipo .jpeg, .jpg ou .png");
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      const image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        // if(image.width !== image.height){
        //    setError('Imagem deve ter largura e altura do mesmo tamanho')
        //    return
        // }
        const inner = document.querySelector(".inner");
        inner.style.display = "none";
        setImgPreview(URL.createObjectURL(file));
      };
    };
    setError(false);
  }

  function handleFileChange(e) {
    e.preventDefault();
    e.stopPropagation();
    const file = e.target.files[0];
    if (file) {
      displayPreview(file);
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
      displayPreview(file);
      onChange(file);
    }
  }

  function removePreview(e) {
    e.preventDefault();
    setImgPreview("");
    const inner = document.querySelector(".inner");
    inner.style.display = "flex";
  }

  return (
    <>
      {error && <p className="error">{error}</p>}
      <div ref={ref} className="dropzone" style={{ maxWidth: previewMaxWidth }}>
        {imgPreview && <ImageCropper uploadedImage={imageFile} />}
        {/* {imgPreview && <img id="preview" src={imgPreview} alt="preview" />} */}
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
        {imgPreview && (
          <button
            type="button"
            className="full-w blue"
            onClick={removePreview}
            label="Reset"
          />
        )}
      </div>
    </>
  );
});

export default DropZone;
