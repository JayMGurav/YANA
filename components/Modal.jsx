// modalRoot
import { useEffect, useImperativeHandle, useState, useCallback, useRef } from 'react';
import {createPortal} from 'react-dom';
import { mutate } from 'swr'



export default function Modal({modalRef}) {
  const modalDataRef = useRef('');
  const [mountpoint, setMountpoint] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [modalColor, setModalColor]  = useState(null);
  const [isCreateLoading, setCreateLoading] = useState(false)

  
  useEffect(() => {
    const mountpoint = document.createElement("div");
    document.body.appendChild(mountpoint);
    setMountpoint(mountpoint);
    return () => void document.body.removeChild(mountpoint);
  }, []);
  
  const open = useCallback((data) => {
    setModalColor(data)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false);
  }, [])

  useImperativeHandle(modalRef, () => ({
    open,
    close
  }),[])

  const handleEscape = useCallback(event => {
    if (event.keyCode === 27) close()
  }, [close])


  async function handleSubmit(e) {
    e.preventDefault();
    setCreateLoading(true);

    const res = await fetch('/api/create', {
      body: JSON.stringify({
        note: modalDataRef.current.value,
        color: modalColor.color
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const { error, data } = await res.json();
    setCreateLoading(false);

    if (error) {
      // toast.error(error)
      console.log({ error });
      return;
    }

    mutate('/api/notes', async (notes) =>  {
     if(notes === undefined){
       return {notes: [data]}
     }else {
        return { notes: [...notes.notes, data] }
     }
    } ,true);
    modalDataRef.current.value = '';
    close();
    setModalColor(null);
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
            >  {isCreateLoading ? 'Loading...' : 'ADD'}</button>
          </form>
        </div>
      </div>
    ) : null,
    mountpoint
  ) : null;
}
