import { useState, useEffect } from 'react';
import '../App.css'; 
import '../styles/Notes.css'

export default function Notes({ activeFolder }) {
 const [notes, setNotes] = useState([])
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState ('');
    const [noteOpen, setNoteOpen] = useState (false);
    const [menuOpen, setMenuOpen] = useState(false);
    
    const addNote = () => {
        const noteId = Date.now();
        if (noteTitle.trim() === '' && noteContent.trim() === '') {
            return setNoteOpen(false);
        };
        const newNote = {
            id: noteId,
            title: noteTitle,
            content: noteContent,
            folder: activeFolder
        }
        setNotes (prev => [...prev, newNote]);
        setNoteTitle('');
        setNoteContent('');
        setNoteOpen(false);
    };

    const closeNote = () =>{
        setNoteOpen(false);
    };

    return(
        <div className='notes-section'>
                { noteOpen ? (
              
            <div className='note-area'>
              <div className='title'>
                <button onClick={addNote} className='close-note'>{"<"}</button>
                <textarea
                type='text'
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                maxLength={"100"}
                placeholder='Title'
                className='note-title'
                />
                <button onClick={() => menuOpen ? setMenuOpen(false) : setMenuOpen(true)} className='three-dots'>⋮</button>
                {menuOpen && (
                <div className='menu'>
                    <button className='menu-btn'>Move to→</button>
                    <button className='menu-btn'>Delete</button>
                </div>
            )}
              </div>
                <p className='last-change'> April 29th 9:37</p>
                <textarea
                type='text'
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder='Write something...'
                className='note-content'
                />
            </div>
            ) : (
              <>
                <div className='note-list' >
                    {notes
                       .filter(note =>
                           activeFolder === "All notes"
                              ? true
                              : note.folder === activeFolder
                       )
                       .map(note =>(
                        <div key={note.id} className='note'>
                            <p>{note.title}</p>
                        </div>
                    ))}
                </div>
                <div className='add-note-btn' onClick={() => setNoteOpen(true)}>
                        +
                </div>
              </>
            )}
            </div>
    )
}