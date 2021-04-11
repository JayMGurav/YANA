import { useRef } from "react"


export default function Notes() {
  return(
    <main className="main">
      <div className="header">
        <h2>Notes</h2>
      </div>
      <div className="notes">
        <div className="note">
          <textarea
            className="note-textarea"
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
    </main>
  )
}