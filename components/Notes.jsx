import { useRef } from "react"


export default function Notes() {
  const modalRef = useRef(null);  
  return(
    <main className="main">
      <div className="header">
        <h2>Notes</h2>
      </div>
      <div className="notes">
        <div className="note">
          <textarea
            placeholder="The beginning of screenless design: jobs to be take over by Solution Architect"
          ></textarea>
          <div className="footer">
            <div className="date">
              <span>May 21, 2020</span>
            </div>
            <div className="edit">
              <button>
                <img src="./edit.svg" alt="Edit Icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <button onClick={() => modalRef.current.open({color:"red"})}>open</button>
      <Modal modalRef={modalRef}>
        <h1>Modal</h1>
      </Modal> */}
    </main>
  )
}