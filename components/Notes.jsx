import Note from './Note';

export default function Notes({notes}) {
 return(
    <main className="main">
     {notes.length === 0 ? (
       <div className="empty_notelist">
          <h1 style={{margin:0}}>No notes available yet!!</h1>
          <h4 style={{margin:0}}>Go ahead add a note to ponder🚀</h4>
       </div>
     ) : (
       <>
          <div className="header">
            <h1>Notes</h1>
          </div>
          <div className="notes">
            {notes.map(note => (
              <Note key={note.id} note={note}/>
            ))}
          </div>
        </>
      )}
    </main>
  )
}


