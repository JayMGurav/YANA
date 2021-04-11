// modalRoot
import { useEffect, useImperativeHandle, useState, useCallback } from 'react';
import {createPortal} from 'react-dom';



export default function Modal({children, modalRef}) {
  const [mountpoint, setMountpoint] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [modalColor, setModalColor]  = useState(null);

  const open = useCallback((data) => {
    setModalColor(data)
    setIsOpen(true)
  }, [])
  const close = useCallback(() => {
    setModalColor(null);
    setIsOpen(false);
  }, [])

  useEffect(() => {
    const mountpoint = document.createElement("div");
    document.body.appendChild(mountpoint);
    setMountpoint(mountpoint);
    return () => void document.body.removeChild(mountpoint);
  }, []);



  const handleEscape = useCallback(event => {
    if (event.keyCode === 27) close()
  }, [close])

  useImperativeHandle(modalRef, () => ({
    open,
    close
  }),[])


  return mountpoint ? createPortal(
    isOpen ? (
      <>
        <div className="modal-overlay" onClick={close} />
        <div className="modal-body" 
          style={{background: modalColor.color}}
        >
          <div className="modal-content">
            <button id="close-btn"  onClick={close}>
              <img src="./plus.svg" alt="Close Icon" />
            </button>
            {/* {children} */}
            <div id="note-body">
              <div  
                contentEditable="true" 
                className="note-textarea"
              >
              The beginning of screenless design: jobs to be take over by Solution Architect
              </div>
          </div>
          <button>Add note</button>
          </div>
        </div>
      </>
    ) : null,
    mountpoint
  ) : null;
}