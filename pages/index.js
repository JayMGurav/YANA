import Head from 'next/head'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Notes({ notes }) {
   
  return (
    <div>
      <Head>
        <title>📝YetAnotherNoteApp</title>
      </Head>
      <div className="grid">
      {/* <!-- Nav --> */}
      <div className="nav">
        <div className="logo">
          <h4>Docket</h4>
        </div>
        <div className="notes-container">
          <div className="add-button">
            <button id="addNote">
              <img src="./plus.svg" alt="Plus Icon" />
            </button>
          </div>
          <div className="note-selectors">
            <div className="selector first" data-from="0" data-to="80"></div>
            <div
              className="selector second other"
              data-from="100"
              data-to="140"
            ></div>
            <div
              className="selector third other"
              data-from="160"
              data-to="200"
            ></div>
            <div
              className="selector fourth other"
              data-from="220"
              data-to="260"
            ></div>
            <div
              className="selector fifth other"
              data-from="280"
              data-to="320"
            ></div>
          </div>
        </div>
      </div>

      {/* <!-- Filter --> */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="gooey-effect">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
              result="gooey-effect"
            />
            <feComposite
              in="SourceGraphic"
              in2="gooey-effect"
              operator="atop"
            />
          </filter>
        </defs>
      </svg>

      {/* <!-- Header --> */}
      <header className="header">
        <div className="search">
          <div className="icon">
            <img src="./search.svg" alt="Search Icon" />
          </div>
          <input type="text" placeholder="Search" />
        </div>
      </header>
      {/* Main */}
      <main className="main">
        <div className="header">
          <h2>Notes</h2>
        </div>
        <div className="notes">
          <div className="note">
            <textarea
              type="text"
              placeholder="The beginning of screenless design: UI jobs to be take over by Solution Architect"
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
    </div>
    </div>
  )
}
