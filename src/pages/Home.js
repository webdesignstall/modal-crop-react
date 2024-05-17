import React, {useRef, useState} from 'react'
import Modal from '../components/Modal'
import DropZone from '../components/Dropzone'


function Home() {
    const droparea = useRef()
    const [image, setImage] = useState()
    const [showModal, setShowModal] = useState(false)

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div>
        <button onClick={e => setShowModal(true)} >Open Modal</button>
        {<Modal footerContent="some footer content" show={showModal} id="modal" modalHeader="Some header" onClickClose={e => setShowModal(false)}>Modal content here</Modal>}
        <form>
          <DropZone previewMaxWidth={600} onChange={setImage} ref={droparea} value={image ? image.src : ''}/>
        </form>
       
      </div>
      
    </div>
  )
}

export default Home