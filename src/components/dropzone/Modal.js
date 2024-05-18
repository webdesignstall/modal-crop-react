import { createPortal } from 'react-dom';
import './Modal.css'
import {IoClose} from 'react-icons/io5'
import {useEffect} from "react";

function ModalContent({header, type, children, onClickClose, id, overlayStyle, footerContent}){
    

    // useLayoutEffect(() => {
    //     window.addEventListener('resize', ()=>{
    //       setOverlayStyle({height: '100vh', width: '100vw'})
    //     })
    //   }, [])

    return(
        <>
        <div className='overlay' style={overlayStyle}>
            <div id={id} className={type ? 'modal ' + type : 'modal default'}>
                <div className='modal-header'><h1>{header}</h1><span className='icon' onClick={onClickClose}><IoClose /></span></div>
                <div className='modal-body'>{children}
                </div>
                <div className='modal-footer'>
                    {footerContent ? footerContent : 'Powered by Ticketzone®'}
                </div>
                
            </div>
        </div>
        
    </>
        
    )
}

function Modal({id, modalHeader, footerContent, show, children, type, onClickClose, overlayStyle}) {
    function onClick(e){
        let modal = document.querySelector('.modal')
        modal.classList.remove('open')
        modal.classList.add('close')
        let overlay = document.querySelector('.overlay')
        overlay.style.opacity = 0
        setTimeout(() => {
            onClickClose()
        },500)
    }
    useEffect(() => {
        let modal = document.querySelector('.modal')
        if(show){
            window.scrollTo(0,0)
            modal.classList.add('open')
            document.querySelector('#portal').style.display = 'block'
            document.querySelector('body').style.overflow = 'hidden'
        }else{
            document.querySelector('#portal').style.display = 'none'
            document.querySelector('body').style.overflow = 'scroll'
        }
    }, [show])
    
    return (
        <>
        {show && createPortal(<ModalContent id={id} overlayStyle={overlayStyle} type={type} footerContent={footerContent} onClickClose={onClick} header={modalHeader}>{children}</ModalContent>, document.querySelector('#portal'))}
        </>
        
    )
}

export default Modal