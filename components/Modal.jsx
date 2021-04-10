// modalRoot
import { useEffect, useImperativeHandle, useState } from 'react';
import {createPortal} from 'react-dom';

export default function Modal({children, modalRef}) {
  const [mountpoint, setMountpoint] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const mountpoint = document.getElementById('modalRoot');
    setMountpoint(mountpoint);
    return () => mountpoint = null;
  }, []);


  useImperativeHandle(modalRef, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }),[])


  return mountpoint ? createPortal(
    isOpen ? <div className="modal">{children}</div> : null,
    mountpoint
  ) : null;
}