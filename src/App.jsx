import { useState, useEffect } from 'react';
import './App.css';
import Folders from './components/Folders.jsx';
import Notes from './components/Notes.jsx';
import TodayFocus from './components/TodayFocus.jsx'
import Stats from './components/Stats.jsx';

function App () {

    const [folders, setFolders] = useState(() => {
        const savedFolders = localStorage.getItem('folders')
        return savedFolders 
        ? JSON.parse(savedFolders) 
        : [{id: 1, name: 'All notes'}]
    });

    useEffect(() => {
        localStorage.setItem('folders', JSON.stringify(folders));
    }, [folders]);

    const [notes, setNotes] = useState(() =>{
        const savedNotes = localStorage.getItem('notes');
        return savedNotes ? JSON.parse(savedNotes) : [];
    });

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes])

    const [activeFolder, setActiveFolder] = useState(1);
    const [noteToOpen, setNoteToOpen] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const openNote = (note) =>{
        setActiveFolder(note.folder);
        setNoteToOpen(note);
    };

    useEffect (() =>{
        if (noteToOpen) {
            setNoteToOpen(null);
        }
    }, [noteToOpen]);

    return(
        <div className='main-content'>
            <div className='first-column'>
            <TodayFocus
                notes={notes}
                folders={folders}
                onOpenNote={openNote}
            />
            <Stats
                notes={notes}
                folders={folders}
            />
            </div>
          <div className='notes-container'>
            <Folders
                folders={folders}
                setFolders={setFolders}
                activeFolder={activeFolder}
                setActiveFolder={setActiveFolder}
                setNotes={setNotes}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <Notes
                activeFolder={activeFolder}
                folders={folders}
                setFolders={setFolders}
                notes={notes}
                setNotes={setNotes}
                externalNote={noteToOpen}
                searchQuery={searchQuery}
            />
          </div>
        </div>
    )
}

export default App;