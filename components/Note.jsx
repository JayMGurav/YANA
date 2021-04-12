import { mutate } from 'swr'


export default function Note({note}) {

  async function handleDeleteClick(id) {
    const res = await fetch('/api/delete', {
      body: JSON.stringify({
        id
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    });

    const { error } = await res.json();
    if (error) {
      // toast.error(error)
      console.log({ error });
      return;
    }
    mutate('/api/notes');
  }

  return(
    <div 
      className="note"
      style={{
        background:note.color
      }}
    >
      <p>{note.note}</p>
      <div className="note_footer">
        <span>{new Date(note.created_at).toDateString()}</span>
        <button className="icon_btn md_btn" onClick={() => handleDeleteClick(note.id)}>
          <img src="./edit.svg" alt="Edit Icon" />
        </button>
      </div>
    </div>
  )
}





// <div className="note" key={note.id} style={{background:note.color}}>
// <p className="note-body">{note.note}</p>
// <div className="footer">
//   <div className="date">
//     <span>{new Date(note.created_at).toDateString()}</span>
//   </div>
//   <div className="edit">
//     <button>
//       <img src="./edit.svg" alt="Edit Icon" />
//     </button>
//   </div>
// </div>
// </div>