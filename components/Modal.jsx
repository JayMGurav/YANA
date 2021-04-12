// modalRoot
import { useEffect, useImperativeHandle, useState, useCallback, useRef } from 'react';
import {createPortal} from 'react-dom';



export default function Modal({modalRef}) {
  const modalDataRef = useRef('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(modalDataRef.current.value);
    modalDataRef.current.value = ""
    close()
  }

  return mountpoint ? createPortal(
    isOpen ? (
      <div id="modal">
        <div 
          id="modal-overlay" 
          onClick={close} 
        />
        <div 
          id="modal-body" 
          style={{background: modalColor.color}}
        >
          <div className="flex-spacebetween">
            <h3 style={{margin: 0}}>ANOTHER NOTE?</h3>
            <button className="close-btn"  onClick={close}>
              <img src="./plus.svg" alt="Close Icon" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              ref={modalDataRef} 
              id="modal-notearea"
              placeholder="Go ahead make another note, start entering your note right here."
            />
            <button 
              className="pushable"
              type="submit"
              style={{
                background:"#000",
                color:"#fff"
              }}
            >ADD</button>
          </form>
        </div>
      </div>
    ) : null,
    mountpoint
  ) : null;
}
