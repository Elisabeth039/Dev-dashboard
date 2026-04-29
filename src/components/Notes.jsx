import { useState, useEffect } from 'react';
import '../App.css'; 
import '../styles/Notes.css'

export default function Notes () {
    const [folders, setFolders] = useState([
        {id: 1, name: 'All notes'},
        {id: 2, name: 'Another folder'}
    ]);
    const [activeFolder, setActiveFolder] = useState("All notes");
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const [notes, setNotes] = useState([])
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState ('');
    const [noteOpen, setNoteOpen] = useState (false);
    
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
    }

    const addFolder = () => {
        if (input.trim() === '') return;
        const folderId = Date.now();

        const newFolder = {
            id: folderId,
            name: input
        }
        setFolders (prev => [...prev, newFolder]);
        setInput('');
        setIsOpen(false);
    }; 

    return(
        <div className='notes-container'>
            <input
            type='text' placeholder=' ⌕ Search notes...' className='search'> 
            </input>
            <div className='folders'>
                <button 
                 onClick={() => setIsOpen(true)}
                 className='pill'
                 >🗀</button>
                {folders.map(folder =>(
                    <button key={folder.id} className={`pill ${
                        activeFolder === folder.name ? "active" : ""
                    }`}
                    onClick={() => setActiveFolder(folder.name)}>
                        {folder.name}
                    </button>
                ))}
            </div>
            <div className='notes-section'>
                { noteOpen ? (
              
            <div className='note-area'>
              <div className='title'>
                <button onClick={closeNote} onClick={addNote} className='close-note'>{"<"}</button>
                <textarea
                type='text'
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                maxLength={"100"}
                placeholder='Title'
                className='note-title'
                />
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
                    {notes.map(note =>(
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

            { isOpen && (
        <div className='add-folder-panel'>
            <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='add-input'
            />
            <button className='add-folder' onClick={addFolder}>Add folder</button>
        </div>
    )}
        </div>
    )
}