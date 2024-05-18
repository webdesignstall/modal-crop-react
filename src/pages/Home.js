import React, { useRef, useState } from "react";
import Modal from "../components/dropzone/Modal";
import DropZone from "../components/dropzone/Dropzone";
import MultiStepForm from "../components/multiStepForm";

function Home() {
  const droparea = useRef();
  const [image, setImage] = useState();
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <button onClick={(e) => setShowModal(true)}>Open Modal</button>
        {
          <Modal
            footerContent="some footer content"
            show={showModal}
            id="modal"
            modalHeader="Add New Product"
            onClickClose={(e) => setShowModal(false)}
          >
            <MultiStepForm />
          </Modal>
        }
        <form>
          <DropZone
            previewMaxWidth={600}
            onChange={setImage}
            ref={droparea}
            value={image ? image.src : ""}
          />
        </form>
      </div>
    </div>
  );
}

export default Home;
