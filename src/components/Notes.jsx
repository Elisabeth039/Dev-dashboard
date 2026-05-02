import { useState, useEffect } from 'react';
import '../App.css'; 
import '../styles/Notes.css'

export default function Notes({ activeFolder, folders, notes, setNotes }) {

    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState ('');
    const [noteOpen, setNoteOpen] = useState (false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [moveTo, setMoveTo] = useState(false);
    
    const addNote = () => {
        if (noteTitle.trim() === '' && noteContent.trim() === '') {
            return setNoteOpen(false);
        };

        if (selectedNote) {
            setNotes (prev =>
                prev.map(n =>
                    n.id === selectedNote.id
                    ? {...n, title: noteTitle, content: noteContent}
                    : n
                )
            )
        } else {

        const newNote = {
            id: Date.now (),
            title: noteTitle,
            content: noteContent,
            folder: activeFolder
        }
        setNotes (prev => [...prev, newNote]);
    };

        setSelectedNote(null);
        setNoteTitle('');
        setNoteContent('');
        setNoteOpen(false);
        setMenuOpen(false);
    };

    const closeNote = () =>{
        setNoteOpen(false);
    };

    const openNote = (note) =>{
        setSelectedNote(note);
        setNoteTitle(note.title);
        setNoteContent(note.content);
        setNoteOpen(true);
    };

    const deleteNote = () => {
        if (selectedNote) {
            setNotes(prev => prev.filter(note => note.id !== selectedNote.id));
        }
        setSelectedNote(null);
        setNoteTitle('');
        setNoteContent('');
        setMenuOpen(false);
        setNoteOpen(false);
    };

    const moveNote = (folderName) =>{
        if (!selectedNote) return;
        setNotes (prev =>
            prev.map(n =>
                n.id === selectedNote.id
                    ? {...n, folder: folderName}
                    : n
            )
        )
        setMoveTo(false);
        setMenuOpen(false);
    }
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
                <button onClick={() => {
                        setMenuOpen(prev => !prev);
                        setMoveTo(false); 
                }} className='three-dots'>⋮</button>
                {menuOpen && (
                <div className='menu'>
                    <button className='menu-btn' onClick={() => setMoveTo(true)}>Move to→</button>
                    <button className='menu-btn' onClick={deleteNote}>Delete</button>
                </div>
            )}
                { moveTo && (
                <div className='menu'>
                    <p className='moveTo-text'>Move this note to...</p>
                    {folders.map(folder =>(
                      <button key={folder.id} className='menu-btn'
                      onClick={() => moveNote(folder.id)}>
                        {folder.name}
                    </button>
                ))}
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
                           activeFolder === 1
                              ? true
                              : note.folder === activeFolder
                       )
                       .map(note =>(
                        <div key={note.id} className='note' onClick={() => openNote(note)}>
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